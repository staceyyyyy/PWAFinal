/* eslint-disable no-param-reassign */
const requestGraph = require('../request');

const query = `
mutation {
    revokeCustomerToken {
        result
    }
}
`;

const internalDeleteCustomerToken = async (parent, args, context) => {
    const res = await requestGraph(query, { }, context);
    context.session.token = null;
    if (res.revokeCustomerToken) {
        return {
            result: true,
        };
    }
    return {
        result: false,
    };
};

module.exports = internalDeleteCustomerToken;
