/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getStoreLocations = gql`
    query storeLocation{
        storeLocation{
            items {
                address
                baseimage
                city
                country_id
                email
                latitude
                link
                longitude
                phone
                state
                store_name
                storepickup_id
                zipcode
            }
        }
    }
`;
