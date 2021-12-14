/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import {
    ApolloClient, HttpLink, InMemoryCache, ApolloLink, from,
} from '@apollo/client';
import { RetryLink } from 'apollo-link-retry';
import fetch from 'isomorphic-unfetch';
import { graphqlEndpoint, HOST, storeCode } from '@root/swift.config.js';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { removeCartId } from '@helper_cartid';
import { removeIsLoginFlagging } from '@helper_auth';
import { getAppEnv } from '@helpers/env';
import firebase from 'firebase/app';
import cookies from 'js-cookie';
import { removeCookies } from '@root/core/helpers/cookies';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [],
        },
    },
});

const appEnv = getAppEnv();

const uri = graphqlEndpoint[appEnv] ? graphqlEndpoint[appEnv] : graphqlEndpoint.dev;

const host = HOST[appEnv] ? HOST[appEnv] : HOST.dev;

const uriInternal = `${host}/graphql`;
// handle if token expired
const logoutLink = onError((err) => {
    const { graphQLErrors, networkError } = err;
    if (networkError && typeof window !== 'undefined' && graphQLErrors && graphQLErrors.length > 0 && graphQLErrors[0].status > 500) {
        window.location.href = '/maintenance';
    } else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].status === 401 && typeof window !== 'undefined') {
        removeCartId();
        removeIsLoginFlagging();
        removeCookies('uid_product_compare');
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                // console.log(error);
            });
        // reference https://stackoverflow.com/questions/10339567/javascript-clear-cache-on-redirect
        window.location.href = `/customer/account/login?n=${new Date().getTime()}`;
    }
});

const link = new RetryLink().split(
    (operation) => operation.getContext().request === 'internal',
    new HttpLink({
        uri: uriInternal, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
    }),
    new HttpLink({
        uri, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
        useGETForQueries: true,
    }),
);

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    let token = '';
    let store_code_storage = cookies.get('store_code_storage');
    if (ctx && ctx.req) {
        token = ctx.req.session.token;

        if (typeof window === 'undefined') {
            store_code_storage = ctx.req.cookies.store_code_storage || store_code_storage;
        }
    }

    /**
     * Meddleware to customize headers
     */
    const middlewareHeader = new ApolloLink((operation, forward) => {
        const additionalHeader = {};

        if (token && token !== '') {
            additionalHeader.Authorization = token;
        }

        if (storeCode !== '') {
            additionalHeader.store = storeCode;
        } else if (store_code_storage && store_code_storage !== '' && storeCode === '') {
            additionalHeader.store = store_code_storage;
        }
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                ...additionalHeader,
            },
        }));

        return forward(operation);
    });

    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: from([middlewareHeader, logoutLink, link]),
        cache: new InMemoryCache({
            fragmentMatcher,
            possibleTypes: {
                ProductInterface: [
                    'ConfigurableProduct', 'SimpleProduct', 'BundleProduct',
                    'VirtualProduct', 'DownloadableProduct', 'GroupedProduct',
                    'AwGiftCardProduct',
                ],
            },
            typePolicies: {
                Query: {
                    fields: {
                        products: {
                            merge(existing = [], incoming) {
                                return { ...existing, ...incoming };
                            },
                        },
                    },
                },
                ProductImage: {
                    keyFields: ['url'],
                },
            },
        }).restore(initialState),
        // reference https://www.apollographql.com/docs/react/development-testing/developer-tooling/#apollo-client-devtools
        // eslint-disable-next-line no-underscore-dangle
        connectToDevTools: typeof window !== 'undefined' && window.__APOLLO_CLIENT__ && appEnv === 'local',
        resolvers: {},
    });
}
