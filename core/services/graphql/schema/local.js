import { gql } from '@apollo/client';

export const localTotalCart = gql`
    {
        totalCart @client
    }
`;

export const localResolver = gql`
    {
        resolver @client
    }
`;

export const localCompare = gql`
    {
        item_count @client
        items @client
    }
`;

export default {
    localTotalCart,
    localResolver,
    localCompare,
};
