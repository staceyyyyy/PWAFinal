import { gql } from '@apollo/client';
import { modules } from '@config';

export const createCartIdGuest = gql`
    mutation {
        createEmptyCart
    }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const createEmptyCartGuest = gql`
    mutation {
        createEmptyCart
    }
`;

export const addSimpleProductsToCart = gql`
mutation addSimpleProductsToCart(
    $cartId: String!,
    $qty: Float!,
    $sku: String!,
    ${modules.product.customizableOptions.enabled
      && `
      $customizable_options: [CustomizableOptionInput],
      $entered_options: [EnteredOptionInput] 
    `}
) {
    addSimpleProductsToCart(input:{
      cart_id: $cartId,
      cart_items: {
        ${modules.product.customizableOptions.enabled
          && ' customizable_options: $customizable_options'}
        data: {
          quantity: $qty,
          sku: $sku,
          ${modules.product.customizableOptions.enabled
            && ' entered_options: $entered_options'}
        }
      }
    }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

export const addVirtualProductToCart = gql`
mutation addVirtualProductToCart(
    $cartId: String!,
    $qty: Float!,
    $sku: String!,
    ${modules.product.customizableOptions.enabled
      && `
      $customizable_options: [CustomizableOptionInput],      
      $entered_options: [EnteredOptionInput] 
      `}
) {
    addVirtualProductsToCart(input:{
      cart_id: $cartId,
      cart_items: {
        ${modules.product.customizableOptions.enabled
          && ' customizable_options: $customizable_options'}
        data: {
          quantity: $qty,
          sku: $sku,
          ${modules.product.customizableOptions.enabled
            && ' entered_options: $entered_options'}
        }
      }
    }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

export const addDownloadableProductsToCart = gql`
mutation(
  $cartId : String!,
  $sku: String!,
  $qty: Float!,
  $download_product_link: [DownloadableProductLinksInput],
  ${modules.product.customizableOptions.enabled
    && `
    $customizable_options: [CustomizableOptionInput],      
    $entered_options: [EnteredOptionInput] 
    `}
) {
  addDownloadableProductsToCart(
    input: {
      cart_id: $cartId
      cart_items: {
        ${modules.product.customizableOptions.enabled
          && ' customizable_options: $customizable_options'}
        data: {
          sku: $sku,
          quantity: $qty,
          ${modules.product.customizableOptions.enabled
            && ' entered_options: $entered_options'}
        }
        downloadable_product_links: $download_product_link
      }
    }
  ) {
    cart {
      total_quantity
      items {
        product {
          sku
        }
        quantity
        ... on DownloadableCartItem {
          links {
            title
            price
          }
          samples {
            title
            sample_url
          }
        }
      }
    }
  }
}
`;

export const addConfigProductsToCart = gql`
mutation (
  $cartId: String!,
  $qty: Float!,
  $sku: String!,
  $parentSku: String!,  
  ${modules.product.customizableOptions.enabled
    && `
    $customizable_options: [CustomizableOptionInput],
    $entered_options: [EnteredOptionInput] 
  `}
) {
  addConfigurableProductsToCart(
    input: {
      cart_id: $cartId,
      cart_items: {
        ${modules.product.customizableOptions.enabled
          && ' customizable_options: $customizable_options'}
        data: {
          quantity : $qty,
          sku: $sku,
          ${modules.product.customizableOptions.enabled
            && ' entered_options: $entered_options'}            
        parent_sku: $parentSku
        }
      }
    }
  ) {
    cart {
      id
      total_quantity
    }
  }
}
`;

export const addBundleProductsToCart = gql`
mutation (
  $cartId: String!,
  $cartItems: [BundleProductCartItemInput]!,
) {
      addBundleProductsToCart(
        input: {
          cart_id: $cartId
          cart_items: $cartItems
        }
      ) {
        cart {
          id
          total_quantity
        }
      }
    }
`;

export const addProductToCart = gql`
    mutation addProductToCart(
        $cartId: String!,
        $cartItems: [CartItemInput!]!
    ) {
        addProductsToCart(
            cartId: $cartId
            cartItems: $cartItems
        ) {
            cart {
                id
                total_quantity
            }
            user_errors {
                code
                message
            }
        }
    }
`;

export const addGiftCardProductsToCart = gql`
mutation addGiftCardProductsToCart(
    $cartId: String!,
    $qty: Float!,
    $sku: String!,
    $awGcInput: awGcGiftCardOptionInput!,
    ${modules.product.customizableOptions.enabled
      && `
      $customizable_options: [CustomizableOptionInput],
      $entered_options: [EnteredOptionInput] 
    `}
) {
    addAwGcProductToCart(input: {
      cart_id: $cartId,
      cart_items: {
        ${modules.product.customizableOptions.enabled
          && ' customizable_options: $customizable_options'}
        data: {
          quantity: $qty,
          sku: $sku,
          ${modules.product.customizableOptions.enabled
            && ' entered_options: $entered_options'}
        }
        aw_giftcard_option: $awGcInput
      }
    }) {
      cart {
        id
        items {
          ... on AwGiftCardCartItem {
            quantity
            prices {
              price {
                value
              }
            }
            product {
              name
            }
          }
        }
        total_quantity
      }
    }
  }
`;

export default {
    createCartIdGuest,
};
