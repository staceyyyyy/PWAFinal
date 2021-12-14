/* eslint-disable no-plusplus */
import { gql } from '@apollo/client';
import { features, modules } from '@config';

const weltpixel_labels = modules.catalog.productListing.label.weltpixel.enabled ? `
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
` : '';

const productDetail = `
    id
    name
    sku
    ${modules.catalog.productListing.label.sale.enabled ? 'sale' : ''}
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height}),
      label
    }
    image{
      url
    }
    media_gallery_entries{
      media_type
      video_content{
        video_url
      }
    }
    review {
      rating_summary
      reviews_count
    }
    categories {
      id
      name
      url_path
      breadcrumbs {
        category_id
        category_url_path
        category_name
      }
    }
    special_from_date
    special_to_date

    `;
const priceRange = `
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
    `;

const priceTiers = `
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
    `;

export const getUpsellProduct = (url) => gql`
{
  products(
    search: "" ,filter: {
      url_key: {
        eq: "${url}"
      }
    }
  ) {
    items {
      id
      upsell_products {
        ${productDetail}        
        ${weltpixel_labels}
        ${priceRange}
        ${priceTiers}
      }
    }
  }
}
`;

export const getRelatedProduct = (url) => gql`
{
  products(
    search: "" ,filter: {
      url_key: {
        eq: "${url}"
      }
    }
  ) {
    items {      
      id
      related_products {
        ${productDetail}        
        ${weltpixel_labels}
        ${priceRange}
        ${priceTiers}
      }
    }
  }
}
`;
const tabListProduct = `
    tab_1 {
      label
      content
    }
    tab_2 {
      label
      content
    }
    tab_3 {
      label
      content
    }
    `;
/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

const priceRangePartial = `
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
 `;

const priceTiersPartial = `
  discount {
    amount_off
    percent_off
  }
  final_price {
    currency
    value
  }
  quantity
 `;

const productDetailFragment = gql`
  fragment CORE_PRODUCT_DETAILS on ProductInterface {
    id
    name @skip(if: $includeName)
    sku
    ${modules.catalog.productListing.label.sale.enabled ? 'sale' : ''}
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image @skip(if: $includeImg) {
      url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height}),
      label
    }
    image {
      url
    }
    media_gallery_entries {
      media_type
      video_content {
        video_url
      }
    }
    review {
      rating_summary
      reviews_count
    }
    categories {
      id
      name
      url_path
      breadcrumbs {
        category_id
        category_url_path
        category_name
      }
    }
    special_from_date
    special_to_date
    price_range @skip(if: $includePrice) {
      ${priceRangePartial}
    }
    price_tiers @skip(if: $includePrice) {
      ${priceTiersPartial}
    }
  }
`;

export const getProduct = (url) => {
    const query = gql`
    ${productDetailFragment}
    query getProducts(
      $includeName: Boolean = false,
      $includePrice: Boolean = false,
      $includeImg: Boolean = false,
    ) {
        products(
            search: "" ,filter: {
              url_key: {
                eq: "${url}"
              }
            }
        ) {
          items {
            ...CORE_PRODUCT_DETAILS
            ... on AwGiftCardProduct {
              aw_gc_allow_delivery_date
              aw_gc_allow_open_amount
              aw_gc_amounts
              aw_gc_custom_message_fields
              aw_gc_description
              aw_gc_email_templates {
                image_url
                name
                value
              }
              aw_gc_open_amount_max
              aw_gc_open_amount_min
              aw_gc_type
            }
            description {
              html
            }
            ${modules.brands.enabled ? 'brand' : ''}
            short_description {
              html
            }
            more_info {
              label
              value
            }
            media_gallery {
              url
              label
              ... on ProductVideo {
                  video_content {
                      media_type
                      video_provider
                      video_url
                      video_title
                      video_description
                      video_metadata
                  }
              }
            }
          }
          total_count
        }
    }`;
    return query;
};

export const smartProductTabs = () => {
    const query = gql`
    query getSmartProductTabs($search: String, $filter: ProductAttributeFilterInput) {
      products(search: $search, filter: $filter) {
        items {
          id
          smartProductTabs {
            ${tabListProduct}
          }
        }
      }
    }
  `;
    return query;
};

export const getProductBySku = () => {
    const query = gql`query(
      $sku: [String]
    ){
        products(
            search: "" ,filter: {
              sku: {
                in: $sku
              }
            }
          ) {
            items {
              ${productDetail}
              ${priceRange}
              ${priceTiers}
              description {
                html
              }
              ${modules.brands.enabled ? 'brand' : ''}
              short_description {
                html
              }
              more_info {
                label
                value
              }
            }
            total_count
          }
    }`;
    return query;
};

