import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/confirmpayment/services/graphql/schema';

const USING_INTERNAL = true;

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

export const confirmPayment = () => useMutation(Schema.confirmPayment, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const getPaymentBankList = (options = {}) => useLazyQuery(Schema.getPaymentBankList, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export default {
    confirmPayment,
    getPaymentBankList,
};
