/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import { getBrandsData } from '@core_modules/brands/services/graphql/shema';

export const getBrands = (variables) => useQuery(getBrandsData, {
    variables,
});
