/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import schema, { getCmsBlocks as getCmsBlocksSchema } from '@core_modules/theme/services/graphql/schema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

export const getCategories = () => useQuery(schema.categories);
export const getCategoryByName = (name) => useLazyQuery(schema.getCategoryByName(name));
export const getProduct = (key) => useLazyQuery(schema.getProduct(key));
export const getRecentlyProduct = () => useLazyQuery(schema.getRecentlyProduct());
export const getVesMenu = (options) => useQuery(schema.vesMenu, options);
export const getCurrency = () => useQuery(schema.getCurrencySchema);

export const getCustomer = () => useQuery(schema.getCustomer, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getIsSubscribedCustomer = () => useLazyQuery(schema.getCustomer, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const removeToken = () => useMutation(schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const getCmsBlocks = (variables) => useQuery(getCmsBlocksSchema, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
});

export default {
    getCmsBlocks,
    getCategories,
    getCustomer,
    getIsSubscribedCustomer,
    removeToken,
    getVesMenu,
    getProduct,
    getCategoryByName,
    getCurrency,
    getRecentlyProduct,
};
