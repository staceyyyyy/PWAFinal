/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getReview = gql`
   query getReview($pageSizeReview: Int , $currentPageReview: Int) {
        customer {
            reviews(pageSize:$pageSizeReview,currentPage:$currentPageReview){
                items{
                  average_rating
                  created_at
                  nickname
                  product{
                    id
                    url_key
                    image{
                        url
                    }
                    name
                  }
                  ratings_breakdown{
                    name
                    value
                  }
                  summary
                  text
                }
                page_info{
                  current_page
                  page_size
                  total_pages
                }
              }
        }
    }
`;
