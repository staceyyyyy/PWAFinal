/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import React from 'react';
import useStyles from '@core_modules/home/pages/default/components/style';

const ImageDetail = (props) => {
    const {
        src, width, height, name,
    } = props;
    const styles = useStyles();
    return (
        <Thumbor
            // eslint-disable-next-line no-nested-ternary
            src={src}
            className={styles.imgFeatured}
            width={width}
            height={height}
            quality={80}
            alt={name}
            lazy
        />
    );
};

export default ImageDetail;
