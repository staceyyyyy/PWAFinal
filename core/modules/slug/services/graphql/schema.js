/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getResolver = (url) => {
    const query = gql`{
      urlResolver(url: "${url}") {
        id
        redirectCode
        relative_url
        type
      }
    }
  `;
    return query;
};
