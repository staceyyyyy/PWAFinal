import { gql } from '@apollo/client';
import { features } from '@config';

export const getCmsPage = gql`
    query($identifier: String!) {
        cmsPage(identifier: $identifier) {
            identifier
            content
            meta_description
            meta_keywords
            title
            url_key
        }
    }
`;

export const getInstagramToken = gql`
{
    instagramToken {
      token
    }
}
`;

export const getPageBuilderTemplate = gql`
query($identifier: String!){
    getPageBuilderTemplate(id: $identifier){
        data
    }
}
`;

export const getInstagramFeed = gql`
mutation getInstagramFeed($token: String!) {
    internalGetInstagramFeed(token: $token) {
        message
        data {
            id
            media_type
            media_url
            permalink
            caption
            username
        }
        err
    }
}
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getProductReviews = gql`
    query getProductReviews($sku: String, $pageSize: Int) {
        products(
            filter: { 
                sku: {
                    eq: $sku
                }
            }, 
            pageSize: $pageSize
        ) {
            items {
                id
                sku
                name
                url_key
                small_image {
                    url
                    label
                }
                reviews {
                    items {
                        nickname
                        summary
                        created_at
                        text
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`;

export const getProductList = gql`
    query getProductList($search: String, $pageSize: Int, $filter: ProductAttributeFilterInput, $sort: ProductAttributeSortInput) {
        products(search: $search, pageSize: $pageSize, filter: $filter, sort: $sort) {
            items {
                id
                name
                sku
                url_key
                review_count
                short_description {
                    html
                }
                price_range {
                    maximum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                    minimum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
                price_tiers {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                }
                small_image {
                    label
                    url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height})
                }
                ... on ConfigurableProduct {
                    configurable_options {
                        id
                        product_id
                        attribute_id
                        attribute_code
                        label
                        position
                        values {
                            value_index
                            label
                            swatch_data {
                                value
                                ... on ImageSwatchData {
                                    thumbnail
                                    value
                                }
                                ... on ColorSwatchData {
                                    value
                                }
                                ... on TextSwatchData {
                                    value
                                }
                            }
                        }
                    }
                    variants {
                        product {
                            price_range {
                                minimum_price {
                                    discount {
                                        amount_off
                                        percent_off
                                    }
                                    final_price {
                                        currency
                                        value
                                    }
                                    fixed_product_taxes {
                                        amount {
                                            currency
                                            value
                                        }
                                        label
                                    }
                                    regular_price {
                                        currency
                                        value
                                    }
                                }
                                maximum_price {
                                    discount {
                                        amount_off
                                        percent_off
                                    }
                                    final_price {
                                        currency
                                        value
                                    }
                                    fixed_product_taxes {
                                        amount {
                                            currency
                                            value
                                        }
                                        label
                                    }
                                    regular_price {
                                        currency
                                        value
                                    }
                                }
                            }
                        }
                        attributes {
                            label
                            code
                            value_index
                        }
                    }
                }
                special_from_date
                special_to_date
            }
        }
    }
`;

export const getCategories = gql`
    query getCategories($ids: [String]) {
        categoryList(filters: { ids: { in: $ids } }) {
            name
            product_count
            url_path
            children {
                name
                product_count
                url_path
                children {
                    name
                    product_count
                    url_path
                    children {
                        name
                        product_count
                        url_path
                        children {
                            name
                            product_count
                            url_path
                        }
                    }
                }
            }
        }
    }
`;

export default { getCmsPage };
