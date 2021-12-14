/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getStoreCredit = gql`
   query getStoreCredit($pageSizeStoreCredit: Int! , $currentPageStoreCredit: Int) {
        customer {
            store_credit {
                current_balance {
                    currency
                    value
                }
                enabled
                transaction_history (pageSize: $pageSizeStoreCredit, currentPage: $currentPageStoreCredit) {
                    total_count
                    page_info {
                    current_page
                    page_size
                    total_pages
                    }
                    items {
                    comment
                    comment_placeholder
                    store_credit_adjustment {
                        currency
                        value
                    }
                    store_credit_balance {
                        currency
                        value
                    }
                    transaction_date_time
                    transaction_id
                    }
                }
                }
        }
    }
`;
