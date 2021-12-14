import { gql } from '@apollo/client';

export const getFormDataRma = gql`
    query getNewFormDataAwRma($email: String!, $order_number: String!) {
        getNewFormDataAwRma(email: $email, order_number: $order_number) {
            allowed_file_extensions
            custom_fields {
                id
                frontend_labels {
                    store_id
                    value
                }
                is_editable
                is_required
                name
                refers
                website_ids
                options {
                    frontend_labels {
                      store_id
                      value
                    }
                    id
                  }
            }
            items {
                is_returnable
                item_id
                name
                other_rma_request
                price
                price_incl_tax
                qty_returnable
                sku
                image_url
                parent_item_id
                url_key
              }
        }
    }
`;

export const requestRma = gql`
mutation createRequestAwRma (
    $order_number: String!,
    $customer_email: String!,
    $customer_name: String!,
    $custom_fields: [AwRmaCustomFieldInput]!,
    $order_items: [AwRmaOrderItemsInput]!,
    $thread_message: AwRmaThreadMessageInput
) {
    createRequestAwRma(
        input: {
            order_number: $order_number
            customer_name: $customer_name
            customer_email: $customer_email
            custom_fields: $custom_fields
            order_items: $order_items
            thread_message: $thread_message
        }
    ) {
        detail_rma {
            id
            increment_id
            order_id
            order_number
            status {
                name
                id
            }
        }
    }
}
`;

export const getHistoryRma = gql`
query getHistoryRma (
    $page_size: Int,
    $current_page: Int,
){
    getCustomerRequestAwRma(page_size: $page_size,current_page: $current_page) {
      current_page
      page_size
      total_count
      total_pages
      items {
        id
        increment_id
        order_date
        order_number
        order_id
        items {
          name
        }
        status {
          id
          name
        }
      }
    }
  }
`;

const responseRma = `
detail_rma {
    id
    increment_id
    confirm_shipping {
      status
      step
      print_label_url
    }
    order_number
    order_date
    status {
        name
    }
    customer_address {
      firstname
      lastname
      telephone
      street
      city
      region
      postcode
      suffix
      vat_id
      fax 
      
    }
    custom_fields {
      field {
        frontend_labels {
          value
        }
        id
      }
      value {
        id
        frontend_labels {
          value
        }
      }
    }
    items {
        name
        image_url
        id
        url_key
        item_id
        qty_rma 
        price
        price_incl_tax
        sku
        custom_fields {
            field {
              id
              frontend_labels {
                value
              }
            }
            value {
              frontend_labels {
                value
              }
              id
            }
        }
    }
    thread_message {
        created_at
        owner_name
        owner_type
        is_auto
        is_internal
        id
        text
        attachments {
            file_name
            image_url
            name
          }
      }
  }
  form_data {
    allowed_file_extensions
    custom_fields {
      name
      frontend_labels {
        value
      }
      is_editable
      is_required
      type
      refers
      id
      options {
        id
        frontend_labels {
          value
        }
      }
    }
  }
`;

export const getUpdateFormRma = gql`
query getUpdateFormRma(
    $email: String!,
    $increment_id: String!,
){
    getUpdateFormDataAwRma(email: $email, increment_id: $increment_id) {
      ${responseRma}
    }
  }
`;

export const updateRma = gql`
  mutation updateRma(
    $custom_fields: [AwRmaCustomFieldInput]
    $customer_email: String!
    $increment_id: String!
    $order_items: [AwRmaOrderItemsInput]
    $print_label: AwRmaPrintLabelInput
    $update_status: Boolean
    $thread_message: AwRmaThreadMessageInput
  ){
    updateRequestAwRma(input: {
        custom_fields: $custom_fields
        customer_email: $customer_email
        increment_id: $increment_id
        order_items: $order_items
        print_label: $print_label
        update_status: $update_status
        thread_message: $thread_message
    }) {
        ${responseRma}
    }
  }
`;

export const cancelRma = gql`
mutation cancelRma(
  $email: String!,
  $increment_id: String!,
) {
  cancelRequestAwRma(input: {
    email:$email,
    increment_id: $increment_id
  }) {
    ${responseRma}
  }
}
`;

export const getCustomer = gql`
{
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;

export default {
    getFormDataRma,
};
