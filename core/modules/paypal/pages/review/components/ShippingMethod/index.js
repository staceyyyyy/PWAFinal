import React from 'react';
import View from '@core_modules/paypal/pages/review/components/ShippingMethod/view';
import gqlService from '@core_modules/checkout/services/graphql';
import TagManager from 'react-gtm-module';

const ShippingMethod = (props) => {
    const {
        checkout, storeConfig, setCheckout, t,
    } = props;
    const [setShippingMethod] = gqlService.setShippingMethod({ onError: () => {} });
    const shipping = [];
    if (checkout.cart && checkout.shippingMethods && checkout.shippingMethods.length > 0) {
        const available = checkout.shippingMethods;
        const config = storeConfig.shipments_configuration ? JSON.parse(`${storeConfig.shipments_configuration}`) : {};
        const group = config ? Object.keys(config) : [];
        for (let index = 0; index < group.length; index += 1) {
            const groupData = [];
            const key = group[index];
            let cnf = config[key];
            cnf = cnf.split(',');
            // create group data if same label on config
            for (let idx = 0; idx < available.length; idx += 1) {
                const element = available[idx];
                const identifier = `${element.carrier_code}_${element.method_code}`;

                for (let idc = 0; idc < cnf.length; idc += 1) {
                    // add check if available on group shipping
                    const checkShipping = groupData.find((x) => x.method_code === element.method_code);

                    if (identifier.match(new RegExp(`^${cnf[idc]}`)) !== null && !checkShipping) {
                        groupData.push(element);
                    }
                }
            }
            if (groupData.length > 0) {
                // ad active key if on group data selected payment method
                let active = false;
                if (checkout.selectedShippingMethod) {
                    for (let idx = 0; idx < groupData.length; idx += 1) {
                        const element = groupData[idx];
                        const activeIdentifer = `${element.carrier_code}_${element.method_code}`;
                        if (activeIdentifer === checkout.selectedShippingMethod) {
                            active = true;
                        }
                    }
                }
                shipping.push({
                    group: key,
                    data: groupData,
                    active,
                });
            }
        }
        const index = checkout.shippingMethods.findIndex((x) => x.carrier_code === 'pickup');
        if (index >= 0) {
            checkout.shippingMethods.splice(index, 1);
        }
    }

    const onChange = async (e) => {
        const { value } = e.target;
        if (value && value !== '') {
            let state = { ...checkout };
            const { cart } = checkout;
            const [carrier_code, method_code] = value.split('_');

            state.selectedShippingMethod = value;
            state.loading.all = true;
            setCheckout(state);

            let updatedCart = await setShippingMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: carrier_code,
                    methodCode: method_code,
                },
            });

            state.loading.all = false;
            setCheckout(state);

            if (updatedCart && updatedCart.data) {
                updatedCart = {
                    ...checkout.cart,
                    ...updatedCart.data.setShippingMethodsOnCart.cart,
                };

                state = { ...checkout };
                state.cart = updatedCart;
                state.selectedShippingMethod = value;
                setCheckout(state);
                const selectedShipping = checkout.shippingMethods.filter((item) => item.method_code === method_code);
                const dataLayer = {
                    event: 'checkout',
                    ecommerce: {
                        checkout: {
                            actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout' },
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
                            actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout_option' },
                        },
                    },
                };
                TagManager.dataLayer({
                    dataLayer,
                });
                TagManager.dataLayer({
                    dataLayer: dataLayerOption,
                });
            } else {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
            }
        }
    };

    return (
        <View {...props} data={shipping} onChange={onChange} />
    );
};

export default ShippingMethod;
