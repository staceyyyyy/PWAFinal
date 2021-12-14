/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import Link from '@material-ui/core/Link';
import React from 'react';
import { features } from '@config';
import useStyles from '@plugin_productitem/style';

const ImageDetail = (props) => {
    const {
        handleClick, small_image, spesificProduct, name,
    } = props;
    const styles = useStyles();
    return (
        <Link onClick={handleClick} style={{ width: '100%' }}>
            <Thumbor
                // eslint-disable-next-line no-nested-ternary
                src={spesificProduct.id ? spesificProduct.image.url
                    : small_image && small_image.url
                        ? small_image.url
                        : '/assets/img/placeholder.png'}
                className={styles.imgProduct}
                width={features.imageSize.product.width}
                height={features.imageSize.product.height}
                quality={80}
                alt={small_image && small_image.url ? small_image.label : name}
                lazy
            />
        </Link>
    );
};

export default ImageDetail;
