import ProductItem from '@plugin_productitem';
import useStyles from '@common_slider/Carousel/style';

const Item = (props) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <ProductItem
                {...props}
                variants={[]}
                configurable_options={[]}
            />
        </div>
    );
};

export default Item;
