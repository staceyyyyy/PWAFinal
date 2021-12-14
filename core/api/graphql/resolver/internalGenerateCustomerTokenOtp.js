/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation getToken(
        $username: String!,
        $otp: String!,
    ) {
        generateCustomerTokenCustom(username: $username, otp: $otp){
        token
        }
    }
`;

const internalGenerateCustomerTokenOtp = async (parent, { username, otp }, context) => {
    const res = await requestGraph(query, { username, otp }, context);
    // context.session.destroy();
    if (res.generateCustomerTokenCustom) {
        context.session.token = encrypt(res.generateCustomerTokenCustom.token);
        return {
            originalToken: res.generateCustomerTokenCustom.token,
            token: encrypt(res.generateCustomerTokenCustom.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalGenerateCustomerTokenOtp;
