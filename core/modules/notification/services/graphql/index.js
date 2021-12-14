/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation } from '@apollo/client';
import Schema from '@core_modules/notification/services/graphql/schema';

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const readNotification = (options = {}) => useMutation(Schema.readNotification, {
    ...options,
    context: {
        request: 'internal',
    },
});
