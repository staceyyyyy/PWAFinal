import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { useApolloClient } from '@apollo/client';
import { localTotalCart } from '@services/graphql/schema/local';
import { modules } from '@config';
import Router from 'next/router';
import React from 'react';
import TagManager from 'react-gtm-module';
import { addVirtualProductToCart, getGuestCartId as queryGetGuestCartId, getCustomerCartId } from '@core_modules/product/services/graphql';

const CoreOptionsItemVirtual = ({
    setOpen = () => {},
    t,
    data,
    View,
    handleAddToCart: CustomAddToCart,
    loading: customLoading,
    setLoading: setCustomLoading,
    checkCustomizableOptionsValue,
    errorCustomizableOptions,
    customizableOptions,
    ...other
}) => {
    const [qty, setQty] = React.useState(1);
    const client = useApolloClient();
    let cartId = '';
    let isLogin = '';

    const {
        __typename, sku, name, categories,
        price_range, stock_status, url_key,
    } = data;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    let [loading, setLoading] = React.useState(false);
    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const [addCartVirtual] = addVirtualProductToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();

    const addToCart = async () => {
        let customizable_options = [];
        const entered_options = [];
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            customizableOptions.map((op) => {
                if (customizable_options.length > 0) {
                    const findOptions = customizable_options.find((item) => item.id === op.option_id);
                    if (findOptions) {
                        customizable_options = customizable_options.filter(
                            (item) => item.id !== op.option_id,
                        );
                        if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: `${findOptions.value_string},${op.value}`,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: `${findOptions.value_string},${op.value}`,
                            });
                        }
                    } else if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                if (customizable_options.length === 0) {
                    if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                return op;
            });
        }
        if (CustomAddToCart && typeof CustomAddToCart === 'function') {
            CustomAddToCart({
                ...data,
                qty: parseFloat(qty),
                customizable_options,
                entered_options,
            });
        } else {
            setLoading(true);
            const errorMessage = {
                variant: 'error',
                text: t('product:failedAddCart'),
                open: true,
            };
            if (!cartId || cartId === '' || cartId === undefined) {
                if (!isLogin) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch((e) => {
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: e.message.split(':')[1] || errorMessage.text,
                            });
                        });
                } else if (cartUser.data && cartUser.data.customerCart) {
                    const token = cartUser.data.customerCart.id || '';
                    cartId = token;
                    setCartId(token);
                }
            }
            if (__typename === 'VirtualProduct') {
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'addToCart',
                        eventLabel: name,
                        ecommerce: {
                            currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                            add: {
                                products: [{
                                    name,
                                    id: sku,
                                    price: price_range.minimum_price.regular_price.value || 0,
                                    category: categories.length > 0 ? categories[0].name : '',
                                    list: categories.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    dimensions4: stock_status,
                                }],
                            },
                        },
                    },
                });
                addCartVirtual({
                    variables: {
                        cartId,
                        sku,
                        qty: parseFloat(qty),
                        customizable_options,
                        entered_options,
                    },
                })
                    .then((res) => {
                        client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addVirtualProductsToCart.cart.total_quantity } });
                        window.toastMessage({
                            variant: 'success',
                            text: t('product:successAddCart'),
                            open: true,
                        });
                        setLoading(false);
                        setOpen(false);
                    })
                    .catch((e) => {
                        if (e.message === "The product's required option(s) weren't entered. Make sure the options are entered and try again.") {
                            Router.push(`/${url_key}`);
                        }
                        setLoading(false);
                        window.toastMessage({
                            ...errorMessage,
                            text: e.message.split(':')[1] || errorMessage.text,
                        });
                    });
            }
        }
    };

    const handleAddToCart = async () => {
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            const check = await checkCustomizableOptionsValue();
            if (check) {
                addToCart();
            }
        } else {
            addToCart();
        }
    };

    return (
        <View
            qty={qty}
            setQty={setQty}
            handleAddToCart={handleAddToCart}
            t={t}
            loading={loading}
            disabled={stock_status === 'OUT_OF_STOCK'}
            {...other}
        />
    );
};

export default CoreOptionsItemVirtual;
