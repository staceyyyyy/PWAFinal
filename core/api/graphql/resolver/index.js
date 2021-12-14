/* eslint-disable no-param-reassign */
const internalGenerateCustomerToken = require('./internalGenerateCustomerToken');
const internalCreateCustomerToken = require('./internalCreateCustomerToken');
const internalGenerateCustomerTokenOtp = require('./internalGenerateCustomerTokenOtp');
const internalDeleteCustomerToken = require('./internalDeleteCustomerToken');
const internalGenerateSession = require('./internalGenerateSession');
const internalDeleteSession = require('./internalDeleteSession');
const internalCreateSocialLogin = require('./internalCreateSocialLogin');
const internalGetInstagramFeed = require('./internalGetInstagramFeed');

const resolver = {
    Mutation: {
        internalGenerateCustomerToken,
        internalCreateCustomerToken,
        internalGenerateCustomerTokenOtp,
        internalDeleteCustomerToken,
        internalGenerateSession,
        internalDeleteSession,
        internalCreateSocialLogin,
        internalGetInstagramFeed,
    },
};

module.exports = resolver;
