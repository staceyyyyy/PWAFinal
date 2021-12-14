import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/productcompare/pages/default/components/style';

const SkeletonView = () => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.container}>
                <Skeleton variant="rect" width="60%" height={40} style={{ marginBottom: 20 }} />
                {
                    [1, 2].map((i) => (
                        <div className="row" key={i} style={{ marginBottom: 15 }}>
                            <div className="col-xs-12">
                                <Skeleton variant="rect" width="100%" height={150} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default SkeletonView;
