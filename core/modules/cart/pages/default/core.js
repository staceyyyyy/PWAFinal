/* eslint-disable radix */
/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { localTotalCart } from '@services/graphql/schema/local';
import {
    addWishlist as mutationWishlist, reOrder as mutationReOrder,
    getCartDataLazy, getCartItemLazy, deleteCartItem, updateCartitem, addProductToCartPromo, applyCouponToCart, removeCouponFromCart,
} from '@core_modules/cart/services/graphql';

const Cart = (props) => {
    const {
        t, token, isLogin, EmptyView, SkeletonView, pageConfig, Content, storeConfig, ...other
    } = props;

    const router = useRouter();
    const { paymentFailed, orderId, cart_id: failedCartId } = router.query;
    const dataCart = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
        items: [],
    };
    const [cart, setCart] = React.useState(dataCart);
    const [errorCart, setErrorCart] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [loadingCart, setLoadingCart] = useState(true);
    const config = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'cart',
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem, deleteData] = deleteCartItem();
    const [actUpdateItem, update] = updateCartitem();

    // reorder
    const [reOrder, responseReorder] = mutationReOrder();

    // getCartDataLazzy
    const [getCart, responseCart] = getCartDataLazy();

    const [getCartItem, responseCartItem] = getCartItemLazy();

    // updatePromoItems
    const [mutationAddToCart, promoItems] = addProductToCartPromo();

    // apply and remove coupon
    const [applyCoupon, appliedCouponResult] = applyCouponToCart({ onError: () => {} });
    const [removeCoupon, removedCouponResult] = removeCouponFromCart({ onError: () => {} });

    React.useEffect(() => {
        if (paymentFailed && orderId) {
            if (failedCartId) {
                if (typeof window !== 'undefined') {
                    setCartId(failedCartId);
                    setTimeout(() => {
                        router.push('/checkout/cart');
                    }, 1000);
                }
            } else {
                reOrder({
                    variables: {
                        order_id: orderId,
                    },
                });
            }
        } else {
            const cartId = getCartId();
            if (cartId) {
                if (getCart && !responseCart.called && getCartItem && !responseCartItem.called) {
                    getCart({
                        variables: {
                            cartId,
                        },
                    });
                    getCartItem({
                        variables: {
                            cartId,
                        },
                    });
                }
            } else {
                setLoadingCart(false);
            }
        }
    }, []);

    React.useEffect(() => {
        if (responseReorder && responseReorder.data && responseReorder.data.reorder && responseReorder.data.reorder.cart_id) {
            const { cart_id } = responseReorder.data.reorder;
            if (typeof window !== 'undefined') {
                if (cart_id) {
                    setCartId(cart_id);
                    if (paymentFailed && orderId) {
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    if (getCart && !responseCart.called && getCartItem && !responseCartItem.called) {
                        getCart({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                        getCartItem({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                    }
                }
            }
        }
    }, [responseReorder]);

    React.useEffect(() => {
        if (responseCart.loading || responseCartItem.loading) setLoadingCart(true);
        if (responseCart && responseCart.data && responseCart.data.cart
            && responseCartItem && responseCartItem.data && responseCartItem.data.cart) {
            const itemsCart = responseCartItem.data.cart.items.filter((item) => item !== null);
            const carts = {
                ...responseCart.data.cart,
                items: itemsCart,
            };
            setCart(carts);
            if (responseCart.client && responseCart.data.cart.total_quantity && responseCart.data.cart.total_quantity > 0) {
                responseCart.client.writeQuery({
                    query: localTotalCart,
                    data: { totalCart: responseCart.data.cart.total_quantity },
                });
            }
            setLoadingCart(false);
        }

        if (responseCart.error) {
            const errorList = [];
            if (responseCart.error && responseCart.error.graphQLErrors
                && responseCart.error.graphQLErrors.length > 0) {
                for (let idx = 0; idx < responseCart.error.graphQLErrors.length; idx += 1) {
                    const { message } = responseCart.error.graphQLErrors[idx];
                    const regexp = new RegExp(/stock/i);
                    if (message && regexp.test(message)) {
                        errorList.push(message);
                    }
                }
            }
            setErrorCart(errorList);
            setLoadingCart(false);
        }
    }, [responseCart, responseCartItem]);

    // React.useMemo(() => {
    //     if (!loadingCart && tmpData && tmpData.id) {
    //         setCart({ ...tmpData });
    //     }
    // }, [loadingCart]);

    // delete items
    const deleteItem = (itemProps) => {
        const dataLayer = {
            event: 'removeFromCart',
            eventLabel: itemProps.product.name,
            label: itemProps.product.name,
            ecommerce: {
                currencyCode: itemProps.prices.price.currency || storeConfig.base_currency_code,
                remove: {
                    cartItem: itemProps.id,
                    quantity: itemProps.quantity,
                    product: {
                        name: itemProps.product.name,
                        id: itemProps.product.sku,
                        price: itemProps.prices.price.value || 0,
                        dimensions4: itemProps.product.stock_status || '',
                    },
                },
            },
        };

        TagManager.dataLayer({ dataLayer });
        window.backdropLoader(true);

        const cartId = getCartId();
        setLoadingCart(true);
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id),
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                setLoadingCart(false);
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:deleteSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                setLoadingCart(false);
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    // update items
    const updateItem = (itemData) => {
        window.backdropLoader(true);

        const cartId = getCartId();
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemData.cart_item_id),
                quantity: itemData.quantity,
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:updateFailed'),
                    variant: 'error',
                });
            });
    };

    // add free items handler
    const handleAddPromoItemToCart = async (params, cartId) => {
        let data = params;
        if (params.childProduct && params.parentProduct) {
            data = {
                ...params.childProduct,
                freeItemsData: params.parentProduct.freeItemsData,
            };
        }
        await window.backdropLoader(true);
        await mutationAddToCart({
            variables: {
                cart_id: cartId,
                cart_items: [
                    {
                        quantity: data.qty || 1,
                        sku: data.sku,
                        customizable_options: data.customizable_options,
                        promo_item_data: {
                            ruleId: data.freeItemsData.promo_item_data.ruleId,
                            minimalPrice: data.freeItemsData.promo_item_data.minimalPrice,
                            discountItem: data.freeItemsData.promo_item_data.discountItem,
                            isDeleted: data.freeItemsData.promo_item_data.isDeleted,
                            qtyToProcess: data.freeItemsData.promo_item_data.qtyToProcess,
                        },
                    },
                ],
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoSuccess'),
                    variant: 'success',
                });
            })
            .catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoFailed'),
                    variant: 'error',
                });
            });
    };

    React.useMemo(() => {
        if (!update.loading && update.data && update.data.updateCartItems) {
            setCart({ ...update.data.updateCartItems.cart });
        }
    }, [update.loading]);

    React.useMemo(() => {
        if (!deleteData.loading && deleteData.data && deleteData.data.removeItemFromCart) {
            setCart({ ...deleteData.data.removeItemFromCart.cart });
        }
    }, [deleteData.loading]);

    // update cart with free items data
    useEffect(() => {
        if (!promoItems.loading && promoItems.data?.addProductsToCartPromo) {
            setCart({ ...promoItems.data.addProductsToCartPromo.cart });
        }
    }, [promoItems.loading]);

    // update cart after applying coupon code
    useEffect(() => {
        if (!appliedCouponResult.loading && appliedCouponResult.data?.applyCouponToCart) {
            setCart({ ...appliedCouponResult.data.applyCouponToCart.cart });
        }
    }, [appliedCouponResult.loading]);

    // update cart after removing coupon code
    useEffect(() => {
        if (!removedCouponResult.loading && removedCouponResult.data?.removeCouponFromCart) {
            setCart({ ...removedCouponResult.data.removeCouponFromCart.cart });
        }
    }, [removedCouponResult.loading]);

    React.useMemo(() => {
        if (cart.items.length > 0) {
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    currency: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [cart.items.length]);
    // add to wishlist
    const [addWishlist] = mutationWishlist();
    const handleFeed = (itemProps) => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: itemProps.product.name,
                    label: itemProps.product.name,
                    ecommerce: {
                        currencyCode: itemProps.prices.price.currency,
                        add: {
                            products: [
                                {
                                    name: itemProps.product.name,
                                    id: itemProps.product.sku,
                                    price: itemProps.prices.price.value || 0,
                                    category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    list: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    dimensions4: itemProps.product.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            window.backdropLoader(true);
            addWishlist({
                variables: {
                    productId: parseInt(itemProps.product.id),
                },
            })
                .then(async () => {
                    deleteItem(itemProps);
                    await window.toastMessage({ open: true, variant: 'success', text: t('cart:addWishlistSuccess') });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('cart:addWishlistFailed'),
                    });
                    window.backdropLoader(false);
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('cart:addWishlistWithoutLogin'),
            });
        }
    };

    if (loadingCart) {
        return (
            <Layout pageConfig={config || pageConfig} {...props}>
                <SkeletonView />
            </Layout>
        );
    }

    const globalCurrency = storeConfig.default_display_currency_code;

    if (!loadingCart && cart.items.length < 1) {
        return (
            <Layout pageConfig={config || pageConfig} {...props}>
                <EmptyView t={t} />
            </Layout>
        );
    }

    const contentProps = {
        dataCart: cart,
        t,
        handleFeed,
        toggleEditMode,
        editMode,
        deleteItem,
        toggleEditDrawer,
        // crosssell,
        editItem,
        openEditDrawer,
        updateItem,
        storeConfig,
        globalCurrency,
        errorCart,
        handleAddPromoItemToCart,
        applyCoupon,
        removeCoupon,
    };
    return (
        <Layout pageConfig={config || pageConfig} {...props} showRecentlyBar={false}>
            <Content {...other} {...contentProps} />
        </Layout>
    );
};

export default Cart;
