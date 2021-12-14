import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import Image from '@common_image';
import useStyles from '@core_modules/order/pages/detail/style';

const ItemProduct = ({
    name, price_incl_tax, row_total_incl_tax, qty_ordered, currency, t, image_url, features: { imageSize },
}) => {
    const styles = useStyles();
    return (
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
                <Typography variant="label" className="clear-margin-padding">{name || ''}</Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:price')}
                    {' '}
                    :
                    {formatPrice(price_incl_tax, currency)}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:qty')}
                    {' '}
                    :
                    {qty_ordered || 0}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:subtotal')}
                    {' '}
                    :
                    {formatPrice(row_total_incl_tax, currency)}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProduct;
