import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@core_modules/checkout/services/graphql/schema';
import * as PaypalSchema from '@core_modules/checkout/services/graphql/paypalSchema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

const NOT_USING_INTERNAL = false;
const USING_INTERNAL = true;

export const getIndodanaUrl = () => useLazyQuery(Schema.getIndodanaUrl);

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

// xendit
export const xenditCreateInvoice = (options = {}) => useMutation(Schema.xenditCreateInvoice, {
    ...options,
    ...config(USING_INTERNAL),
});

export const xenditSimulateQr = (options = {}) => useMutation(Schema.xenditSimulateQr, {
    ...options,
    ...config(USING_INTERNAL),
});

export const getCustomer = (options = {}) => useLazyQuery(Schema.getCustomer, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getAddressCustomer = (options = {}) => useLazyQuery(Schema.getAddressCustomer, {
    ...options,
    ...config(USING_INTERNAL),
    errorPolicy: 'all',
});

export const getCart = (options = {}) => useLazyQuery(Schema.getCart, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getItemCart = (options = {}) => useLazyQuery(Schema.getItemCart, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getRewardPoint = () => useLazyQuery(Schema.getRewardPoint, { ...config(USING_INTERNAL) });

export const setShippingAddress = (options = {}) => useMutation(Schema.setShippingAddressById, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setShippingAddressByInput = (options = {}) => useMutation(Schema.setShippingAddressByInput, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setBillingAddressById = (options = {}) => useMutation(Schema.setBillingAddressById, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setBillingAddressVirtualProduct = (options = {}) => useMutation(Schema.setBillingAddressVirtualProduct, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setBillingAddressByInput = (options = {}) => useMutation(Schema.setBillingAddressByInput, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setShippingMethod = (options = {}) => useMutation(Schema.setShippingMethod, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setPaymentMethod = (options = {}) => useMutation(Schema.setPaymentMethod, {
    ...options,
    ...config(USING_INTERNAL),
});

export const applyCouponToCart = (options = {}) => useMutation(Schema.applyCouponToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeCouponFromCart = (options = {}) => useMutation(Schema.removeCouponFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const applyRewardPointsToCart = (options = {}) => useMutation(Schema.applyRewardPointsToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeRewardPointsFromCart = (options = {}) => useMutation(Schema.removeRewardPointsFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setGuestEmailAddressOnCart = (options = {}) => useMutation(Schema.setGuestEmailAddressOnCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const placeOrder = (options = {}) => useMutation(Schema.placeOrder, {
    ...options,
    ...config(USING_INTERNAL),
});

export const placeOrderWithOrderComment = (options = {}) => useMutation(Schema.placeOrderWithOrderComment, {
    ...options,
    ...config(USING_INTERNAL),
});

export const getSnapToken = (options = {}) => useLazyQuery(Schema.getSnapToken, {
    ...options,
    ...config(NOT_USING_INTERNAL),
});

export const getSnapOrderStatusByOrderId = (options = {}) => useLazyQuery(Schema.getSnapOrderStatusByOrderId, {
    ...options,
    ...config(NOT_USING_INTERNAL),
});

export const applyStoreCreditToCart = (options = {}) => useMutation(Schema.applyStoreCreditToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeStoreCreditFromCart = (options = {}) => useMutation(Schema.removeStoreCreditFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const applyGiftCardToCart = (options = {}) => useMutation(Schema.applyGiftCardToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeGiftCardFromCart = (options = {}) => useMutation(Schema.removeGiftCardFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setPickupStore = (options = {}) => useMutation(Schema.setPickupStore, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removePickupStore = (options = {}) => useMutation(Schema.removePickupStore, {
    ...options,
    ...config(USING_INTERNAL),
});

export const getPickupStore = (options = {}) => useQuery(Schema.getPickupStore, {
    ...options,
    ...config(USING_INTERNAL),
});

export const getCustomerCartId = () => useLazyQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export const mergeCart = () => useMutation(Schema.mergeCart, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const updatedDefaultAddress = (options = {}) => useMutation(Schema.updatedDefaultAddress, {
    ...options,
    ...config(USING_INTERNAL),
});

export const updateCustomerAddress = (options = {}) => useMutation(Schema.updateCustomerAddress, {
    ...options,
    ...config(USING_INTERNAL),
});

export const createCustomerAddress = (options = {}) => useMutation(Schema.createCustomerAddress, {
    ...options,
    ...config(USING_INTERNAL),
});

export const updateExtraFee = (options = {}) => useMutation(Schema.updateExtraFee, {
    ...options,
    ...config(USING_INTERNAL),
});

export const addProductToCartPromo = () => useMutation(Schema.addProductToCartPromo, {
    ...config(USING_INTERNAL),
});

// action item cart
export const deleteItemCart = () => useMutation(Schema.deleteCartitem, {
    ...config(USING_INTERNAL),
});

export const updateItemCart = () => useMutation(Schema.updateCartitem, {
    ...config(USING_INTERNAL),
});

export const addOrderComment = () => useMutation(Schema.addOrderComment, {
    ...config(USING_INTERNAL),
});

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : '',
});

export const pickupLocations = () => useLazyQuery(Schema.pickupLocations);

export const setInstoreShippingAddress = (options = {}) => useMutation(Schema.setInstoreShippingAddress, {
    ...options,
    ...config(USING_INTERNAL),
});

// paypal
export const createPaypalExpressToken = () => useMutation(PaypalSchema.createPaypalExpressToken, {
    ...config(USING_INTERNAL),
});

export default {
    updateExtraFee,
    updatedDefaultAddress,
    updateCustomerAddress,
    createCustomerAddress,
    getCustomerCartId,
    mergeCart,
    getCustomer,
    getAddressCustomer,
    getCart,
    getItemCart,
    getRewardPoint,
    setShippingAddress,
    setShippingMethod,
    setBillingAddressById,
    setBillingAddressVirtualProduct,
    setBillingAddressByInput,
    setShippingAddressByInput,
    placeOrder,
    placeOrderWithOrderComment,
    setPaymentMethod,
    setGuestEmailAddressOnCart,
    applyCouponToCart,
    removeCouponFromCart,
    getSnapToken,
    getSnapOrderStatusByOrderId,
    applyStoreCreditToCart,
    removeStoreCreditFromCart,
    applyGiftCardToCart,
    removeGiftCardFromCart,
    applyRewardPointsToCart,
    removeRewardPointsFromCart,
    getPickupStore,
    setPickupStore,
    removePickupStore,
    deleteItemCart,
    updateItemCart,
    addOrderComment,
    getCmsPage,
    getIndodanaUrl,
    createPaypalExpressToken,
    pickupLocations,
    setInstoreShippingAddress,
    xenditCreateInvoice,
    xenditSimulateQr,
};
