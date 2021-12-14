import { gql } from '@apollo/client';

/**
 * scema dynamic category
 * @param variables Object {id: number, productSize: Number}
 * @returns grapql query
 */

export const getCategory = (
    variables = {
        productSize: 10,
    },
) => gql`
    {
        categoryList(filters: { ids: { eq: "${variables.id}" } }) {
          id
          name
          description
          url_path
          image
          image_path
          breadcrumbs {
            category_id
            category_name
            category_url_path
          }
          children {
            id
            name
            image
            url_path
          }
          cms_block {
            content
            identifier
            title
          } 
          display_mode
        }
    }
    `;

/**
 * scema dynamic get attribute filter
 * @param category_id number
 * @returns grapql query
 */

export const getFilter = (catID) => gql`
    {
        getFilterAttributeOptions (catid:${catID}) {
            code
            data {
                field
                id
                label
                maxprice
                minprice
                value {
                    label
                    value
                }
            }
            message
            status
        }
    }
`;

/**
 * get category products
 * @returns {object} gql
 */
export const getCategoryProducts = (variables) => gql`{
    categoryList(filters: { ids: { eq: "${variables.category_id}" } }) {
        url_path
        canonical_url
        products(currentPage: ${variables.page}, pageSize: ${variables.products_count}){
            page_info {
                current_page
                page_size
                total_pages
            }
            items {
                id
                sku
                name
                url_key
                stock_status
                categories {
                    name
                }
                __typename
                price_tiers {
                    discount {
                    percent_off
                    amount_off
                    }
                    final_price {
                    currency
                    value
                    }
                    quantity
                }
                price_range {
                    maximum_price {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    regular_price {
                        currency
                        value
                    }
                    }
                    minimum_price {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    regular_price {
                        currency
                        value
                    }
                    }
                }
                special_from_date
                special_to_date
                new_from_date
                new_to_date
                sale
                image {
                    url
                    label
                }
                small_image {
                    url
                    label
                }
            }
        }
    }
}`;
