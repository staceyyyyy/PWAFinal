import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/checkout/pages/default/components/style';

const SkeletonDelivery = () => {
    const styles = useStyles();
    return (
        <div className={styles.block}>
            <Skeleton variant="text" animation="wave" width="60%" height={30} />
            <Skeleton variant="rect" animation="wave" width="90%" height={70} />
        </div>
    );
};

export default SkeletonDelivery;
