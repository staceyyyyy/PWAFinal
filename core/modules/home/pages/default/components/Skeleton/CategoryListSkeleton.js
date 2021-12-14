import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import useStyles from '@core_modules/home/pages/default/components/style';

const CategoryListSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container spacing={2} direction="column" alignItems="center" className="hidden-desktop">
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="100%"
                    xsStyle={{ height: '60vw' }}
                    mdStyle={{ height: '577px' }}
                    animation="wave"
                />
                <Skeleton className={styles.skeleton} style={{ alignSelf: 'center' }} variant="rect" width="35%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="75%" height={10} animation="wave" />
            </Grid>
            <div className={classNames('row hidden-mobile', styles.contentContainer)}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Skeleton
                        className={styles.skeleton}
                        variant="rect"
                        mdStyle={{ height: '350px' }}
                        animation="wave"
                        style={{ alignSelf: 'center' }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="col-md-12" style={{ marginBottom: '20px' }}>
                        <Skeleton
                            className={styles.skeleton}
                            style={{ alignSelf: 'center', margin: '0 auto' }}
                            variant="rect"
                            width="30%"
                            height={20}
                            animation="wave"
                        />
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '20px' }}>
                        <Skeleton
                            className={styles.skeleton}
                            style={{ alignSelf: 'center', margin: '0 auto' }}
                            variant="rect"
                            width="50%"
                            height={20}
                            animation="wave"
                        />
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '20px' }}>
                        <Skeleton
                            className={styles.skeleton}
                            style={{ alignSelf: 'center', margin: '0 auto' }}
                            variant="rect"
                            width="30%"
                            height={20}
                            animation="wave"
                        />
                    </div>
                </div>
            </div>
            <div className={classNames('row hidden-mobile', styles.contentContainer)}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="col-md-12" style={{ marginBottom: '20px' }}>
                        <Skeleton
                            className={styles.skeleton}
                            style={{ alignSelf: 'center', margin: '0 auto' }}
                            variant="rect"
                            width="30%"
                            height={20}
                            animation="wave"
                        />
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '20px' }}>
                        <Skeleton
                            className={styles.skeleton}
                            style={{ alignSelf: 'center', margin: '0 auto' }}
                            variant="rect"
                            width="50%"
                            height={20}
                            animation="wave"
                        />
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '20px' }}>
                        <Skeleton
                            className={styles.skeleton}
                            style={{ alignSelf: 'center', margin: '0 auto' }}
                            variant="rect"
                            width="30%"
                            height={20}
                            animation="wave"
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Skeleton
                        className={styles.skeleton}
                        variant="rect"
                        mdStyle={{ height: '350px' }}
                        animation="wave"
                        style={{ alignSelf: 'center' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryListSkeleteon;
