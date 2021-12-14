import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/home/service/graphql/schema';

let fetchPolicy = '';
fetchPolicy = 'cache-first';
// uncomment this line (set 'no-cache') to test loader/skeleton component
// fetchPolicy = 'no-cache';

export const getBannerSlider = () => useQuery(Schema.getBannerSlider, {
    fetchPolicy,
});

export const getSlider = (options = {}) => useQuery(Schema.getSlider, {
    fetchPolicy,
    ...options,
});

export const getFeaturedProducts = (variables, options = {}) => useQuery(Schema.getFeaturedProducts, {
    variables,
    fetchPolicy,
    ...options,
});
export const getCategoryList = (variables) => useQuery(Schema.getCategoryList, {
    variables,
    fetchPolicy,
});

export default {
    getCategoryList, getBannerSlider, getFeaturedProducts, getSlider,
};
