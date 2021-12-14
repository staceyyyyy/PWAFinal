/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

const notificationOutput = `
    items {
        entityId
        subject
        createdAt
        unread
        content
    }
    totalUnread
`;

export const customerNotificationList = gql`
    query customerNotificationList {
        customerNotificationList {
            ${notificationOutput}
        }
    }
`;

export const readNotification = gql`
    mutation readNotification (
        $entityId: Int!
    ) {
        readNotification(
            entityId: $entityId
        ) {
            ${notificationOutput}
        }  
    }
`;

export default {
    customerNotificationList,
    readNotification,
};
