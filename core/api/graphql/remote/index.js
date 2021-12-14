/* eslint-disable no-console */
const fetch = require('cross-fetch');
const { print } = require('graphql');
const { wrapSchema, introspectSchema } = require('@graphql-tools/wrap');
const { graphqlEndpoint, storeCode } = require('../../../../swift.config');
const { decrypt } = require('../../../helpers/encryption');
const { getAppEnv } = require('../../../helpers/env');

const executor = async ({
    document, variables, context,
}) => {
    try {
        let token = '';
        let store_code_storage = '';
        if (context) {
            token = context.headers.authorization || context.session.token;
            store_code_storage = context.cookies.store_code_storage;
        }
        const query = print(document);
        const appEnv = getAppEnv();
        const additionalHeader = {};
        if (storeCode !== '') {
            additionalHeader.store = storeCode;
        } else if (store_code_storage && store_code_storage !== '' && storeCode === '') {
            additionalHeader.store = store_code_storage;
        }
        const url = graphqlEndpoint[appEnv] || graphqlEndpoint.prod;
        if (token && token !== '') {
            additionalHeader.Authorization = `Bearer ${decrypt(token)}`;
        }
        const fetchResult = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...additionalHeader,
            },
            body: JSON.stringify({ query, variables }),
        });
        if (fetchResult && fetchResult.json) {
            const response = await fetchResult.json();
            if (response.errors) {
                const err = response.errors[0];
                if (err.extensions.category === 'graphql-authorization') {
                    return {
                        errors: [
                            {
                                message: err.extensions.category,
                                extensions: err.extensions,
                            },
                        ],
                        data: response.data,
                    };
                }
                return {
                    errors: [
                        {
                            message: err.message,
                            extensions: err.extensions,
                        },
                    ],
                    data: response.data,
                };
            }
            return response;
        }
        return fetchResult;
    } catch (error) {
        console.error('There was an uncaught error', error);
        // process.exit(1); // mandatory (as per the Node docs)
        return {
            errors: [
                {
                    message: error,
                    extensions: null,
                },
            ],
            data: null,
        };
    }
};

module.exports = async () => {
    const schema = wrapSchema({
        schema: await introspectSchema(executor),
        executor,
    });

    return schema;
};
