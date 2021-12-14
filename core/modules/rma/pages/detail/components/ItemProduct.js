import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import { useTranslation } from '@i18n';
import Image from '@common_image';
import { features } from '@config';
import useStyles from '@core_modules/rma/pages/detail/components/styles';

const ItemProduct = (props) => {
    const {
        name, qty_rma, price_incl_tax, image_url,
        currency = 'IDR', custom_fields,
    } = props;
    const { t } = useTranslation(['return']);
    const { imageSize } = features;
    const styles = useStyles();
    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <div className={styles.productImgContainer}>
                    <Image
                        src={image_url}
                        className={styles.productImg}
                        alt={name}
                        width={imageSize.product.width}
                        height={imageSize.product.height}
                        quality={80}
                    />
                </div>
                <div className={styles.detailItem}>
                    <Typography variant="span">{name}</Typography>
                    <Typography variant="span">{formatPrice(price_incl_tax, currency)}</Typography>
                    <Typography variant="span" className={styles.textDetail}>
                        {t('common:title:qty')}
                        {' '}
                        :
                        {' '}
                        {qty_rma || 0}
                    </Typography>
                    {
                        custom_fields.map((field, indx) => (
                            <Typography key={indx} variant="span" className={styles.textDetail}>
                                {field.field.frontend_labels[0].value}
                                {' '}
                                :
                                {' '}
                                {field.value.frontend_labels[0].value}
                            </Typography>
                        ))
                    }
                    <div className="flex-grow" />
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;
