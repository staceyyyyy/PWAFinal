import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/customer/services/graphql/schema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

const config = {
    context: {
        request: 'internal',
    },
};

export const getRegions = () => useLazyQuery(Schema.getRegion);

export const getCountries = () => useLazyQuery(Schema.getCountries);

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export const getCustomer = () => useQuery(Schema.getCustomer, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerOrder = () => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
    },
});

export const getCustomerSettings = () => useQuery(Schema.getCustomerSettings, {
    context: {
        request: 'internal',
    },
});

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const customerWishlist = (options) => useLazyQuery(Schema.customerWishlist, {
    ...options,
    ...config,
});

export const shareWishlist = (options = {}) => useMutation(Schema.shareWishlist, {
    ...options,
    ...config,
});

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : 'cache-first',
    skip: typeof window === 'undefined',
});

export const getGiftCard = () => useQuery(Schema.getGiftCard, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const checkBalance = (code) => useQuery(Schema.checkBalance, {
    context: {
        request: 'internal',
    },
    variables: {
        gift_card_code: code,
    },
    skip: code === '' || !code,
});

export const updatedDefaultAddress = (options = {}) => useMutation(Schema.updatedDefaultAddress, {
    ...options,
    ...config,
});

export const updateCustomerAddress = (options = {}) => useMutation(Schema.updateCustomerAddress, {
    ...options,
    ...config,
});

export const createCustomerAddress = (options = {}) => useMutation(Schema.createCustomerAddress, {
    ...options,
    ...config,
});

export const updateCustomer = (options = {}) => useMutation(Schema.updateCustomer, {
    ...options,
    ...config,
});

export const updateCustomerProfile = (options = {}) => useMutation(Schema.updateCustomerProfile, {
    ...options,
    ...config,
});

export const changeCustomerPassword = (options = {}) => useMutation(Schema.changeCustomerPassword, {
    ...options,
    ...config,
});

export const addSimpleProductsToCart = () => useMutation(Schema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const removeWishlist = () => useMutation(Schema.removeWishlist, {
    context: {
        request: 'internal',
    },
});

export const removeAddress = () => useMutation(Schema.removeAddress, {
    context: {
        request: 'internal',
    },
});

export const getCustomerCartId = () => useLazyQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export const reOrder = () => useMutation(Schema.reOrder, {
    context: {
        request: 'internal',
    },
});

export const newPassword = () => useMutation(Schema.setNewPassword, {
    ...config,
});

export const subscribeNewsletter = () => useMutation(Schema.subscribeNewsletter, { ...config });

export default {
    getCountries, getCityByRegionId, customerNotificationList, getCustomer, getCustomerOrder, reOrder,
};
