import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/productcompare/service/graphql/schema';

const USING_INTERNAL = true;

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        context,
    };
};
// uncomment this line (set 'no-cache') to test loader/skeleton component
// fetchPolicy = 'no-cache';

export const getCompareList = (params) => useLazyQuery(Schema.getCompareList, {
    ...params,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
});

export const getCustomerUid = (options = {}) => useLazyQuery(Schema.getCustomerUid, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
});

export const assignCompareListToCustomer = (params) => useMutation(Schema.assignCompareListToCustomer, {
    ...params,
    context: {
        request: 'internal',
    },
});

export const removeProductsFromCompareList = () => useMutation(Schema.removeProductsFromCompareList, {
    context: {
        request: 'internal',
    },
});
