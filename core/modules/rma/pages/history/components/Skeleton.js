import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/rma/pages/history/components/styles';

export const Loader = () => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.container, 'row')}>
            <div className="col-lg-10 col-xs-12 col-sm-12">
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
        </div>
    );
};

export default Loader;
