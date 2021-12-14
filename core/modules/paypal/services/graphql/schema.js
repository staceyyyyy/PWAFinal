import { gql } from '@apollo/client';

export const setPaypalPaymentMethod = gql`
mutation setPaypalPaymentMethod(
    $cartId: String!,
    $payerId: String!,
    $token: String!
) {
    setPaymentMethodOnCart(input: {
      cart_id: $cartId
      payment_method: {
        code: "paypal_express"
        paypal_express: {
          payer_id: $payerId
          token: $token
        }
      }
    }) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
  }
  
`;

export const createPaypalExpressToken = gql`
    mutation createPaypalExpressToken(
        $cartId: String!, $code: String!, $returnUrl: String!, $cancelUrl: String!
    ) {
        createPaypalExpressToken(input: {
            cart_id: $cartId,
            code: $code,
            express_button: true,
            urls: {
            return_url: $returnUrl,
            cancel_url: $cancelUrl
            }
        }) {
            paypal_urls {
                edit
                start
            }
            token
        }
    }
`;

export const setGuestEmailAddressOnCart = gql`
    mutation($cartId: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
            cart {
               id
               email
            }
        }
    }
`;

export const setShippingAddressByInput = gql`
    mutation setShippingAddressByInput(
        $cartId: String!
        $city: String!
        $countryCode: String!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
    ) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: {
                    address: {
                        city: $city
                        country_code: $countryCode
                        firstname: $firstname
                        lastname: $lastname
                        telephone: $telephone
                        region: $region
                        street: [$street]
                        postcode: $postcode
                    }
                }
            }
        ) {
            cart {
                id
            }
        }
    }
`;

export const setBillingAddressByInput = gql`
    mutation setBillingAddressByInput(
        $cartId: String!
        $city: String!
        $countryCode: String!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
    ) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    same_as_shipping: true
                    address: {
                        city: $city
                        country_code: $countryCode
                        firstname: $firstname
                        lastname: $lastname
                        telephone: $telephone
                        region: $region
                        street: [$street]
                        postcode: $postcode
                    }
                }
            }
        ) {
            cart {
              id
            }
        }
    }
`;

export default {
    createPaypalExpressToken, setPaypalPaymentMethod,
};
