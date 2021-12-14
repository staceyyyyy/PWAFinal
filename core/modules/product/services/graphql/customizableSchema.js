/* eslint-disable no-plusplus */
import { gql } from '@apollo/client';
import { modules } from '@config';

const valueOption = `
    option_id
    required
    sort_order
    title
    value {
      option_type_id
      price
      price_type
      sku
      sort_order
      title
      uid
    }
`;

const valueFieldOption = `
  option_id
  required
  sort_order
  title
  value {
    price
    price_type
    sku
    uid
    max_characters
  }
`;

export const getCustomizableOption = (url) => gql`
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
      ${modules.product.customizableOptions.enabled && `
        ... on CustomizableProductInterface {
          options {
            title
            option_id
            required
            sort_order
            __typename
          }
        }
      `}
    }
  }
}
`;

export const getCustomizableCheckboxOption = (url_key = '') => gql`
{
    products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
          items {
            ... on CustomizableProductInterface {
              options {
                    option_id
                 ... on CustomizableCheckboxOption {
                      ${valueOption}
                    }
              }
            }
          }
      }
  }
`;

export const getCustomizableMultipleOption = (url_key = '') => gql`
{
    products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
          items {
            ... on CustomizableProductInterface {
              options {
                    option_id
                 ... on CustomizableMultipleOption {
                      ${valueOption}
                    }
              }
            }
          }
      }
  }
`;

export const getCustomizableRadioOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
               ... on CustomizableRadioOption {
                    ${valueOption}
                }
            }
          }
        }
    }
}
`;

export const getCustomizableDropDownOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
              __typename
              required
               ... on CustomizableDropDownOption {
                    ${valueOption}
                  }
            }
          }
        }
    }
}
`;

export const getCustomizableAreaOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
              __typename
              required
               ... on CustomizableAreaOption {
                    ${valueFieldOption}
                  }
            }
          }
        }
    }
}
`;

export const getCustomizableFieldOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
              __typename
              required
               ... on CustomizableFieldOption {
                    ${valueFieldOption}
                  }
            }
          }
        }
    }
}
`;

export const getCustomizableFileOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
              __typename
              required
               ... on CustomizableFileOption {
                    option_id
                    product_sku
                    required
                    sort_order
                    title
                    value {
                      file_extension
                      image_size_x
                      image_size_y
                      price
                      price_type
                      uid
                      sku
                    }
                 }
            }
          }
        }
    }
}
`;

export const getCustomizableDateOption = (url_key = '') => gql`
{
  products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
        items {
          ... on CustomizableProductInterface {
            options {
                  option_id
              __typename
              required
               ... on CustomizableDateOption {
                    option_id
                    product_sku
                    required
                    sort_order
                    title                  
                    value {
                      price
                      price_type
                      uid
                      
                    }
                  }
            }
          }
        }
    }
}
`;

export default {
    getCustomizableCheckboxOption,
};
