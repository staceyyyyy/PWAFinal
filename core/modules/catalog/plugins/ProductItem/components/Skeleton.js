import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@plugin_productitem/style';

const ProductItemSkeleton = () => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer} style={{ padding: 10 }}>
            <Skeleton variant="rect" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
        </div>
    );
};

export default ProductItemSkeleton;
