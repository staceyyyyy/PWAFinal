import { useMutation, useQuery } from '@apollo/client';
import * as Schema from '@core_modules/login/services/graphql/schema';

const useInternal = {
    context: {
        request: 'internal',
    },
};

export const getToken = () => useMutation(Schema.getCustomerToken, {
    ...useInternal,
});

export const getTokenOtp = () => useMutation(Schema.getCustomerTokenOtp, {
    ...useInternal,
});

export const removeToken = () => useMutation(Schema.removeToken, {
    ...useInternal,
});

export const requestOtpRegister = () => useMutation(Schema.requestOtpRegister, {
    ...useInternal,
});
export const socialLogin = () => useMutation(Schema.socialLogin, {
    ...useInternal,
});

export const getSigninMethodSocialLogin = () => useQuery(Schema.getSigninMethodSocialLogin);

export const checkOtpRegister = () => useMutation(Schema.checkOtpRegister, { ...useInternal });
export const requestOtpLogin = () => useMutation(Schema.requestOtpLogin, { ...useInternal });
export const checkOtpLogin = () => useMutation(Schema.checkOtpLogin, { ...useInternal });
export const requestOtpForgotPassword = () => useMutation(Schema.requestOtpForgotPassword, { ...useInternal });
export const checkOtpForgotPassword = () => useMutation(Schema.checkOtpForgotPassword, { ...useInternal });

export const mergeCart = () => useMutation(Schema.mergeCart, {
    ...useInternal,
});

export const getCustomerCartId = (options = {}) => useQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    ...options,
});

export const otpConfig = () => useQuery(Schema.otpConfig);

export default {
    getToken,
    getTokenOtp,
};
