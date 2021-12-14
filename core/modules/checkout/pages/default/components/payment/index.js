/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from 'react';
import TagManager from 'react-gtm-module';
import gqlService from '@core_modules/checkout/services/graphql';
import { modules } from '@config';

export default function CustomizedExpansionPanels({
    checkout, setCheckout, updateFormik, handleOpenMessage, t, storeConfig, PaymentView,
    paypalHandlingProps, setInitialOptionPaypal, initialOptionPaypal, setTokenData,
}) {
    /**
     * [HOOKS]
     * [VARIABLES]
     */
    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    const [getPaypalToken, paypalTokenData] = gqlService.createPaypalExpressToken();

    /**
     * [METHOD] handle when get result from set payment method
     * @param {state, result, val, cart} params
     */
    const onHandleResult = ({
        state, result, val, cart,
    }) => {
        state = {
            ...checkout,
            selected: {
                ...checkout.selected,
                paymentOrderNumber: null,
            },
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
                purchaseOrderNumber: false,
            },
        };

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

        const selectedPayment = data.paymentMethod.filter((item) => item.code === val);
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
    };

    /**
     * [METHOD] for set checkout state when selected payment method
     * @param {string: selected_payment_method} val
     */
    const handlePayment = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            let state = {
                ...checkout,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: false,
                    payment: false,
                    extraFee: true,
                    order: true,
                },
            };
            state.selected.payment = val;
            state.status.purchaseOrderApply = false;
            setCheckout(state);

            if (val === 'purchaseorder' && checkout.selected) {
                state = {
                    ...checkout,
                    selected: {
                        ...checkout.selected,
                        payment: val,
                        purchaseOrderNumber: null,
                    },
                    loading: {
                        ...checkout.loading,
                        all: false,
                        order: false,
                    },
                };
                setCheckout(state);
            } else if (val === 'paypal_express') {
                state = {
                    ...checkout,
                    selected: {
                        ...checkout.selected,
                        payment: val,
                        purchaseOrderNumber: null,
                    },
                    loading: {
                        ...checkout.loading,
                        all: false,
                        order: false,
                    },
                };
                setCheckout(state);
                if (modules.paypal.enabled && initialOptionPaypal['data-order-id'] === '' && checkout.selected.payment === 'paypal_express') {
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
            } else {
                const payment_method = { code: val };
                const result = await setPaymentMethod({ variables: { cartId: cart.id, payment_method } });
                onHandleResult({
                    state,
                    result,
                    val,
                    cart,
                });
            }
        }
    };

    /**
     * [METHOD] for handling purchase order text input on change, and set checkout state
     * @param {object} event
     */
    const handlePurchaseOrder = (e) => {
        const state = {
            ...checkout,
            selected: {
                ...checkout.selected,
                purchaseOrderNumber: e.target.value,
            },
        };
        setCheckout(state);
    };

    /**
     * [METHOD] for handling purchase order submit button
     */
    const handlePurchaseOrderSubmit = async () => {
        const { cart } = checkout.data;
        const state = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
                purchaseOrderNumber: true,
            },
        };
        setCheckout(state);

        const selected_payment = state.selected.payment;
        const purchase_order_number = state.selected.purchaseOrderNumber;
        const payment_method = { code: selected_payment, purchase_order_number };
        const result = await setPaymentMethod({ variables: { cartId: cart.id, payment_method } });
        onHandleResult({
            state, result, val: selected_payment, cart,
        });

        handleOpenMessage({
            variant: 'success',
            text: t('checkout:message:purchaseOrderApplied'),
        });
    };

    /**
     * [MAIN] view
     */
    return (
        <PaymentView
            t={t}
            data={data}
            loading={loading}
            selected={selected}
            checkout={checkout}
            storeConfig={storeConfig}
            handlePayment={handlePayment}
            handlePurchaseOrder={handlePurchaseOrder}
            handlePurchaseOrderSubmit={handlePurchaseOrderSubmit}
            paypalTokenData={paypalTokenData}
            paypalHandlingProps={paypalHandlingProps}
            initialOptionPaypal={initialOptionPaypal}
        />
    );
}
