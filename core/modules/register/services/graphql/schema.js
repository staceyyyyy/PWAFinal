import { gql } from '@apollo/client';

export const register = gql`
    mutation register(
        $firstName: String!,
        $lastName: String,
        $email: String!,
        $gender: Int,
        $dob: String,
        $password: String!,
        $phoneNumber: String,
        $subscribe: Boolean,
        $otp: String,
        $whatsappNumber: String,
    ) {
      internalCreateCustomerToken(
        input: {
          firstname: $firstName,
          lastname: $lastName,
          email: $email,
          gender: $gender,
          date_of_birth: $dob,
          password: $password,
          phonenumber: $phoneNumber,
          is_subscribed: $subscribe,
          otp: $otp,
          whatsapp_number: $whatsappNumber,
        }
      ) {
        token
        is_email_confirmation
      }
    }
`;

export const getCustomer = gql`
{
    customer {
      id
      firstname
      email
      phonenumber
      whatsapp_number
    }
  }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const mergeCart = gql`
mutation mergeCart(
    $sourceCartId: String!,
    $destionationCartId: String!
) {
    mergeCarts(
      source_cart_id:$sourceCartId,
      destination_cart_id: $destionationCartId
    ) {
      id
      total_quantity
    }
  }
`;

export const otpConfig = gql`
    {
        otpConfig {
            otp_enable {
                enable_otp_register
            }
        }
    }
`;

export const getGuestCustomer = gql`
  query getGuestCustomer($ids: FilterEqualTypeInput) {
    ordersFilter(filters: {
      ids: $ids
    }){
      data{
        detail{
          customer_firstname
          customer_lastname
          customer_email
        }
      }
    }
  }
`;
export default {
    register,
};
