/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import { setLocalStorage } from '@helper_localstorage';
import { getCartId } from '@helpers/cartId';
import Router from 'next/router';
import Layout from '@layout';
import Head from 'next/head';
import { modules, nameCheckoutState } from '@config';
import { updatePwaCheckoutLog } from '@services/graphql/repository/log';
import { getStoreHost } from '@helpers/config';
import Cookies from 'js-cookie';
import { getAppEnv } from '@root/core/helpers/env';
import Toast from '@common_toast';
import gqlService from '@core_modules/checkout/services/graphql';
import TagManager from 'react-gtm-module';
import {
    getCartCallbackUrl, getIpayUrl, getLoginCallbackUrl, getSuccessCallbackUrl,
} from '@core_modules/checkout/helpers/config';

function equalTo(ref, msg) {
    return this.test({
        name: 'equalTo',
        exclusive: false,
        message: msg || 'Error not same data',
        params: {
            reference: ref.path,
        },
        test(value) {
            return value === this.resolve(ref);
        },
    });
}

const Checkout = (props) => {
    const {
        t, storeConfig, pageConfig, Content, cartId: propsCardId,
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
    const [actUpdatePwaCheckoutLog] = updatePwaCheckoutLog();

    let { isLogin } = props;
    let pwaCheckoutState = null;
    let urlRedirect = '/checkout/cart';
    if (modules.checkout.checkoutOnly) {
        urlRedirect = getStoreHost(getAppEnv());
    }

    const [cartId, setCartId] = useState(propsCardId);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartid = getCartId();
            isLogin = Cookies.get('isLogin');
            if (!cartid) {
                Router.push(urlRedirect);
            }
            if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                pwaCheckoutState = encodeURIComponent(Cookies.get(nameCheckoutState));
            }
            setCartId(cartid);
        }
    }, []);

    const { snap_is_production, snap_client_key, allow_guest_checkout } = storeConfig;
    if (storeConfig && !allow_guest_checkout && !isLogin) {
        urlRedirect = getLoginCallbackUrl({ errorGuest: true });
        if (typeof window !== 'undefined') {
            Router.push(urlRedirect);
        }
    }

    const configPage = {
        title: t('checkout:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('checkout:pageTitle'),
        bottomNav: false,
        pageType: 'checkout',
    };

    const url = snap_is_production === '0' ? modules.checkout.snapUrl.dev : modules.checkout.snapUrl.prod;

    const [checkout, setCheckout] = useState({
        order_id: '',
        data: {
            cart: null,
            customer: null,
            shippingMethods: [],
            paymentMethod: [],
            isGuest: false,
            isCouponAppliedToCart: false,
            order_comment: null,
            rewardPoints: {},
            credit: 0,
            message: {
                open: false,
                text: 'default',
                variant: '',
            },
            defaultAddress: null,
            summary: {
                prices: null,
                items: null,
                shipping_addresses: null,
            },
        },
        selected: {
            address: null,
            shipping: {
                name: { carrier_code: null, method_code: null },
                price: null,
                original_price: null,
            },
            payment: null,
            purchaseOrderNumber: null,
            billing: null,
            delivery: 'home',
        },
        loading: {
            all: true,
            addresses: false,
            shipping: false,
            payment: false,
            purchaseOrderNumber: false,
            billing: false,
            order: false,
            coupon: false,
            storeCredit: false,
            giftCard: false,
            extraFee: false,
            paypal: false,
        },
        status: {
            addresses: false,
            openAddressDialog: false,
            backdrop: false,
            purchaseOrderApply: false,
        },
        pickupInformation: {},
        selectStore: {},
        pickup_location_code: null,
        error: {
            pickupInformation: false,
            selectStore: false,
            shippingAddress: false,
        },
        disabled: {
            address: false,
        },
    });

    const [isError, setError] = useState(false);
    const appEnv = getAppEnv();

    // config paypal
    const [initialOptionPaypal, setInitialOptionPaypal] = useState({
        'client-id': modules.paypal.clientId[appEnv],
        currency: modules.paypal.defaultCurrency,
        intent: modules.paypal.intent,
        'data-order-id': '',
        // debug: modules.paypal.debug,
        'disable-funding': modules.paypal.disableFunding,
        'merchant-id': modules.paypal.merchantId,
    });

    const [tokenData, setTokenData] = useState({});

    // start init graphql
    const [getCustomer, manageCustomer] = gqlService.getCustomer();
    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [getItemCart, { data: itemCart, error: errorItem }] = gqlService.getItemCart();
    const [getRewardPoint, rewardPoint] = gqlService.getRewardPoint();
    const [getCustomerAddress, addressCustomer] = gqlService.getAddressCustomer();
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    const [getPaypalToken, paypalTokenData] = gqlService.createPaypalExpressToken();
    // end init graphql

    /**
     * check on shipping cart item only virtual product
     * @return {bool}
     */
    const isOnlyVirtualProductOnCart = React.useMemo(() => {
        const { cart } = checkout.data;
        const cartItems = cart?.items;
        if (cartItems) {
            const cartItemsFilter = cartItems.filter((item) => {
                const { __typename } = item.product;
                return __typename !== 'VirtualProduct' && __typename !== 'DownloadableProduct' && __typename !== 'AwGiftCardProduct';
            });

            /**
             * If cart has items of type VirtualProduct, DownloadableProduct, and AwGiftCardProduct,
             * It means cart contains only virtual product(s).
             */
            const isAllVirtual = cartItemsFilter.length === 0;

            /**
             * If item is of type AwGiftCardProduct and Gift Card type is VIRTUAL
             */
            const virtualAwGcFilter = cartItems.filter((item) => {
                const { aw_gc_type, __typename } = item.product;
                return __typename === 'AwGiftCardProduct' && (aw_gc_type && aw_gc_type !== 'VIRTUAL');
            });
            const isAwGcVirtual = virtualAwGcFilter.length < 1;

            if (isAllVirtual && isAwGcVirtual) return true;
        }
        return false;
    }, [checkout?.data?.cart]);

    Yup.addMethod(Yup.string, 'equalTo', equalTo);

    const CheckoutSchema = Yup.object().shape({
        email: checkout.data.isGuest ? Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')) : null,
        payment: Yup.string().nullable().required(t('validate:required')),
        oldEmail: checkout.data.isGuest ? Yup.string().equalTo(Yup.ref('email')) : null,
        address: (isOnlyVirtualProductOnCart || checkout.selectStore.id !== null) ? null : Yup.object().nullable().required(t('validate:required')),
        billing: checkout.selected.delivery === 'home' && Yup.object().nullable().required(t('validate:required')),
        shipping: isOnlyVirtualProductOnCart
            ? null
            : checkout.selected.delivery === 'home' && Yup.object().nullable().required(t('validate:required')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            oldEmail: '',
            coupon: '',
            orderComment: '',
            giftCard: '',
            address: null,
            shipping: null,
            payment: null,
            billing: null,
        },
        validationSchema: CheckoutSchema,
        onSubmit: () => { },
    });

    const updateFormik = (cart) => {
        const address = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;
        const shipping = address && address.selected_shipping_method;
        const { email } = cart;
        const payment = cart.selected_payment_method && cart.selected_payment_method.code;
        const billing = cart.billing_address;
        if (email && !formik.values.email) {
            formik.setFieldValue('email', email || '');
            formik.setFieldValue('oldEmail', email || '');
        }

        if (cart.applied_coupons) {
            const [coupon] = cart.applied_coupons;
            formik.setFieldValue('coupon', coupon.code);
        }

        formik.setFieldValue('address', address);
        formik.setFieldValue('shipping', shipping);
        formik.setFieldValue('payment', payment);
        formik.setFieldValue('billing', billing);
    };

    const initData = () => {
        const { cart } = dataCart;
        const { items } = itemCart.cart;
        const state = { ...checkout };
        cart.items = items;

        if (cart && cart.items && cart.items.length === 0) {
            if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                actUpdatePwaCheckoutLog({
                    variables: {
                        cart_id: cart.id,
                        state: pwaCheckoutState,
                        status: 0,
                    },
                });
            }
            window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
        } else {
            cart.items.map((item) => {
                if (item.product && item.product.stock_status === 'OUT_OF_STOCK') {
                    if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                        actUpdatePwaCheckoutLog({
                            variables: {
                                cart_id: cart.id,
                                state: pwaCheckoutState,
                                status: 0,
                            },
                        });
                    }
                    window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
                }
                return null;
            });
        }

        let customer;
        let address;

        if (!state.data.isGuest && manageCustomer && manageCustomer.data && manageCustomer.data.customer && manageCustomer.data.customer.addresses) {
            customer = manageCustomer.data.customer;
            [address] = customer ? customer.addresses.filter((item) => item.default_shipping) : [null];
        }

        state.data.defaultAddress = customer ? address : null;

        // init cart & customer
        state.data.cart = cart;

        // init coupon
        state.data.isCouponAppliedToCart = cart && cart.applied_coupons ? cart.applied_coupons : false;

        // init shipping address
        const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;

        if (shipping) {
            state.selected.address = {
                firstname: shipping.firstname,
                lastname: shipping.lastname,
                city: shipping.city,
                region: shipping.region,
                country: shipping.country,
                postcode: shipping.postcode,
                telephone: shipping.telephone,
                street: shipping.street,
                pickup_location_code: shipping.pickup_location_code,
            };

            if (typeof shipping.is_valid_city !== 'undefined') {
                state.error.shippingAddress = !shipping.is_valid_city;
            }

            state.pickup_location_code = shipping.pickup_location_code;
        } else if (!state.data.isGuest && address) {
            state.selected.address = {
                firstname: address.firstname,
                lastname: address.lastname,
                city: address.city,
                region: {
                    label: address.region.region,
                    code: address.region.region_code,
                },
                postcode: address.postcode,
                telephone: address.telephone,
                street: address.street,
                country: address.country,
                pickup_location_code: shipping.pickup_location_code,
            };
        }

        // init shipping method
        if (shipping && shipping.available_shipping_methods) {
            const availableShipping = shipping.available_shipping_methods.filter(
                (x) => x.carrier_code !== 'pickup' && x.carrier_code !== 'instore',
            );

            state.data.shippingMethods = availableShipping.map((item) => ({
                ...item,
                label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                promoLabel: `${item.shipping_promo_name}`,
                value: `${item.carrier_code}_${item.method_code}`,
            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            state.selected.shipping = `${shippingMethod.carrier_code}_${shippingMethod.method_code}`;

            if (modules.checkout.pickupStore.enabled) {
                if (shippingMethod.carrier_code === 'pickup' && shippingMethod.method_code === 'pickup') {
                    const custAddress = cart.shipping_addresses[0];
                    state.selected.delivery = 'pickup';
                    state.error.shippingAddress = false;
                    state.selectStore = {
                        city: custAddress.city,
                        country_code: custAddress.country.code,
                        name: custAddress.firstname,
                        postcode: custAddress.postcode,
                        region: custAddress.region.label,
                        street: custAddress.street,
                        telephone: custAddress.telephone,
                        code: cart.items[0].pickup_item_store_info.loc_code,
                    };
                    if (cart.pickup_store_person) {
                        state.pickupInformation = {
                            pickup_person_email: cart.pickup_store_person.email,
                            pickup_person_name: cart.pickup_store_person.name,
                            pickup_person_phone: cart.pickup_store_person.handphone,
                        };
                    }
                }
            }

            if (shipping.pickup_location_code) {
                state.selected.delivery = 'instore';
                state.error.shippingAddress = false;
            }
        }

        // init payment method
        if (cart.available_payment_methods) {
            state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                ...method,
                label: method.title,
                value: method.code,
                image: null,
            }));
        } else if (checkout.selected.delivery === 'pickup') {
            state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                ...method,
                label: method.title,
                value: method.code,
                image: null,
            }));
        }

        if (cart.selected_payment_method) {
            state.selected.payment = cart.selected_payment_method.code;
            if (modules.paypal.enabled && cart.selected_payment_method.code === 'paypal_express' && initialOptionPaypal['data-order-id'] === '') {
                getPaypalToken({
                    variables: {
                        cartId: cart.id,
                        code: 'paypal_express',
                        returnUrl: modules.paypal.returnUrl,
                        cancelUrl: modules.paypal.cancelUrl,
                    },
                }).then((res) => {
                    if (res.data && res.data.createPaypalExpressToken && res.data.createPaypalExpressToken.token) {
                        const { token } = res.data.createPaypalExpressToken;
                        setTokenData(res.data.createPaypalExpressToken);
                        setInitialOptionPaypal({
                            ...initialOptionPaypal,
                            'data-order-id': token,
                        });
                    }
                });
            }
        }

        if (rewardPoint && rewardPoint.data && rewardPoint.data.customerRewardPoints) {
            state.data.rewardPoints = rewardPoint.data.customerRewardPoints;
        }

        state.loading.all = false;
        state.loading.paypal = false;

        setCheckout(state);
        updateFormik(cart);
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
            data: {
                ...checkout.data,
                isGuest: !isLogin,
            },
        });
    }, [isLogin]);

    useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                all: true,
                paypal: true,
            },
            data: {
                ...checkout.data,
                isGuest: !isLogin,
            },
        });

        if (!manageCustomer.data && isLogin) {
            getCustomer();
            if (modules.rewardpoint.enabled) getRewardPoint();
        }

        const loadCart = isLogin ? manageCustomer.data && !dataCart && !itemCart : !dataCart && !itemCart;

        if (loadCart && cartId) {
            getCart({ variables: { cartId } });
            getItemCart({ variables: { cartId } });
        }

        if (errorCart || errorItem) {
            if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                actUpdatePwaCheckoutLog({
                    variables: {
                        cart_id: cartId,
                        state: pwaCheckoutState,
                        status: 0,
                    },
                });
            }
            setError(true);
            setTimeout(() => {
                window.location.replace(config.cartRedirect.link);
            }, [1000]);
        }

        if (
            dataCart
            && dataCart.cart
            && dataCart.cart.shipping_addresses
            && dataCart.cart.shipping_addresses.length === 0
            && !checkout.data.isGuest
        ) {
            setCheckout({
                ...checkout,
                loading: {
                    ...checkout.loading,
                    addresses: true,
                },
            });
            getCustomerAddress();
        }

        if (dataCart && dataCart.cart && itemCart && itemCart.cart && cartId) {
            initData();
        }
    }, [manageCustomer.data, dataCart, itemCart, cartId, errorCart, errorItem]);

    // effect get customer

    React.useEffect(() => {
        if (manageCustomer && manageCustomer.data && manageCustomer.data.customer) {
            const state = { ...checkout };
            state.data.customer = manageCustomer.data.customer;
            setCheckout(state);
        }
    }, [manageCustomer.data]);

    // effect get customer address

    React.useEffect(() => {
        const state = { ...checkout };
        let customer;
        let address;
        if (
            !state.data.isGuest
            && addressCustomer
            && addressCustomer.data
            && addressCustomer.data.customer
            && addressCustomer.data.customer.addresses
        ) {
            customer = addressCustomer.data.customer;
            [address] = customer ? customer.addresses.filter((item) => item.default_shipping) : [null];
            state.data.defaultAddress = customer ? address : null;
            state.loading.addresses = false;
            setCheckout(state);
        }
    }, [addressCustomer]);

    React.useMemo(() => {
        if (checkout.data.cart) {
            const { cart } = checkout.data;
            const state = { ...checkout };
            // init shipping address
            const shipping = cart && cart.shipping_addresses && cart.shipping_addresses.length > 0 ? cart.shipping_addresses[0] : null;
            if (shipping && shipping.available_shipping_methods && shipping.available_shipping_methods.length > 0) {
                const availableShipping = shipping.available_shipping_methods.filter((x) => x.carrier_code !== 'pickup');
                state.data.shippingMethods = availableShipping.map((item) => ({
                    ...item,
                    label: `${item.method_title === null ? '' : `${item.method_title} - `} ${item.carrier_title} `,
                    promoLabel: `${item.shipping_promo_name}`,
                    value: `${item.carrier_code}_${item.method_code}`,
                }));
            }

            if (
                shipping
                && shipping.selected_shipping_method
                && shipping.available_shipping_methods
                && shipping.available_shipping_methods.length > 0
            ) {
                const shippingMethod = shipping.selected_shipping_method;
                const availableShipping = shipping.available_shipping_methods.filter(
                    (x) => x.available && x.carrier_code === shippingMethod.carrier_code && x.method_code === shippingMethod.method_code,
                );
                state.selected.shipping = `${shippingMethod.carrier_code}_${shippingMethod.method_code}`;
            }

            setCheckout(state);
        }
    }, [checkout.data.cart]);

    const handleOpenMessage = async ({ variant, text }) => {
        const state = { ...checkout };
        window.toastMessage({
            open: true,
            variant,
            text,
        });
        setCheckout(state);
    };

    const chasbackMessage = t('checkout:cashbackInfo').split('$');

    const onClickPaypal = () => {
        const state = { ...checkout };
        if (!state.loading.paypal) {
            state.loading.order = true;
        }
        setCheckout(state);
    };

    const onCancelPaypal = () => {
        Router.push('/checkout/cart');
    };

    const onErrorPaypal = (err) => {
        const state = { ...checkout };
        state.loading.order = false;
        setCheckout(state);
        handleOpenMessage({
            variant: 'error',
            text: t('checkout:message:serverError'),
        });
    };

    const onApprovePaypall = async (data, actions) => {
        window.backdropLoader(true);
        const { cart } = checkout.data;
        setPaymentMethod({
            variables: {
                cartId: cart.id,
                payment_method: {
                    code: checkout.selected.payment,
                    paypal_express: {
                        payer_id: data.payerID,
                        token: initialOptionPaypal['data-order-id'],
                    },
                },
            },
        }).then(async (result) => {
            let state = { ...checkout };

            if (result && result.data && result.data.setPaymentMethodOnCart && result.data.setPaymentMethodOnCart.cart) {
                const mergeCart = {
                    ...state.data.cart,
                    ...result.data.setPaymentMethodOnCart.cart,
                };
                state.data.cart = mergeCart;
                state.status.purchaseOrderApply = true;
                updateFormik(mergeCart);
            } else {
                state.selected.payment = null;
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:emptyShippingError'),
                });
            }

            setCheckout(state);

            const selectedPayment = checkout.data.paymentMethod.filter((item) => item.code === 'paypal_express');
            const dataLayer = {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
                        products: cart.items.map(({ quantity, product, prices }) => ({
                            name: product.name,
                            id: product.sku,
                            price: JSON.stringify(prices.price.value),
                            category: product.categories.length > 0 ? product.categories[0].name : '',
                            list: product.categories.length > 0 ? product.categories[0].name : '',
                            quantity: JSON.stringify(quantity),
                            dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                            dimension5: '',
                            dimension6: '',
                            dimension7: prices.discount ? 'YES' : 'NO',
                        })),
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            const dataLayerOption = {
                event: 'checkoutOption',
                ecommerce: {
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                    checkout_option: {
                        actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                    },
                },
            };
            TagManager.dataLayer({ dataLayer });
            TagManager.dataLayer({ dataLayer: dataLayerOption });

            let details = await fetch('/paypal/detail-transaction', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                }),
            });

            // set local data

            const paypalData = {
                data: {
                    ...data,
                    ...initialOptionPaypal,
                    ...tokenData,
                },
                details: {},
            };
            if (details) {
                details = await details.json();
                if (details && details.data && details.data.result) {
                    paypalData.details = details.data.result;
                }
            }
            setLocalStorage(modules.paypal.keyData, paypalData);
            state = { ...checkout };
            window.backdropLoader(false);
            state.loading.order = false;
            setCheckout(state);
            Router.push(`/${modules.paypal.returnUrl}`);
        }).catch((e) => {
            onErrorPaypal(e);
        });
    };

    const onShippingChangePaypal = (params) => {
        // const { shipping_addresses } = params;
    };

    const createOrderPaypal = (data, actions) => new Promise((resolve, reject) => {
        resolve(initialOptionPaypal['data-order-id']);
    });

    const paypalHandlingProps = {
        onClick: onClickPaypal,
        onCancel: onCancelPaypal,
        onError: onErrorPaypal,
        onApprove: onApprovePaypall,
        disabled: checkout.loading.paypal,
        onShippingChange: onShippingChangePaypal,
        createOrder: createOrderPaypal,
    };

    const contentProps = {
        formik,
        checkout,
        handleOpenMessage,
        chasbackMessage,
        updateFormik,
        setCheckout,
        manageCustomer,
        config,
        isOnlyVirtualProductOnCart,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
    };

    return (
        <Layout pageConfig={configPage || pageConfig} {...props} showRecentlyBar={false}>
            <Head>
                <script type="text/javascript" src={url} data-client-key={snap_client_key} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://js.braintreegateway.com/web/3.78.2/js/client.min.js" />
                <script src="https://js.braintreegateway.com/web/3.78.2/js/paypal-checkout.min.js" />
            </Head>
            <Content {...contentProps} {...props} modules={modules} />
            <Toast open={isError} message={t('checkout:cartError')} variant="error" setOpen={setError} />
        </Layout>
    );
};

export default Checkout;
