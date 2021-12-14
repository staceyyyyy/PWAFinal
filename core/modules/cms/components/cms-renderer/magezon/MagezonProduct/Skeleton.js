import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/style';

const CarouselProductSkeleton = () => {
    const SliderSkeleton = () => (
        <>
            <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '60vw', marginBottom: '8px' }}
                smStyle={{ height: '42vw' }}
                mdStyle={{ height: '200px' }}
            />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="75%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="20%" animation="wave" />
        </>
    );
    return (
        <>
            <Grid container wrap="nowrap">
                <Grid item md={3} display={{ xs: 'none', sm: 'none' }} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={6} sm={4} md={3} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item md={3} display={{ xs: 'none', sm: 'none' }} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
            </Grid>
        </>
    );
};

const FeaturedSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={classNames('row center-xs', styles.contentContainer)}>
            <div className={classNames('col-xs-12 col-sm-12 col-lg-12')}>
                <div className={classNames('row center-xs', styles.contentFeatured)}>
                    <div className={classNames('col-xs-12', styles.contentMobileFeatured)}>
                        <CarouselProductSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSkeleteon;
