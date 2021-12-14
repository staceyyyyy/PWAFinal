/* eslint-disable prefer-destructuring */
import React from 'react';
import { modules, storeConfigNameCookie } from '@config';
import { getAppEnv } from '@helpers/env';
import {
    setPaypalPaymentMethod, createPaypalExpressToken, setShippingAddressByInput, setBillingAddressByInput,
    setGuestEmailAddressOnCart,
} from '@core_modules/paypal/services/graphql';
import PaypalButtonView from '@plugin_paypalbutton/view';
import TagManager from 'react-gtm-module';
import { getCartId } from '@helper_cartid';
import { setLocalStorage, getLocalStorage } from '@helper_localstorage';
import helperCookies from '@helper_cookies';
import { getLoginInfo } from '@helper_auth';
import Router from 'next/router';

const PaypalButton = (props) => {
    const { t, cart } = props;
    const appEnv = getAppEnv();
    let cartId = cart ? cart.id : null;
    let isLogin = 0;

    const storeConfig = helperCookies.get(storeConfigNameCookie) || {};
    if (typeof window !== 'undefined' && !cartId) {
        cartId = getCartId();
    }

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
    }

    // config paypal
    const [initialOptionPaypal, setInitialOptionPaypal] = React.useState({
        'client-id': modules.paypal.clientId[appEnv],
        currency: modules.paypal.defaultCurrency,
        intent: modules.paypal.intent,
        'data-order-id': '',
        // debug: modules.paypal.debug,
        'disable-funding': modules.paypal.disableFunding,
        'merchant-id': modules.paypal.merchantId,
    });

    const [tokenData, setTokenData] = React.useState({});

    const [setPaymentMethod] = setPaypalPaymentMethod({ onError: () => {} });
    const [getPaypalToken, paypalToken] = createPaypalExpressToken();

    // set address

    const [setShippingAddress] = setShippingAddressByInput();
    const [setBillingAddress] = setBillingAddressByInput();

    const [setGuestEmail] = setGuestEmailAddressOnCart();

    const handleOpenMessage = async ({ variant, text }) => {
        window.toastMessage({
            open: true,
            variant,
            text,
        });
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined' && modules.paypal.enabled) {
            const initialTokenData = getLocalStorage(modules.paypal.keyToken);
            if (!initialTokenData && cartId) {
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
                        setLocalStorage(modules.paypal.keyToken, res.data.createPaypalExpressToken);
                        setTokenData(res.data.createPaypalExpressToken);
                        setInitialOptionPaypal({
                            ...initialOptionPaypal,
                            'data-order-id': token,
                        });
                    }
                });
            } else {
                setTokenData(initialTokenData);
                setInitialOptionPaypal({
                    ...initialOptionPaypal,
                    'data-order-id': initialTokenData.token,
                });
            }
        }
    }, []);

    const onClickPaypal = () => {

    };

    const onCancelPaypal = () => {
        window.backdropLoader(false);
        Router.push('/checkout/cart');
    };

    const onErrorPaypal = () => {
        window.backdropLoader(false);
        handleOpenMessage({
            variant: 'error',
            text: t('common:error:fetchError'),
        });
    };

    const onApprovePaypall = async (data) => {
        window.backdropLoader(true);
        let details = await fetch('/paypal/detail-transaction', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        });
        if (details) {
            details = await details.json();
        }

        let address = null;
        let email;
        if (details && details.data && details.data.result && details.data.result.purchase_units
            && details.data.result.purchase_units.length > 0 && details.data.result.purchase_units[0].shipping
            && details.data.result.purchase_units[0].shipping.address) {
            let firstname = '';
            let lastname = '';
            if (details.data.result.purchase_units[0].shipping.name && details.data.result.purchase_units[0].shipping.name.full_name) {
                firstname = details.data.result.purchase_units[0].shipping.name.full_name.split(/ (.+)/)[0];
                lastname = details.data.result.purchase_units[0].shipping.name.full_name.split(/ (.+)/)[1];
            }
            address = {
                ...details.data.result.purchase_units[0].shipping.address,
                firstname,
                lastname,
            };
        }

        if (details && details.data && details.data.result && details && details.data && details.data.result.payer
            && details && details.data && details.data.result.payer.email_address) {
            email = details.data.result.payer.email_address;
        }

        if (!isLogin && email) {
            await setGuestEmail({
                variables: {
                    cartId: cart.id,
                    email,
                },
            })
                .catch((e) => {
                    onErrorPaypal(e);
                });
        }

        if (address) {
            const variableAddress = {
                cartId: cart.id,
                city: address.admin_area_2,
                countryCode: address.country_code,
                firstname: address.firstname,
                lastname: address.lastname,
                telephone: '12345678',
                postcode: address.postal_code,
                street: address.address_line_1,
                region: address.admin_area_1,
            };

            await setShippingAddress({
                variables: variableAddress,
            })
                .then(async () => {
                    setBillingAddress({
                        variables: variableAddress,
                    })
                        .catch((e) => {
                            onErrorPaypal(e);
                        });
                })
                .catch((e) => {
                    onErrorPaypal(e);
                });
        }

        setPaymentMethod({
            variables: {
                cartId,
                payerId: data.payerID,
                token: initialOptionPaypal['data-order-id'],
            },
        }).then(async (result) => {
            if (result && result.data && result.data.setPaymentMethodOnCart && result.data.setPaymentMethodOnCart.cart) {
                const selectedPayment = result.data.setPaymentMethodOnCart.cart.selected_payment_method;
                const dataLayer = {
                    event: 'checkout',
                    ecommerce: {
                        checkout: {
                            actionField: { step: 3, option: selectedPayment.title, action: 'checkout' },
                            products: cart && cart.items && cart.items.map(({ quantity, product, prices }) => ({
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
                            actionField: { step: 3, option: selectedPayment.title, action: 'checkout_option' },
                        },
                    },
                };
                TagManager.dataLayer({ dataLayer });
                TagManager.dataLayer({ dataLayer: dataLayerOption });
            } else {
                onErrorPaypal('error');
            }

            // set local data

            const paypalData = {
                data: {
                    ...data,
                    ...initialOptionPaypal,
                    ...tokenData,
                },
                details: {},
            };
            if (details && details.data && details.data.result) {
                paypalData.details = details.data.result;
            }
            setLocalStorage(modules.paypal.keyData, paypalData);
            window.backdropLoader(false);
            Router.push(`/${modules.paypal.returnUrl}`);
        }).catch((e) => {
            // console.log(e);
            onErrorPaypal(e);
        });
    };

    const onShippingChangePaypal = () => {
        // const { shipping_addresses } = params;
    };

    const createOrderPaypal = () => new Promise((resolve) => {
        resolve(initialOptionPaypal['data-order-id']);
    });

    const paypalHandlingProps = {
        onClick: onClickPaypal,
        onCancel: onCancelPaypal,
        onError: onErrorPaypal,
        onApprove: onApprovePaypall,
        disabled: paypalToken.loading,
        onShippingChange: onShippingChangePaypal,
        createOrder: createOrderPaypal,
    };
    if (modules.paypal.enabled) {
        return (
            <PaypalButtonView
                {...props}
                paypalToken={paypalToken}
                initialOptionPaypal={initialOptionPaypal}
                paypalHandlingProps={paypalHandlingProps}
            />
        );
    }

    return null;
};

export default PaypalButton;
