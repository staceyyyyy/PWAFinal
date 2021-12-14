import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Image from '@common_image';
import { features } from '@config';
import useStyles from '@core_modules/rma/pages/new/components/styles';

const ItemProductView = (props) => {
    const {
        checked, disabled, handleChange, name,
        image_url, price_incl_tax, currency,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <Checkbox checked={checked} disabled={disabled} onChange={handleChange} inputProps={{ 'aria-label': name }} />
            <div className={styles.productImgContainer}>
                <Image
                    src={image_url}
                    className={styles.productImg}
                    alt={name}
                    width={features.imageSize.product.width}
                    height={features.imageSize.product.height}
                    quality={80}
                />
            </div>
            <div className={styles.detailItem}>
                <Typography variant="span" type="semiBold">
                    {name || ''}
                </Typography>
                <Typography variant="span">{formatPrice(price_incl_tax, currency)}</Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProductView;
