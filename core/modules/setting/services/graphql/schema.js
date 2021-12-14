/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * [SCHEMA] get currency
 * @param null
 * @return {graphql}
 */
export const getCurrencySchema = gql`
    {
        currency {
            base_currency_code
            base_currency_symbol
            default_display_currency_code
            default_display_currency_symbol
            available_currency_codes
            exchange_rates {
                currency_to
                rate
            }
        }
    }
`;

export const getStoreName = gql`
    {
        availableStores{
            store_code
            store_name
            locale
            is_default_store
        }
    }
`;

export default {
    getCurrencySchema,
    getStoreName,
};
