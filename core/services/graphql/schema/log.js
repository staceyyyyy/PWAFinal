/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const updatePwaCheckoutLog = gql`
    mutation updatePwaCheckoutLog(
        $cart_id: String!,
        $state: String!,
        $status: Int!
    ) {
        updatePwaCheckoutLog(
            input: {
                cart_id: $cart_id
                state: $state
                status: $status
            }
        ){
            pwa_checkout_log {
                status
            }
        }
    }
`;
