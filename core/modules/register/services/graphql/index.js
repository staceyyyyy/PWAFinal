import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/register/services/graphql/schema';

export const register = () => useMutation(Schema.register, {
    context: {
        request: 'internal',
    },
});

export const otpConfig = () => useQuery(Schema.otpConfig, {
    fetchPolicy: 'no-cache',
});

export const mergeCart = () => useMutation(Schema.mergeCart, {
    context: {
        request: 'internal',
    },
});

export const getCustomerCartId = () => useLazyQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getGuestCustomer = (options = {}) => useLazyQuery(Schema.getGuestCustomer, {
    ...options,
    context: {
    },
    fetchPolicy: 'no-cache',
});

export default {
    register,
};
