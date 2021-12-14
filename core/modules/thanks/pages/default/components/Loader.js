import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/thanks/pages/default/components/style';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Skeleton variant="text" animation="wave" width="60%" height={35} />
            <Skeleton variant="text" animation="wave" width="70%" height={35} />
            <Skeleton variant="text" animation="wave" width="90%" height={20} />
            <Skeleton variant="text" animation="wave" width="70%" height={20} />

            <div className={styles.footer}>
                <span className={styles.btnContinue}>
                    <Skeleton variant="rect" animation="wave" width="100%" height={35} />
                </span>
            </div>
        </div>
    );
};

export default SkeletonLoader;
