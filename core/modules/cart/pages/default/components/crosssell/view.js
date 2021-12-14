import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import Typography from '@common_typography';
import useStyles from '@core_modules/cart/pages/default/components/crosssell/style';

const CrossSellView = (props) => {
    const { t, editMode = false, data = [] } = props;
    const styles = useStyles();
    const customStyle = !editMode ? styles.margin : '';
    return (
        <>
            <div className={customStyle}>
                <Typography
                    variant="h3"
                    type="bold"
                    letter="uppercase"
                    align="center"
                    className={styles.crossselTitle}
                >
                    {t('cart:crossell:title')}
                </Typography>
                <div className={styles.slider}>
                    <Carousel enableQuickView={false} data={data} Item={ProductItem} />
                </div>
            </div>
        </>
    );
};

export default CrossSellView;
