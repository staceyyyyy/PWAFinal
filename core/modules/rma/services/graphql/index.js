import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/rma/services/graphql/schema';

export const getFormDataRma = (params) => useQuery(Schema.getFormDataRma, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    ...params,
});

export const getUpdateFormRma = (params) => useQuery(Schema.getUpdateFormRma, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    ...params,
});

export const requestRma = () => useMutation(Schema.requestRma, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const updateRma = () => useMutation(Schema.updateRma, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const cancelRma = () => useMutation(Schema.cancelRma, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const getHistoryRma = (params) => useQuery(Schema.getHistoryRma, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    variables: params,
    skip: typeof window === 'undefined',
});

export const getCustomer = () => useQuery(Schema.getCustomer, {
    variables: {},
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'cache-and-network',
});

export default {
    getFormDataRma,
};
