/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
mutation generateCustomerTokenSocialLogin(
    $email: String!,
    $socialtoken: String!,
    $firstname: String!,
    $lastname: String!,
){
generateCustomerTokenSocialLogin(
       email: $email, 
       social_token: $socialtoken,
       firstname: $firstname,
       lastname: $lastname
 ) 
    {
        token
    }
}
`;

const internalCreateSocialLogin = async (parent, args, context) => {
    const variables = {
        email: args.input.email,
        socialtoken: args.input.socialtoken,
        firstname: args.input.firstname,
        lastname: args.input.lastname,
    };
    const res = await requestGraph(query, variables, context);
    if (res.generateCustomerTokenSocialLogin) {
        context.session.token = encrypt(res.generateCustomerTokenSocialLogin.token);
        return {
            originalToken: res.generateCustomerTokenSocialLogin.token,
            token: encrypt(res.generateCustomerTokenSocialLogin.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalCreateSocialLogin;
