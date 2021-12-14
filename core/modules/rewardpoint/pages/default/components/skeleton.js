import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/rewardpoint/pages/default/style';

const SkeletonDetail = () => (
    <>
        <Skeleton variant="text" animation="wave" width="100%" height={25} style={{ marginBottom: 20 }} />
        <Skeleton variant="text" animation="wave" width="100%" height={25} style={{ marginBottom: 20 }} />
        <Skeleton variant="text" animation="wave" width="100%" height={25} style={{ marginBottom: 20 }} />
    </>
);

export const Loader = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <SkeletonDetail />
            <div className={styles.tableOuterContainer}>
                <div className={styles.table}>
                    <div className="column" style={{ marginTop: 15, marginBottom: 10 }}>
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Divider />
                    </div>
                    <div className="column" style={{ marginTop: 15, marginBottom: 10 }}>
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Divider />
                    </div>
                    <div className="column" style={{ marginTop: 15, marginBottom: 10 }}>
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Skeleton variant="text" width="100%" height={30} />
                        <Divider />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
