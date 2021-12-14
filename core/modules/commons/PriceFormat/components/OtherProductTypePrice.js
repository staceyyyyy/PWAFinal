/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import useStyles from '@common_priceformat/style';

const OtherProductTypePrice = (props) => {
    const {
        priceRange, specialFromDate, specialToDate, additionalPrice,
    } = props;
    const styles = useStyles();
    const otherPrice = additionalPrice || 0;
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;
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

    if (regularPrice.value === finalPrice.value) {
        return (
            <>
                <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency)}
                </Typography>
            </>
        );
    }

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
                    validSpecial ? formatPrice(finalPrice.value, finalPrice.currency)
                        : formatPrice(regularPrice.value + otherPrice, regularPrice.currency)
                }
            </Typography>
        </>
    );
};

export default OtherProductTypePrice;
