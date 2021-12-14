/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getBrandsData = gql`
    query getBrands(
        $pageSize: Int!,
        $currentPage: Int!,
    ) {
        getBrandList (
            pageSize:$pageSize
            currentPage: $currentPage
        ) {
            page_size
            featured {
                attribute_id
                logo
                name
                sort_order
                is_active
                category_url
            }
            items {
                attribute_id
                logo
                name
                sort_order
                is_active
                category_url
            }
        }
    }
`;
