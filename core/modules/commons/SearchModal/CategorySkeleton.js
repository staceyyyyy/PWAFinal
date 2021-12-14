import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';

const CategorySkeleton = () => {
    const SkeletonRect = ({ width }) => (
        <Skeleton
            style={{ alignSelf: 'center', marginBottom: '32px' }}
            variant="rect"
            width={width}
            height={16}
            animation="wave"
        />
    );
    return (
        <div style={{ width: '100%', marginTop: '36px' }}>
            <Grid container direction="column" alignItems="center">
                {[100, 60, 180, 65, 150, 70, 80, 175, 70, 55, 115, 60, 155, 65, 80, 120, 60].map((width, i) => (
                    <SkeletonRect key={i} width={width} />
                ))}
            </Grid>
        </div>
    );
};

export default CategorySkeleton;
