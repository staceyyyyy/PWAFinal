/* eslint-disable arrow-body-style */
import Carousel from '@common_slick/Caraousel';
import ItemFeatured from '@core_modules/brands/pages/default/components/featured/Item';

const FeaturedBrands = (props) => {
    const {
        featured = [], t, desktop, useTitle = true,
    } = props;
    return (
        <>
            {useTitle && <h4 align="center">{t('brands:featuredBrands')}</h4>}
            <Carousel showArrow={desktop} data={featured} Item={ItemFeatured} />
        </>
    );
};

export default FeaturedBrands;
