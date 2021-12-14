import { formatPrice } from '@helper_currency';
import config from '@config';
import propTypes from 'prop-types';

const CoreSummary = (props) => {
    const {
        DesktopView, MobileView, isDesktop, dataCart, globalCurrency = 'IDR',
        ...other
    } = props;
    const { t } = other;
    const { modules } = config;
    let dataSummary = [];
    let total = 0;
    const {
        prices = {},
        items = [],
        applied_store_credit = {},
        applied_reward_points = {},
        shipping_addresses = [],
        applied_extra_fee = {},
    } = dataCart;

    let {
        applied_giftcard = {},
    } = dataCart;

    if (modules.giftcard.useCommerceModule) {
        applied_giftcard = dataCart.applied_gift_cards;
    }

    if (dataCart && items) {
        let subtotal;
        if (prices && prices.applied_taxes && prices.applied_taxes.length) {
            subtotal = formatPrice(prices.subtotal_excluding_tax.value, prices.subtotal_excluding_tax.currency || globalCurrency);
        } else {
            subtotal = formatPrice(prices.subtotal_including_tax.value, prices.subtotal_including_tax.currency || globalCurrency);
        }
        total = prices.grand_total;
        const [shipping] = shipping_addresses;

        dataSummary.push({ item: 'Sub Total', value: subtotal });

        if (prices && prices.applied_taxes && prices.applied_taxes.length) {
            const taxes = prices.applied_taxes.reduce(
                (prev, curr) => ({
                    value: prev.value + curr.amount.value,
                    currency: curr.amount.currency,
                }),
                { value: 0 },
            );
            const price = formatPrice(taxes.value, taxes.currency);
            dataSummary.push({ item: t('common:summary:tax'), value: price });
        }

        if (modules.checkout.extraFee.enabled && applied_extra_fee && applied_extra_fee.extrafee_value) {
            dataSummary.push({
                item: applied_extra_fee.title || '',
                value: formatPrice(applied_extra_fee.extrafee_value.value || 0, globalCurrency),
            });
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            const price = formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency);
            dataSummary.push({ item: 'shipping', value: price });
        }
        if (prices && prices.discounts && prices.discounts.length) {
            const discounts = prices.discounts.map((disc) => {
                const price = formatPrice(disc.amount.value, disc.amount.currency);
                return { item: `${disc.label}`, value: `-${price}` };
            });
            dataSummary = dataSummary.concat(discounts);
        }

        if (modules.storecredit.enabled) {
            let price = '';
            if (modules.storecredit.useCommerceModule && applied_store_credit.applied_balance && applied_store_credit.applied_balance.value > 0) {
                price = formatPrice(Math.abs(applied_store_credit.applied_balance.value), globalCurrency);
            } else if (applied_store_credit.is_use_store_credit) {
                price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency);
            }
            if (price !== '') dataSummary.push({ item: ' ', value: `-${price}` });
        }

        if (modules.rewardpoint.enabled && applied_reward_points.is_use_reward_points) {
            const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency);
            dataSummary.push({ item: `${t('common:summary:rewardPoint')} `, value: `-${price}` });
        }

        if (modules.giftcard.enabled && applied_giftcard) {
            let giftCards = [];
            if (modules.giftcard.useCommerceModule) {
                if (applied_giftcard && applied_giftcard.length > 0) {
                    giftCards = applied_giftcard.map((item) => {
                        const price = formatPrice(Math.abs(item.applied_balance.value), globalCurrency);
                        return { item: `${t('common:summary:giftCard')} (${item.code}) - ${price}`, value: `-${price}` };
                    });
                }
            } else {
                giftCards = applied_giftcard.giftcard_detail.map((item) => {
                    const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency);
                    return { item: `${t('common:summary:giftCard')} (${item.giftcard_code}) - ${price}`, value: `-${price}` };
                });
            }
            dataSummary = dataSummary.concat(giftCards);
        }

        // if (modules.promo.enabled && applied_coupons && applied_coupons.length > 0) {
        //     dataSummary.push({
        //         item: `Promo (${applied_coupons[0].code})`,
        //         value: '',
        //     });
        // }
    }

    if (isDesktop) {
        return (
            <DesktopView
                items={items}
                summary={{ total, data: dataSummary }}
                isDesktop={isDesktop}
                {...other}
                dataCart={dataCart}
            />
        );
    }

    return (
        <MobileView
            items={items}
            summary={{ total, data: dataSummary }}
            {...other}
            t={t}
            dataCart={dataCart}
        />
    );
};

CoreSummary.propTypes = {
    deleteCart: propTypes.func,
    updateCart: propTypes.func,
    withAction: propTypes.bool,
};

CoreSummary.defaultProps = {
    deleteCart: () => {},
    updateCart: () => {},
    withAction: false,
};

export default CoreSummary;
