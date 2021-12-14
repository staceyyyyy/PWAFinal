/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import TagManager from 'react-gtm-module';
import gqlService from '@core_modules/checkout/services/graphql';
import useStyles from '@core_modules/checkout/pages/default/components/style';

const DeliveryComp = (props) => {
    const {
        t, checkout, setCheckout, handleOpenMessage, storeConfig, DeliveryView, Skeleton, isOnlyVirtualProductOnCart,
    } = props;
    const [removePickupStore] = gqlService.removePickupStore();
    const styles = useStyles();
    const handleSelect = async (delivery) => {
        await window.backdropLoader(true);
        if (delivery === 'home' && Object.keys(checkout.selectStore).length > 0 && Object.keys(checkout.pickupInformation).length > 0) {
            removePickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                },
            })
                .then(async (res) => {
                    await setCheckout({
                        ...checkout,
                        pickup_location_code: null,
                        data: {
                            ...checkout.data,
                            cart: {
                                ...checkout.data.cart,
                                ...res.data.removePickupStore,
                            },
                        },
                        selected: {
                            ...checkout.selected,
                            delivery,
                            address: checkout.data.isGuest ? null : checkout.selected.address,
                        },
                        selectStore: {},
                        pickupInformation: {},
                    });
                    await window.backdropLoader(false);
                })
                .catch(() => {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                    window.backdropLoader(false);
                });
        } else if (delivery === 'pickup') {
            const selectedShipping = checkout.data.shippingMethods.filter(({ method_code }) => method_code === 'pickup');
            const dataLayer = {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: {
                            step: 2,
                            option: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                            action: 'checkout',
                        },
                        products: checkout.data.cart.items.map(({ quantity, product, prices }) => ({
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
                        actionField: {
                            step: 2,
                            option: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                            action: 'checkout_option',
                        },
                    },
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
            TagManager.dataLayer({
                dataLayer: dataLayerOption,
            });
            window.backdropLoader(false);
            await setCheckout({
                ...checkout,
                selected: {
                    ...checkout.selected,
                    delivery,
                },
            });
        } else if (delivery === 'instore') {
            // user chooses instore tab
            if (Object.keys(checkout.selectStore).length > 0 && Object.keys(checkout.pickupInformation).length > 0) {
                removePickupStore({
                    variables: {
                        cart_id: checkout.data.cart.id,
                    },
                }).then(async (res) => {
                    await setCheckout({
                        ...checkout,
                        data: {
                            ...checkout.data,
                            cart: {
                                ...checkout.data.cart,
                                ...res.data.removePickupStore,
                            },
                        },
                        selected: {
                            ...checkout.selected,
                            delivery,
                            address: checkout.data.isGuest ? null : checkout.selected.address,
                        },
                        selectStore: {},
                        pickupInformation: {},
                    });
                }).catch(() => {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                });
            }

            await setCheckout({
                ...checkout,
                selected: {
                    ...checkout.selected,
                    delivery,
                },
            });

            window.backdropLoader(false);
        } else if (delivery !== 'instore' && checkout.pickup_location_code) {
            // user had chosen instore tab,
            // entered some data, but later decided to switch to the other tabs
            await setCheckout({
                ...checkout,
                selected: {
                    ...checkout.selected,
                    address: null,
                    delivery,
                    selectStore: {},
                    pickupInformation: {},
                },
            });
            window.backdropLoader(false);
        } else {
            await setCheckout({
                ...checkout,
                pickup_location_code: null,
                selected: {
                    ...checkout.selected,
                    delivery,
                },
            });
            window.backdropLoader(false);
        }
    };
    if (checkout.loading.all) return <Skeleton styles={styles} />;
    if (isOnlyVirtualProductOnCart) return null;
    return <DeliveryView {...props} handleSelect={handleSelect} />;
};

export default DeliveryComp;
