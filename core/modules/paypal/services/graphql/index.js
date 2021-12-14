import { useMutation } from '@apollo/client';

import * as Schema from '@core_modules/paypal/services/graphql/schema';

const USING_INTERNAL = true;

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

export const setPaypalPaymentMethod = () => useMutation(Schema.setPaypalPaymentMethod, {
    context: {
        request: 'internal',
    },
});

export const createPaypalExpressToken = () => useMutation(Schema.createPaypalExpressToken, {
    context: {
        request: 'internal',
    },
});

export const setShippingAddressByInput = (options = {}) => useMutation(Schema.setShippingAddressByInput, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setBillingAddressByInput = (options = {}) => useMutation(Schema.setBillingAddressByInput, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setGuestEmailAddressOnCart = (options = {}) => useMutation(Schema.setGuestEmailAddressOnCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export default { setPaypalPaymentMethod, createPaypalExpressToken, setGuestEmailAddressOnCart };
