import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';

const SkeletonNotification = () => {
    const SkeletonRect = ({ width, height }) => (
        <Skeleton
            style={{ margin: '8px 0' }}
            variant="rect"
            width={width}
            height={height}
            animation="wave"
        />
    );
    const SkeletonItem = () => (
        <Grid container direction="column">
            <SkeletonRect width={250} height={16} />
            <SkeletonRect width={90} height={10} />
        </Grid>
    );

    return (
        <div className="container">
            {[0, 1, 2, 3, 4].map((i) => (
                <ListItem key={i} divider>
                    <SkeletonItem />
                </ListItem>
            ))}
        </div>
    );
};

export default SkeletonNotification;
