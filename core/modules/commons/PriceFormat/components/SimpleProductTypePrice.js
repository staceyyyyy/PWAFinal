/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import useStyles from '@common_priceformat/style';

const getLowestTierPrice = (tier_price) => {
    let lowestTierPrice;
    let min = Number.POSITIVE_INFINITY;
    tier_price.forEach((price) => {
        if (price.final_price.value < min) {
            min = price.final_price.value;
            lowestTierPrice = price;
        }
    });

    return lowestTierPrice;
};

const AsLowAsText = () => {
    const styles = useStyles();
    return (
        <Typography
            variant="span"
            size="8"
            letter="uppercase"
            className={classNames(styles.noMargin, 'price_text')}
        >
            as low as:
            {' '}
        </Typography>
    );
};

const SimpleProductTypePrice = ({
    priceRange, priceTiers, specialFromDate, specialToDate, additionalPrice = 0,
}) => {
    const styles = useStyles();
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;
    const otherPrice = additionalPrice || 0;
    let validSpecial = true;
    const nowTime = new Date(Date.now()).getTime();
    if (specialFromDate && specialFromDate !== null) {
        const startTime = new Date(specialFromDate).getTime();
        if (nowTime < startTime) validSpecial = false;
    }
    if (specialToDate && specialToDate !== null) {
        const endTime = new Date(specialToDate).getTime();
        if (nowTime > endTime) validSpecial = false;
    }
    // if has tierprice
    if (priceTiers && priceTiers.length) {
        const lowestPriceTier = getLowestTierPrice(priceTiers);
        // if there are several tierprices
        if (priceTiers.length > 1) {
            // case 1: if has no discount
            if (regularPrice.value === finalPrice.value) {
                return (
                    <>
                        {/* case 1 */}
                        <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                        </Typography>
                        <AsLowAsText />
                        <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            {formatPrice(lowestPriceTier.final_price.value + otherPrice, lowestPriceTier.final_price.currency)}
                        </Typography>
                    </>
                );
            }
            // case 2: if final price is lowest than lowest tier price
            if (finalPrice.value < lowestPriceTier.final_price.value) {
                return (
                    <>
                        {/* case 2 */}
                        <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                        </Typography>
                        <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                        </Typography>
                    </>
                );
            }
            // case 3: if final price is higher than lowest tier price
            return (
                <>
                    {/* case 3 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                    </Typography>
                    <AsLowAsText />
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(lowestPriceTier.final_price.value + otherPrice, lowestPriceTier.final_price.currency)}
                    </Typography>
                </>
            );
        }

        // else:
        // if there is only one tierprice
        const firstTierPrice = priceTiers[0];
        // case 4: if there is no discount and has tier price
        if (regularPrice.value === finalPrice.value) {
            return (
                <>
                    {/* case 4 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency)}
                    </Typography>
                </>
            );
        }
        // case 5: if final price is lower than tier price
        if (finalPrice.value < firstTierPrice.final_price.value) {
            return (
                <>
                    {/* case 5 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                    </Typography>
                </>
            );
        }
        // case 6: if tier price is lower than final price and tier price qty is 1
        if (firstTierPrice.quantity === 1 || finalPrice.value === firstTierPrice.final_price.value) {
            return (
                <>
                    {/* case 6 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency)}
                    </Typography>
                </>
            );
        }
        // case 7: if tier price is lower than final price but tier price qty > 1
        return (
            <>
                {/* case 7 */}
                <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                </Typography>
                <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                </Typography>
                <AsLowAsText />
                <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency)}
                </Typography>
            </>
        );
    }

    // else:
    // if there is no tier price

    // case 8: if there is no discount
    if (regularPrice.value === finalPrice.value) {
        return (
            <>
                {/* case 8 */}
                <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                </Typography>
            </>
        );
    }
    // case 9: if has discount
    return (
        <>
            {/* case 9 */}
            {
                validSpecial ? (
                    <Typography
                        variant="span"
                        letter="capitalize"
                        className={classNames(styles.noMargin, styles.oldPrice)}
                    >
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency)}</strike>
                    </Typography>
                ) : null
            }
            <Typography
                variant="span"
                type="bold"
                letter="capitalize"
                className={classNames(styles.noMargin, styles.finalPrice)}
            >
                {
                    validSpecial ? formatPrice(finalPrice.value + otherPrice, finalPrice.currency)
                        : formatPrice(regularPrice.value + otherPrice, regularPrice.currency)
                }
            </Typography>
        </>
    );
};

export default SimpleProductTypePrice;
