/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation register(
        $firstName: String!,
        $lastName: String,
        $email: String!,
        $gender: Int,
        $dob: String,
        $password: String!,
        $phoneNumber: String,
        $subscribe: Boolean,
        $otp: String,
        $whatsapp_number: String,
    ) {
        createCustomerCustom(
            input: {
              firstname: $firstName,
              lastname: $lastName,
              email: $email,
              gender: $gender,
              date_of_birth: $dob,
              password: $password,
              phonenumber: $phoneNumber,
              is_subscribed: $subscribe,
              otp: $otp,
              whatsapp_number: $whatsapp_number,
            }
          ) {
            token
            is_email_confirmation
        }
    }
`;

const internalCreateCustomerToken = async (parent, args, context) => {
    const variables = {
        firstName: args.input.firstname,
        lastName: args.input.lastname,
        email: args.input.email,
        gender: args.input.gender,
        dob: args.input.date_of_birth,
        password: args.input.password,
        phoneNumber: args.input.phonenumber,
        subscribe: args.input.is_subscribe,
        otp: args.input.otp,
        whatsapp_number: args.input.whatsapp_number,
    };
    const res = await requestGraph(query, variables, context);
    // context.session.destroy();
    if (res.createCustomerCustom) {
        context.session.token = encrypt(res.createCustomerCustom.token);
        return {
            is_email_confirmation: res.createCustomerCustom.is_email_confirmation,
            originalToken: res.createCustomerCustom.token,
            token: encrypt(res.createCustomerCustom.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalCreateCustomerToken;
