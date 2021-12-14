import { gql } from '@apollo/client';

export const getCustomerToken = gql`
mutation getToken(
    $username: String!,
    $password: String!,
) {
  internalGenerateCustomerToken(username: $username, password: $password){
      token
    }
  }
`;

export const socialLogin = gql`
    mutation generateCustomerTokenSocialLogin(
        $email: String!,
        $socialtoken: String!,
        $firstname: String!,
        $lastname: String!,
    ){
        internalCreateSocialLogin(input: {
            email: $email, socialtoken: $socialtoken, firstname: $firstname, lastname: $lastname
        })
     {
    token
    }
   }
`;

export const getCustomerTokenOtp = gql`
mutation getToken(
    $username: String!,
    $otp: String!,
) {
  internalGenerateCustomerTokenOtp(username: $username, otp: $otp){
      originalToken
      token
      message
    }
  }
`;

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export const requestOtpRegister = gql`
    mutation requestOtp($phoneNumber: String!) {
        requestOtpRegister(phonenumber: $phoneNumber) {
            info
        }
    }
`;

export const requestOtpForgotPassword = gql`
    mutation requestOtp($phoneNumber: String!) {
        requestOtpForgotPassword(phonenumber: $phoneNumber) {
            info
        }
    }
`;

export const checkOtpRegister = gql`
    mutation checkOtp($phoneNumber: String!, $otp: String!) {
        checkOtpRegister(phonenumber: $phoneNumber, otp: $otp) {
            is_valid_otp
        }
    }
`;

export const checkOtpForgotPassword = gql`
    mutation checkOtp($phoneNumber: String!, $otp: String!) {
        checkOtpForgotPassword(phonenumber: $phoneNumber, otp: $otp) {
            is_valid_otp
        }
    }
`;

export const requestOtpLogin = gql`
    mutation requestOtp($phoneNumber: String!) {
        requestOtpLogin(phonenumber: $phoneNumber) {
            info
        }
    }
`;

export const checkOtpLogin = gql`
mutation checkOtp(
    $phoneNumber: String!,
    $otp: String!,
) {
    checkOtpLogin(phonenumber: $phoneNumber, otp: $otp) {
        is_valid_otp
      }
}
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const mergeCart = gql`
mutation mergeCart(
    $sourceCartId: String!,
    $destionationCartId: String!
) {
    mergeCarts(
      source_cart_id:$sourceCartId,
      destination_cart_id: $destionationCartId
    ) {
      id
      total_quantity
    }
  }
`;

export const getCustomer = gql`
{
    customer {
      id
      firstname
      lastname
      email
      phonenumber
      whatsapp_number
      customer_group
    }
  }
`;

export const otpConfig = gql`
    {
        otpConfig {
            otp_enable {
                enable_otp_forgot_password
                enable_otp_login
                enable_otp_register
            }
            otp_expired_time {
                expired_time_otp_forgot_password
                expired_time_otp_login
                expired_time_otp_register
            }
            otp_general_email_required
            otp_length {
                length_otp_forgot_password
                length_otp_login
                length_otp_register
            }
            otp_max_try {
                max_try_otp_forgot_password
                max_try_otp_login
                max_try_otp_register
            }
        }
    }
`;

export const getSigninMethodSocialLogin = gql`
{
    getSigninMethodSocialLogin{
      signin_method_allowed
    }
  }
`;

export default {
    getCustomerToken,
    getCustomerTokenOtp,
    removeToken,
    getSigninMethodSocialLogin,
};
