/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import { getProductBySku as SchemaGetProductBySku } from '@core_modules/product/services/graphql/schema';
import { useLazyQuery } from '@apollo/client';
import { addProductToCartPromo } from '@core_modules/checkout/services/graphql';

const PromoModalItem = (props) => {
    const {
        t, checkout, setCheckout, PromoModalItemView,
    } = props;
    const [open, setOpen] = React.useState(false);
    const [itemsData, setItemsData] = React.useState([]);
    const [dataArray, setDataArray] = React.useState([]);
    const [availableMaxQty, setAvailableMaxQty] = React.useState(0);

    const [mutationAddToCart] = addProductToCartPromo();

    const [getProductBySku, dataProducts] = useLazyQuery(SchemaGetProductBySku());

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToCart = async (params) => {
        let data = params;
        const checkIfExistInCart = checkout.data.cart.items
            .filter((item) => item.product.sku === params.sku) || [];
        const checkFreeItemQtyInCart = checkIfExistInCart.length > 1
            ? checkIfExistInCart.reduce((prev, curr) => prev + curr.quantity, 0)
            : checkIfExistInCart.length > 0
                ? checkIfExistInCart[0].quantity
                : 0;
        const checkIfItemAtMaxQty = checkout.data.cart.available_free_items
            .find((item) => item.sku === params.sku && item.quantity === checkFreeItemQtyInCart);

        if (checkIfExistInCart && checkIfItemAtMaxQty) {
            window.toastMessage({
                open: true,
                text: t('checkout:message:freeItemFull'),
                variant: 'error',
            });
        } else {
            if (params.childProduct && params.parentProduct) {
                data = {
                    ...params.childProduct,
                    freeItemsData: params.parentProduct.freeItemsData,
                };
            }
            let state = {
                ...checkout,
            };
            state.loading.payment = true;
            state.loading.order = true;
            await setCheckout(state);
            await window.backdropLoader(true);
            await handleClose();
            await mutationAddToCart({
                variables: {
                    cart_id: checkout.data.cart.id,
                    cart_items: [{
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
                    }],
                },
            }).then(async (res) => {
                state = {
                    ...checkout,
                };
                if (res && res.data && res.data.addProductsToCartPromo && res.data.addProductsToCartPromo.cart) {
                    state.data.cart = {
                        ...state.data.cart,
                        ...res.data.addProductsToCartPromo.cart,
                    };
                }
                await setCheckout(state);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoSuccess'),
                    variant: 'success',
                });
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoFailed'),
                    variant: 'error',
                });
            });
            state = { ...checkout };
            state.loading.payment = false;
            state.loading.order = false;
            await setCheckout(state);
        }
    };

    React.useMemo(() => {
        if (checkout && checkout.data) {
            if (checkout.data.cart) {
                if (checkout.data.cart.available_free_items) {
                    if (checkout.data.cart.available_free_items.length > 0) {
                        const newDataArray = [];
                        let newMaxQty = 0;
                        for (const [key, value] of Object.entries(checkout.data.cart.available_free_items)) {
                            newDataArray.push(value.sku);
                            if (!value.promo_item_data.isAuto) {
                                newMaxQty += value.quantity;
                            }
                        }
                        setAvailableMaxQty(newMaxQty);
                        setDataArray(newDataArray);
                    } else {
                        setDataArray([]);
                    }
                } else {
                    setDataArray([]);
                }
            }
        }
    }, [checkout.data.cart]);

    React.useEffect(() => {
        if (dataArray && dataArray.length > 0) {
            getProductBySku({ variables: { sku: dataArray } });
        } else {
            setAvailableMaxQty(0);
            setItemsData([]);
        }
    }, [dataArray]);

    React.useEffect(() => {
        if (checkout.data && checkout.data.cart && checkout.data.cart.items && checkout.data.cart.items.length > 0
            && !dataProducts.loading && dataProducts.data && dataProducts.data.products && dataProducts.data.products.items
            && dataProducts.data.products.items.length > 0
        ) {
            const items = [];
            let qtyFreeItem = 0;
            for (let idx = 0; idx < dataProducts.data.products.items.length; idx += 1) {
                const item = dataProducts.data.products.items[idx];
                const product = checkout.data.cart.items.filter((pd) => pd.product.sku === item.sku);
                const freeItemsData = checkout.data.cart.available_free_items.filter((val) => val.sku === item.sku);
                if (product && product.length > 0) {
                    if (product.length === 1 && product[0].quantity) {
                        qtyFreeItem += product[0].quantity;
                    }
                    if (product.length > 1) {
                        qtyFreeItem += product.reduce((prev, curr) => prev + curr.quantity, 0);
                    }
                }
                if (dataArray.find((dt) => dt === item.sku)) {
                    items.push({
                        freeItemsData: freeItemsData[0],
                        ...item,
                    });
                }
            }

            setAvailableMaxQty(availableMaxQty - qtyFreeItem);
            setItemsData(items);
        }
    }, [dataProducts]);

    if (itemsData && itemsData.length > 0) {
        return (
            <PromoModalItemView
                {...props}
                items={itemsData}
                handleAddToCart={handleAddToCart}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                availableMaxQty={availableMaxQty}
                customQty
            />
        );
    }

    return null;
};

export default PromoModalItem;