export const addReview = gql`
    mutation createReview($nickname: String!, $rating: Int!, $title: String!, $detail: String!, $pkValue: Int!) {
        addProductReview(
            input: {
                entity_pk_value: $pkValue
                title: $title
                detail: $detail
                nickname: $nickname
                ratings: { rating_name: "Rating", value: $rating }
            }
        ) {
            message
        }
    }
`;

export const getReview = () => {
    const query = gql`
        query getReview($sku: String!, $pageSize: Int, $currentPage: Int) {
            getProductReviews(sku: $sku, pageSize: $pageSize, currentPage: $currentPage) {
                items {
                    id
                    nickname
                    ratings {
                        rating_name
                        value
                    }
                    entity_pk_value
                    review_entity
                    review_type
                    review_status
                    title
                    detail
                    created_at
                }
                message
                totalCount
            }
        }
    `;
    return query;
};

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
    }
`;

export const getBundleProduct = (sku) => {
    const query = gql`{
  products(
    search: "" ,filter: {
      sku: {
        eq: "${sku}"
      }
    }
  ) {
    items {
      ... on BundleProduct {
        id
        name
        url_key
        items {
          position
          option_id
          title
          type
          required
          options {
            id
            is_default
            label
            quantity
            product {
              id
              name
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
                }
              }
            }
          }
        }
      }
    }
  }
}`;
    return query;
};

export const getDownloadProduct = (sku) => {
    const query = gql`{
    products(
      search: "" ,filter: {
        sku: {
          eq: "${sku}"
        }
      }
    ) {
      items {
        ... on DownloadableProduct {
          id
          name
          url_key
          downloadable_product_links {
            id
            uid
            title
            price
          }
        }
      }
    }
  }`;
    return query;
};

export const getConfigurableProduct = (sku) => {
    const query = gql`{
    products(
      search: "" ,filter: {
        sku: {
          eq: "${sku}"
        }
      }
    ) {
      items {
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id
            label
            position
            use_default
            attribute_code
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
            product_id
          }
          variants {
            product {
              ${productDetail}
              ${priceRange}
              ${priceTiers}
              media_gallery {
                url
                label
                ... on ProductVideo {
                    video_content {
                        media_type
                        video_provider
                        video_url
                        video_title
                        video_description
                        video_metadata
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
      }
    }
  }`;
    return query;
};

export const getGroupedProduct = gql`
    query getGroupedProduct($sku: String!) {
        products(search: "", filter: { sku: { eq: $sku } }) {
            items {
                __typename
                ... on GroupedProduct {
                    items {
                        qty
                        position
                        product {
                            id
                            name
                            sku
                            ${modules.catalog.productListing.label.sale.enabled ? 'sale' : ''}
                            stock_status
                            special_from_date
                            special_to_date
                            ${priceRange}
                            ${priceTiers}
                        }
                    }
                }
            }
        }
    }
`;

export const getProductLabel = (url) => gql`
{
  products(
    search: "" ,filter: {
      url_key: {
        eq: "${url}"
      }
    }
  ) {
    items {
      id
      __typename
      ${weltpixel_labels}
    }
  }
}
`;

export const getProductBannerLite = (url) => {
    const query = gql`{
      products(
          search: "", filter: {
            url_key: {
              eq: "${url}"
            }
          }
        ) {
          items {
            id
            banners_data {
              entity_id
              salesrule_id
              banner_image
              banner_type
              banner_link
              banner_alt
            }
          }
          total_count
        }
  }`;
    return query;
};

export const createCompareList = gql`
    mutation createCompareList($uid:[ID]){
      createCompareList(
          input: {
            products: $uid
          }
      ) {
          uid
          item_count
          attributes {
              code
              label
          }
          items {
              uid
              product {
                  id
                  sku
                  name
                  description {
                      html
                  }
              }
          }
      }
    }
`;

export const addProductsToCompareList = gql`
    mutation addProductsToCompareList($uid:ID!, $products:[ID]!){
        addProductsToCompareList(
          input: {
            uid: $uid,
            products: $products
          }
        ) {
          uid
          item_count
          attributes {
            code
            label
          }
          items {
            uid
            product {
              sku
              name
              description {
                html
              }
            }
          }
        }
    }
`;

export default {
    getProductBySku,
    getProduct,
};
