import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect } from 'react';
import { formatPrice } from '@helper_currency';
import TagManager from 'react-gtm-module';
import _ from 'lodash';
import gqlService from '@core_modules/checkout/services/graphql';

const Loader = () => (
    <>
        <Skeleton width="100%" variant="text" animation="wave" height={10} />
        <Skeleton width="100%" variant="text" animation="wave" height={10} />
        <Skeleton width="100%" variant="text" animation="wave" height={10} />
    </>
);

const Address = (props) => {
    const {
        isOnlyVirtualProductOnCart, checkout, t, setCheckout, defaultAddress, updateFormik, AddressView, storeConfig, ...other
    } = props;

    const [setShippingAddressById] = gqlService.setShippingAddress();
    const [setShippingAddressByInput] = gqlService.setShippingAddressByInput();
    const [setBillingAddressById] = gqlService.setBillingAddressById();
    const [setBillingAddressByInput] = gqlService.setBillingAddressByInput();
    const [setDefaultAddress] = gqlService.updatedDefaultAddress();
    const [setBillingAddressVirtualProduct] = gqlService.setBillingAddressVirtualProduct();

    const { address } = checkout.selected;
    const { loading, data } = checkout;
    const street = _.isNull(address) ? null : address.street.join(' ');
    let dialogProps;

    if (data.isGuest) {
        dialogProps = address
            ? {
                region: address.region.label,
                country: {
                    id: address.country.code,
                    full_name_locale: address.country.label,
                },
                city: address.city,
                street,
                firstname: address.firstname,
                lastname: address.lastname,
                postcode: address.postcode,
                telephone: address.telephone,
            }
            : {};
    }

    let content;

    if (loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.isGuest && !address) {
        content = t('checkout:message:address:add');
    } else if (address) {
        content = `${address.firstname} ${address.lastname} ${street} 
        ${address.city} ${address.region && address.region.label} 
        ${address.country && address.country.label} ${address.postcode} ${address.telephone}`;
    } else {
        content = t('checkout:message:address:default');
    }

    const updateAddressState = (result) => {
        const state = { ...checkout };
        const updatedCart = result.data.setBillingAddressOnCart.cart;
        if (isOnlyVirtualProductOnCart) {
            state.selected.billing = updatedCart?.billing_address;
            state.selected.address = updatedCart?.billing_address;
        } else {
            const [shippingAddress] = updatedCart.shipping_addresses;
            let shippingMethods = [];
            if (shippingAddress !== undefined || shippingAddress !== null) {
                shippingMethods = shippingAddress.available_shipping_methods.map((shipping) => ({
                    ...shipping,
                    label: `${shipping.method_title} ${shipping.carrier_title}`,
                    value: {
                        name: { carrier_code: shipping.carrier_code, method_code: shipping.method_code },
                        price: formatPrice(shipping.amount.value, shipping.amount.currency),
                    },
                }));
            }

            if (shippingAddress && data.isGuest) {
                state.selected.address = shippingAddress;
            }

            if (checkout.selected.delivery === 'home' && typeof shippingAddress.is_valid_city !== 'undefined') {
                state.error.shippingAddress = !shippingAddress.is_valid_city;
            }

            state.data.shippingMethods = shippingMethods;
        }
        state.loading.addresses = false;
        const mergeCart = {
            ...state.data.cart,
            ...updatedCart,
        };
        state.data.cart = mergeCart;
        setCheckout(state);

        updateFormik(mergeCart);
    };

    const setAddress = (selectedAddress, cart, firstLoad = false) => new Promise((resolve, reject) => {
        const state = { ...checkout };
        if (checkout.data.isGuest) {
            state.loading.addresses = true;
            setCheckout(state);
        }
        const { latitude, longitude } = selectedAddress;

        if (checkout.data.isGuest) {
            if (isOnlyVirtualProductOnCart) {
                setBillingAddressVirtualProduct({
                    variables: {
                        cartId: cart.id,
                        ...selectedAddress,
                        latitude,
                        longitude,
                    },
                })
                    .then((resBilling) => {
                        updateAddressState(resBilling);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else {
                setShippingAddressByInput({
                    variables: {
                        cartId: cart.id,
                        ...selectedAddress,
                        latitude,
                        longitude,
                    },
                })
                    .then(async () => {
                        setBillingAddressByInput({
                            variables: {
                                cartId: cart.id,
                                ...selectedAddress,
                                latitude,
                                longitude,
                            },
                        })
                            .then(async (resBilling) => {
                                updateAddressState(resBilling);
                                resolve();
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }
        } else if (isOnlyVirtualProductOnCart) {
            setBillingAddressById({
                variables: {
                    cartId: cart.id,
                    addressId: selectedAddress.id,
                },
            })
                .then((resBilling) => {
                    updateAddressState(resBilling);
                    resolve();
                })
                .catch((e) => {
                    reject(e);
                });
        } else {
            const setShippingBilling = () => {
                setShippingAddressById({
                    variables: {
                        cartId: cart.id,
                        addressId: selectedAddress.id,
                    },
                })
                    .then((resBilling) => {
                        updateAddressState(resBilling);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            };
            if (firstLoad) {
                state.loading.addresses = true;
                setCheckout(state);
                setDefaultAddress({
                    variables: {
                        addressId: selectedAddress.id,
                        street: selectedAddress.street[0],
                    },
                })
                    .then((dataAddress) => {
                        if (dataAddress && dataAddress.data && dataAddress.data.updateCustomerAddress) {
                            const shipping = dataAddress.data.updateCustomerAddress;
                            checkout.selected.address = {
                                firstname: shipping.firstname,
                                lastname: shipping.lastname,
                                city: shipping.city,
                                region: {
                                    ...shipping.region,
                                    label: shipping.region.region,
                                },
                                country: shipping.country,
                                postcode: shipping.postcode,
                                telephone: shipping.telephone,
                                street: shipping.street,
                            };
                            state.loading.addresses = false;
                            state.loading.order = false;
                            setCheckout(state);
                        }
                        setShippingBilling();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else {
                setShippingBilling();
            }
        }
    });

    useEffect(() => {
        if (defaultAddress && !checkout.data.isGuest) {
            const { cart } = checkout.data;
            setAddress(defaultAddress, cart, true);
        }
    }, [defaultAddress]);

    useEffect(() => {
        if (address) {
            const option = `${address.firstname} ${address.lastname} ${street} 
            ${address.city} 
            ${address.region && address.region.label ? address.region.label : address.region || ''} 
            ${address.postcode} ${address.telephone}`;
            const dataLayer = {
                pageType: 'checkout',
                pageName: 'Checkout',
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: { step: 1, option },
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
            TagManager.dataLayer({
                dataLayer,
            });
        }
    }, [loading.addresses, loading.all]);

    return (
        <AddressView
            data={data}
            checkout={checkout}
            setAddress={setAddress}
            setCheckout={setCheckout}
            t={t}
            dialogProps={dialogProps}
            loading={loading}
            address={address}
            content={content}
            storeConfig={storeConfig}
            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
            {...other}
        />
    );
};

export default Address;
