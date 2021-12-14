import React, { useState, useEffect } from 'react';
import Content from '@core_modules/paypal/pages/review/components';
import Layout from '@layout';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import { getCartId } from '@helpers/cartId';
import Router from 'next/router';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import Cookies from 'js-cookie';
import { getAppEnv } from '@root/core/helpers/env';
import gqlService from '@core_modules/checkout/services/graphql';
import Toast from '@common_toast';
import {
    getCartCallbackUrl, getLoginCallbackUrl, getSuccessCallbackUrl,
} from '@core_modules/checkout/helpers/config';

const PaypalReviewCore = (props) => {
    const {
        t, pageConfig,
    } = props;

    const config = {
        successRedirect: {
            link: getSuccessCallbackUrl(),
            orderId: true,
        },
        cartRedirect: {
            link: getCartCallbackUrl(),
        },
        loginRedirect: {
            link: getLoginCallbackUrl({ errorGuest: false }),
        },
    };

    let { cartId, isLogin } = props;
    let urlRedirect = '/checkout/cart';
    if (modules.checkout.checkoutOnly) {
        urlRedirect = getStoreHost(getAppEnv());
    }
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        isLogin = Cookies.get('isLogin');
        if (!cartId) {
            Router.push(urlRedirect);
        }
    }

    const [checkout, setCheckout] = useState({
        cart: {},
        shippingMethods: [],
        selectedShippingMethod: null,
        isGuest: false,
        isCouponAppliedToCart: false,
        loading: {
            all: false,
            order: false,
        },
    });

    const [isError, setError] = useState(false);

    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [getItemCart, { data: itemCart, error: errorItem }] = gqlService.getItemCart();

    const initData = () => {
        const { cart } = dataCart;
        const { items } = itemCart.cart;
        const state = { ...checkout };
        cart.items = items;

        if (cart && cart.items && cart.items.length === 0) {
            window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
        } else {
            cart.items.map((item) => {
                if (item.product && item.product.stock_status === 'OUT_OF_STOCK') {
                    window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
                }
                return null;
            });
        }

        // init cart & customer
        state.cart = cart;

        // init coupon
        state.isCouponAppliedToCart = cart && cart.applied_coupons ? cart.applied_coupons : false;

        // init shipping address
        const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;

        // init shipping method
        if (shipping && shipping.available_shipping_methods) {
            const availableShipping = shipping.available_shipping_methods.filter((x) => x.available && x.carrier_code !== 'pickup');
            state.shippingMethods = availableShipping.map((item) => ({
                ...item,
                label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                promoLabel: `${item.shipping_promo_name}`,
                value: `${item.carrier_code}_${item.method_code}`,
            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            state.selectedShippingMethod = `${shippingMethod.carrier_code}_${shippingMethod.method_code}`;
        }

        state.loading.all = false;

        setCheckout(state);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cdt = getCheckoutData();
            if (cdt) removeCheckoutData();
        }
    }, []);

    useEffect(() => {
        setCheckout({
            ...checkout,
            isGuest: !isLogin,
        });
    }, [isLogin]);

    useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                all: true,
            },
            isGuest: !isLogin,
        });

        const loadCart = isLogin ? !dataCart && !itemCart : !dataCart && !itemCart;

        if (loadCart) {
            getCart({ variables: { cartId } });
            getItemCart({ variables: { cartId } });
        }

        if (errorCart && errorItem) {
            setError(true);
            // window.location.replace('/checkout/cart');
        }

        if (dataCart && dataCart.cart && itemCart && itemCart.cart) {
            initData();
        }
    }, [dataCart, itemCart]);

    const contentProps = {
        checkout,
        setCheckout,
        config,
    };

    return (
        <Layout pageConfig={pageConfig} {...props} showRecentlyBar={false}>
            <Content {...props} {...contentProps} />
            <Toast open={isError} message={t('checkout:cartError')} variant="error" setOpen={setError} />
        </Layout>
    );
};

export default PaypalReviewCore;
