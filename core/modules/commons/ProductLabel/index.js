/* eslint-disable camelcase */
import React from 'react';
import { useTranslation } from '@i18n';
import useStyles from '@common_productlabel/style';

const generateNew = ({ newFromDate, newToDate }) => {
    let showLabelNew = false;
    const nowTime = new Date(Date.now()).getTime();
    if (newFromDate === null && newToDate === null) {
        showLabelNew = false;
    }

    if (newFromDate !== null && newToDate === null) {
        const startTime = new Date(newFromDate).getTime();
        if (nowTime >= startTime) {
            showLabelNew = true;
        }
    }

    if (newFromDate === null && newToDate !== null) {
        const endTime = new Date(newToDate).getTime();
        if (nowTime <= endTime) {
            showLabelNew = true;
        }
    }

    if (newFromDate !== null && newToDate !== null) {
        const startTime = new Date(newFromDate).getTime();
        const endTime = new Date(newToDate).getTime();
        if (nowTime >= startTime && endTime >= nowTime) {
            showLabelNew = true;
        }
    }

    return showLabelNew;
};

const generateSale = ({
    priceRange, specialFromDate, specialToDate,
}) => {
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
        validSpecial = false;
    }
    return validSpecial;
};

const ProductLabel = (props) => {
    const {
        priceRange, specialFromDate, specialToDate, newFromDate, newToDate, config,
    } = props;
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const showLabelNew = generateNew({ newFromDate, newToDate });
    const showSale = generateSale({ priceRange, specialFromDate, specialToDate });
    return (
        <>
            {
                config.enabled && config.new.enabled && showLabelNew ? (
                    <span className={styles.spanNew}>
                        {t('common:title:new')}
                    </span>
                ) : null
            }
            {
                config.enabled && config.sale.enabled && showSale ? (
                    <span className={styles.spanSale}>
                        {`${t('common:title:sale')}!`}
                    </span>
                ) : null
            }
        </>
    );
};

export default ProductLabel;
