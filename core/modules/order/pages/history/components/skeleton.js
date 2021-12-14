import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/order/pages/history/style';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SkeletonContent = () => {
    const styles = useStyles();
    return (
        <>
            <div className="hidden-desktop">
                {data.map((i) => (
                    <div key={i} className={styles.itemContainer}>
                        <div className={styles.contentItem}>
                            <Skeleton variant="text" width={70} height={15} animation="wave" />
                            <Skeleton variant="text" width={120} height={20} animation="wave" />
                            <div className={styles.detailItem}>
                                <div className={`column ${styles.columnLabel}`}>
                                    <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                </div>
                                <div className={styles.detailContent}>
                                    <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden-mobile">
                {data.map((i) => (
                    <Skeleton key={i} variant="text" width="100%" height={30} animation="wave" />
                ))}
                {data.map((i) => (
                    <Skeleton key={i} variant="text" width="100%" height={30} animation="wave" />
                ))}
            </div>
        </>
    );
};

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <>
            <div className="hidden-mobile">
                <div className={styles.container}>
                    {data.map((i) => (
                        <div key={i} className={styles.itemContainer}>
                            <div className={styles.contentItem}>
                                <div className={styles.detailItem}>
                                    <div className={`column ${styles.columnLabelId}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                    <div className={`column ${styles.columnLabelDate}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                    <div className={`column ${styles.columnLabelShipped}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                    <div className={`column ${styles.columnLabelTotal}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                    <div className={`column ${styles.columnLabelStatus}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                    <div className={`column ${styles.columnLabelAction}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classNames(styles.container, 'hidden-desktop')}>
                <SkeletonContent />
            </div>
        </>
    );
};

export default SkeletonLoader;
