import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import useStyles from '@core_modules/blog/components/RelatedProduct/style';
import GridList from '@common_gridlist';
import LabelView from '@plugin_productitem/components/LabelView';

const RelatedProduct = ({ relatedProduct, t, layout }) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    if (relatedProduct.length > 0) {
        if (layout !== 1) {
            return (
                <div>
                    <Typography variant="p" letter="uppercase">
                        {t('blog:relatedProducts')}
                    </Typography>
                    <GridList
                        data={relatedProduct}
                        ItemComponent={ProductItem}
                        className="grid"
                        itemProps={{
                            LabelView,
                            isGrid: true,
                            catalogList: true,
                            className: 'grid-item',
                        }}
                        gridItemProps={{
                            xs: 6, sm: 4, md: 2,
                        }}
                    />
                </div>
            );
        }
        return (
            <div className={styles.relatedContainer}>
                <Typography variant="p" letter="uppercase">
                    {t('blog:relatedProducts')}
                </Typography>
                <Carousel
                    data={relatedProduct}
                    showArrow={desktop}
                    slideLg={6}
                    Item={ProductItem}
                    enableAddToCart
                    enableQuickView
                />
            </div>
        );
    }
    return null;
};

export default RelatedProduct;
