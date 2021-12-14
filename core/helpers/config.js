/* eslint-disable import/prefer-default-export */
const { HOST, graphqlEndpoint } = require('../../swift.config');
const { getAppEnv } = require('./env');

const getHost = () => {
    const appEnv = getAppEnv();
    const globalHost = HOST[appEnv] || HOST.prod;
    return globalHost;
};

const getStoreHost = (appEnv = getAppEnv()) => {
    let storeHost = graphqlEndpoint[appEnv] || graphqlEndpoint.prod;
    storeHost = storeHost.replace('graphql', '');
    return storeHost;
};

module.exports = { getHost, getStoreHost };
