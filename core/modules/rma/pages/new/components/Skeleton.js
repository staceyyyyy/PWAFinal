import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/rma/pages/new/components/styles';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <div className="row" style={{ paddingBottom: 100 }}>
            <div className="col-lg-2 hidden-mobile">
                <Skeleton animation="wave" variant="rect" height={540} width="100%" />
            </div>
            <div className="col-lg-10 col-xs-12 col-sm-12">
                <Skeleton animation="wave" variant="rect" width="100%" height={40} style={{ marginBottom: 10 }} />
                <div className={classNames(styles.block)} style={{ height: '50%' }}>
                    <Skeleton animation="wave" variant="text" width={120} height={25} />
                    <Skeleton animation="wave" variant="rect" width="100%" height={40} />
                    <Skeleton animation="wave" variant="text" width={120} height={25} />
                    <Skeleton animation="wave" variant="rect" width="100%" height={40} />
                </div>
                <div className={styles.block}>
                    <Skeleton animation="wave" variant="text" width="50%" height={30} />
                    <div className={styles.itemContainer}>
                        <Skeleton animation="wave" variant="rect" width={105} height={130} />
                        <div className={styles.detailItem}>
                            <Skeleton animation="wave" variant="text" width={90} height={15} />
                            <Skeleton animation="wave" variant="text" width={120} height={15} />
                            <Skeleton animation="wave" variant="text" width={120} height={15} />
                            <Skeleton animation="wave" variant="text" width={120} height={15} />
                            <div className="flex-grow" />
                        </div>
                    </div>
                    <Skeleton animation="wave" variant="text" width="50%" height={30} />
                    <div className={styles.itemContainer}>
                        <Skeleton animation="wave" variant="rect" width={105} height={130} />
                        <div className={styles.detailItem}>
                            <Skeleton animation="wave" variant="text" width={90} height={15} />
                            <Skeleton animation="wave" variant="text" width={120} height={15} />
                            <Skeleton animation="wave" variant="text" width={120} height={15} />
                            <Skeleton animation="wave" variant="text" width={120} height={15} />
                            <div className="flex-grow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
