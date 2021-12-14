import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';

const GiftCard = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        GiftCardView,
    } = props;
    const [applyGiftCardToCart] = gqlService.applyGiftCardToCart({ onError: () => { } });
    const [removeGiftCardFromCart] = gqlService.removeGiftCardFromCart({ onError: () => { } });
    let giftCards = [];
    let appliedGiftCards = [];
    if (checkout.data.cart) {
        if (modules.giftcard.useCommerceModule) {
            if (checkout.data.cart.applied_gift_cards && checkout.data.cart.applied_gift_cards.length > 0) {
                appliedGiftCards = checkout.data.cart.applied_gift_cards.map((item) => item.code);
            }
        } else if (checkout.data.cart.applied_giftcard
            && checkout.data.cart.applied_giftcard.giftcard_detail && checkout.data.cart.applied_giftcard.giftcard_detail.length > 0) {
            appliedGiftCards = checkout.data.cart.applied_giftcard.giftcard_detail.map((item) => item.giftcard_code);
        }
        if (!modules.giftcard.useCommerceModule) {
            if (checkout.data.customer) {
                giftCards = checkout.data.customer.gift_card.filter((item) => !appliedGiftCards.includes(item.giftcard_code));
            }
        }
    }

    const handleApplyGift = async (code = null) => {
        let state = {
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
        state.loading.giftCard = true;
        setCheckout(state);

        const cartId = state.data.cart.id;
        const finalCode = code || formik.values.giftCard;

        const result = await applyGiftCardToCart({
            variables: {
                cartId,
                code: finalCode,
            },
        });

        state = { ...checkout };
        if (result && result.data) {
            const updatedCart = {
                ...state.data.cart,
                ...result.data.applyGiftCardToCart.cart,
            };
            state.data.cart = updatedCart;
            formik.setFieldValue('giftCard', '');
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardApplied'),
            });
        } else {
            formik.setFieldError('giftCard', t('checkout:message:giftCardError'));
        }

        state.loading.giftCard = false;
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

    const handleRemoveGift = async (code) => {
        let state = {
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
        state.loading.giftCard = true;
        setCheckout(state);

        const cartId = state.data.cart.id;
        const result = await removeGiftCardFromCart({
            variables: {
                cartId,
                code,
            },
        });

        state = { ...checkout };
        if (result && result.data) {
            const updatedCart = {
                ...state.data.cart,
                ...result.data.removeGiftCardFromCart.cart,
            };
            state.data.cart = updatedCart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardRemoved'),
            });
        }

        state.loading.giftCard = false;
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

    if (modules.giftcard.enabled) {
        return (
            <GiftCardView
                handleRemoveGift={handleRemoveGift}
                handleApplyGift={handleApplyGift}
                giftCards={giftCards}
                formik={formik}
                appliedGiftCards={appliedGiftCards}
                checkout={checkout}
            />
        );
    }

    return null;
};

export default GiftCard;
