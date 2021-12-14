/* eslint-disable import/prefer-default-export */
import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/trackingorder/services/graphql/schema';

export const getTrackingOrder = (params) => useLazyQuery(Schema.getTrackingOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export const getCustomer = () => useQuery(Schema.getCustomer, {
    variables: {},
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'cache-and-network',
});
