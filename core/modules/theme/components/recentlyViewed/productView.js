import Carousel from '@common_slick/Caraousel';
import GridList from '@common_gridlist';
import ProductItem from '@plugin_productitem';
import SkeletonRecently from '@core_modules/theme/components/recentlyViewed/skeleton';
import classNames from 'classnames';
import ButtonCompare from '@core_modules/theme/components/recentlyViewed/buttonCompare';
import Typography from '@common_typography';
import useStyles from '@core_modules/theme/components/recentlyViewed/style';

const ProductView = (props) => {
    const styles = useStyles();
    const {
        toggleDrawer, wrapperContent, recentlyBtnContent, desktop, t,
        loading, product, contentFeatured,
        className,
    } = props;

    if (loading) {
        return <SkeletonRecently />;
    }

    return (
        <div className={wrapperContent}>
            <ButtonCompare
                onClick={toggleDrawer(false)}
                className={recentlyBtnContent}
            >
                <Typography
                    variant="title"
                    type="bold"
                    className="button-title"
                >
                    {t('common:recentlyView:title')}
                </Typography>
            </ButtonCompare>
            <div className={classNames('row', contentFeatured)}>
                {
                    product && product.products && product.products.items
                    && product.products.items.length <= 3
                        ? (
                            <GridList
                                data={product ? product.products.items : []}
                                ItemComponent={ProductItem}
                                className={styles.GridItem}
                                gridItemProps={{ xs: 4 }}
                            />
                        )
                        : (
                            <Carousel
                                data={product ? product.products.items : []}
                                showArrow={desktop}
                                Item={ProductItem}
                                className={className}
                                enableAddToCart
                                enableQuickView
                            />
                        )
                }
            </div>
        </div>
    );
};

export default ProductView;
