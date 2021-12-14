import React from 'react';
import dynamic from 'next/dynamic';
import propTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from '@core_modules/product/pages/default/components/RelatedProductCaraousel/style';
import Typography from '@common_typography';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });
const ProductItem = dynamic(() => import('@plugin_productitem'), { ssr: false });

const RelatedProductCaraouselView = ({ data, t }) => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.carouselContainer, 'col-xs-12 col-lg-12')}>
            <Typography variant="h1" component="h2" align="center" className={styles.carouselTitle}>
                {t('common:title:relatedProduct')}
            </Typography>
            <Caraousel
                enableQuickView={false}
                data={data}
                Item={ProductItem}
            />
        </div>
    );
};

RelatedProductCaraouselView.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: propTypes.array,
    t: propTypes.func.isRequired,
};

RelatedProductCaraouselView.defaultProps = {
    data: [],
};

export default RelatedProductCaraouselView;
