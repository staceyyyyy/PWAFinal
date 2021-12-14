import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/trackingorder/pages/default/components/style';

const SkeletonForm = () => {
    const styles = useStyles();
    return (
        <>
            <div className="hidden-mobile">
                <Skeleton className={styles.skeletonForm} variant="rect" width="50%" height={30} />
                <Skeleton className={styles.skeletonForm} variant="rect" width="50%" height={30} />
                <Skeleton className={styles.skeletonForm} variant="rect" width="50%" height={30} />
            </div>
            <div className="hidden-desktop">
                <Skeleton className={styles.skeletonForm} variant="rect" width="100%" height={30} />
                <Skeleton className={styles.skeletonForm} variant="rect" width="100%" height={30} />
                <Skeleton className={styles.skeletonForm} variant="rect" width="100%" height={30} />
            </div>
        </>
    );
};

export default SkeletonForm;
