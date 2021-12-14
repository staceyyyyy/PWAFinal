/* eslint-disable no-unneeded-ternary */

import { useLazyQuery } from '@apollo/client';
import Typography from '@common_typography';
import FieldPointView from '@core_modules/checkout/components/fieldcode';
import { getProductBySku as SchemaGetProductBySku } from '@core_modules/product/services/graphql/schema';
import { useEffect, useState } from 'react';
import { breakPointsUp } from '@helper_theme';

const FeeAndPromotion = (props) => {
    // prettier-ignore
    const {
        t, dataCart, PromoModalItemView, handleAddPromoItemToCart, applyCoupon, removeCoupon,
    } = props;
    const availableFreeItems = dataCart.available_free_items && dataCart.available_free_items.length > 0 ? dataCart.available_free_items : [];
    const [value, setValue] = useState((dataCart.applied_coupons && dataCart.applied_coupons[0].code && dataCart.applied_coupons[0].code) || '');
    const [loading, setLoading] = useState(false);
    const [couponApplied, setCouponApplied] = useState(dataCart.applied_coupons && dataCart.applied_coupons[0].code ? true : false);
    const [openModal, setOpenModal] = useState(false);
    const [freeItems, setFreeItems] = useState(availableFreeItems);
    const [modalItems, setModalItems] = useState([]);
    const [availableMaxQty, setAvailableMaxQty] = useState(0);
    const [getProductBySku, dataProducts] = useLazyQuery(SchemaGetProductBySku());
    const desktop = breakPointsUp('sm');

    const handleOpenMessage = async ({ variant, text }) => {
        window.toastMessage({
            open: true,
            variant,
            text,
        });
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // add and remove code handler
    const handleAddRemovePromo = async () => {
        setLoading(true);
        if (!couponApplied) {
            const result = await applyCoupon({ variables: { cartId: dataCart.id, coupon: value } });
            const cartResult = result?.data?.applyCouponToCart?.cart;
            if (cartResult) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponApplied'),
                });
                setCouponApplied(true);
                setFreeItems(cartResult.available_free_items);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:couponError'),
                });
            }
        } else {
            await window.backdropLoader(true);
            const result = await removeCoupon({ variables: { cartId: dataCart.id } });
            await window.backdropLoader(false);
            if (result?.data?.removeCouponFromCart?.cart) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponRemoved'),
                });
                setCouponApplied(false);
                setValue('');
                setFreeItems([]);
            }
        }
        setLoading(false);
    };

    const handleAddToCart = async (params) => {
        await handleCloseModal();
        await handleAddPromoItemToCart(params, dataCart.id);
    };

    const setUpdatedProducts = () => {
        if (dataProducts.data) {
            // set freeItemsData value to existing item data
            const updatedProducts = dataProducts.data.products.items.map((p) => {
                const freeItemsData = freeItems.find((i) => i.sku === p.sku);
                if (freeItemsData) {
                    return {
                        ...p,
                        freeItemsData,
                    };
                }
                return { ...p };
            });
            setModalItems(updatedProducts);
        }
    };

    useEffect(() => {
        // set max available free item qty
        if (dataCart?.available_free_items && dataCart.available_free_items.length > 0) {
            const itemQty = dataCart.available_free_items[0].quantity;
            setAvailableMaxQty(itemQty);
            let freeItemQty = 0;
            dataCart.available_free_items.forEach((cartItem) => {
                const addedFreeItems = dataCart.items.find((i) => i.product.sku === cartItem.sku);

                if (addedFreeItems) {
                    freeItemQty += addedFreeItems.quantity;
                }
            });
            const newQty = itemQty - freeItemQty;
            setAvailableMaxQty(newQty);
        }
    }, [dataCart]);

    useEffect(() => {
        // get the free items details
        const freeItemSkus = freeItems && freeItems.length > 0 ? freeItems.map((item) => item.sku) : [];
        if (freeItemSkus.length > 0) {
            getProductBySku({ variables: { sku: freeItemSkus } });
        } else {
            setAvailableMaxQty(0);
            setModalItems([]);
        }
    }, [freeItems]);

    useEffect(() => {
        setUpdatedProducts();
    }, [dataProducts]);

    return (
        <>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <Typography variant="h3" type="bold">
                    Fee and Promotion
                </Typography>
                <FieldPointView
                    id="coupon"
                    name="coupon"
                    placeholder="Promo Code"
                    action={handleAddRemovePromo}
                    onChange={handleChange}
                    value={value}
                    disabled={loading}
                    toggleField={couponApplied}
                    loading={loading}
                />
                {couponApplied && modalItems.length > 0 && availableMaxQty > 0 && (
                    <div className={!desktop ? 'row' : ''}>
                        <PromoModalItemView
                            open={openModal}
                            handleAddToCart={handleAddToCart}
                            handleClickOpen={handleOpenModal}
                            handleClose={handleCloseModal}
                            items={modalItems}
                            availableMaxQty={availableMaxQty}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default FeeAndPromotion;
