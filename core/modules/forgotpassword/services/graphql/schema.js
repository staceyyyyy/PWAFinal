import { gql } from '@apollo/client';

export const requestLinkToken = gql`
    mutation requestLinkToken($email: String!, $phoneNumber: String!, $otp: String!) {
        requestLinkForgotPassword(input: { email: $email, phonenumber: $phoneNumber, otp: $otp }) {
            token
            app_url
            url
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

export default {
    requestLinkToken,
};
