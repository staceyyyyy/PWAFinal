import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';

const CarouselSkeleton = () => {
    const SliderSkeleton = () => (
        <>
            <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '60vw', marginBottom: '8px' }}
                smStyle={{ height: '42vw' }}
                mdStyle={{ height: '375px' }}
            />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="75%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="20%" animation="wave" />
        </>
    );
    return (
        <div style={{ padding: '24px 0 12px 0', width: '100%' }}>
            <Grid container>
                <Grid item md={1} display={{ xs: 'none', md: 'block' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px 0 12px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={6} md={4} sm={4} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 12px 0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item md={1} display={{ xs: 'none', md: 'block' }}>
                    <SliderSkeleton />
                </Grid>
            </Grid>
        </div>
    );
};

export default CarouselSkeleton;
