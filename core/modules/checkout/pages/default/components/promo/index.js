import gqlService from '@core_modules/checkout/services/graphql';

const DiscountSection = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        PromoView,
    } = props;
    const [applyCouponTocart] = gqlService.applyCouponToCart({ onError: () => { } });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart({ onError: () => { } });

    const handlePromo = async () => {
        let cart;
        const state = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: true,
                extraFee: false,
                order: true,
            },
        };
        state.loading.coupon = true;
        setCheckout(state);
        const isApplied = !state.data.isCouponAppliedToCart;

        let cartId = '';
        if (checkout && checkout.data && checkout.data.cart && checkout.data.cart.id) {
            cartId = checkout.data.cart.id;
        }

        if (isApplied) {
            const result = await applyCouponTocart({ variables: { cartId, coupon: formik.values.coupon } });
            if (result && result.data && result.data.applyCouponToCart && result.data.applyCouponToCart.cart) {
                cart = {
                    ...state.data.cart,
                    ...result.data.applyCouponToCart.cart,
                };
            }
            if (cart) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponApplied'),
                });
            }
        } else {
            const result = await removeCouponFromCart({ variables: { cartId } });
            if (result && result.data && result.data.removeCouponFromCart && result.data.removeCouponFromCart.cart) {
                cart = result && {
                    ...state.data.cart,
                    ...result.data.removeCouponFromCart.cart,
                };
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponRemoved'),
                });
            }
        }

        state.loading.coupon = false;

        if (cart) {
            state.data.cart = cart;
            state.data.isCouponAppliedToCart = !state.data.isCouponAppliedToCart;
        } else {
            await formik.setFieldError('coupon', t('checkout:message:couponError'));
        }

        const finalState = {
            ...state,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
            },
        };
        setCheckout(finalState);
    };

    return (
        <PromoView
            id="coupon"
            name="coupon"
            placeholder="Promo Code"
            action={handlePromo}
            onChange={formik.handleChange}
            value={formik.values.coupon}
            disabled={checkout.loading.coupon || !checkout.data.cart}
            toggleField={checkout.data.isCouponAppliedToCart}
            loading={checkout.loading.coupon}
            error={!!formik.errors.coupon}
            errorMessage={formik.errors.coupon}
        />
    );
};

export default DiscountSection;
