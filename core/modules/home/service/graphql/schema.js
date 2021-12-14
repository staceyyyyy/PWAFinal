import { gql } from '@apollo/client';
import { features, modules } from '@config';

export const getSlider = gql`
    query getSlider($input: InputSlider) {
        slider(input: $input) {
            slider_id
            images {
                image_id
                image_url
                thumb_image_url
                mobile_image_url
                url_redirection
            }
        }
    }
`;

export const getBannerSlider = gql`
    {
        getHomepageSlider {
            slider_id
            images {
                image_id
                image_url
                mobile_image_url
                thumb_image_url
                url_redirection
            }
        }
    }
`;

export const getFeaturedProducts = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                path
                image_path
                url_path
                products {
                    items {
                        __typename
                        id
                        name
                        sku
                        url_key
                        new_from_date
                        new_to_date
                        canonical_url
                        small_image {
                            url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height}),
                        }
                        ${modules.catalog.productListing.label.weltpixel.enabled ? `
                            weltpixel_labels {
                            categoryLabel {
                                css
                                customer_group
                                image
                                page_position
                                position
                                priority
                                text
                                text_padding
                                text_bg_color
                                text_font_size
                                text_font_color          
                            }
                            productLabel {
                                css
                                customer_group
                                image
                                page_position
                                position
                                priority
                                text
                                text_padding
                                text_bg_color
                                text_font_size
                                text_font_color  
                            }
                        }        
                        ` : ''}
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
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                                final_price {
                                    currency
                                    value
                                }
                            }
                        }
                        special_from_date
                        special_to_date
                    }
                }
            }
            children_count
        }
    }
`;

export const getCategoryList = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                description
                image_path
                url_path
            }
            children_count
        }
    }
`;

export default {
    getBannerSlider,
    getCategoryList,
    getFeaturedProducts,
    getSlider,
};
