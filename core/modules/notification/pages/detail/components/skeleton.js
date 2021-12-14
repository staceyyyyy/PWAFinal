import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const NotificationDataSkeleton = () => {
    const SkeletonRect = ({ width, height, marginBottom }) => (
        <Skeleton
            style={{ marginBottom }}
            variant="rect"
            width={width}
            height={height}
            animation="wave"
        />
    );
    return (
        <div className="container">
            <Grid container direction="column">
                <SkeletonRect width={90} height={10} marginBottom={18} />
                <SkeletonRect width={250} height={16} marginBottom={14} />
                <SkeletonRect width={270} height={12} marginBottom={12} />
                <SkeletonRect width={255} height={12} marginBottom={12} />
            </Grid>
        </div>
    );
};

export default NotificationDataSkeleton;
