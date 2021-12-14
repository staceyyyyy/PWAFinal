/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getTrackingOrder = gql`
    query getTrackingOrder($email: String, $order_id: String) {
        ordersFilter(filters: { email: $email, ids: { eq: $order_id } }) {
            data {
                id
                order_number
                status
                status_label
                detail {
                    payment {
                        method
                        additional_information
                        payment_additional_info {
                            method_title
                            __typename
                        }
                        __typename
                    }
                    __typename
                    shipping_methods {
                        shipping_description
                        shipping_detail {
                            track_number
                            trackorder_type
                            data_detail
                            __typename
                        }
                        __typename
                    }
                    shipping_address {
                        firstname
                        lastname
                        __typename
                    }
                    items {
                        name
                        __typename
                    }
                    __typename
                }
                grand_total
                __typename
            }
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
        }
    }
`;
