import useStyles from '@core_modules/theme/components/recentlyViewed/style';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonRecently = () => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.skeletonContainer}>
                <Skeleton
                    variant="rect"
                    width="17%"
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width="17%"
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width="17%"
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width="17%"
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width="17%"
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width="17%"
                    height={300}
                    animation="wave"
                />
            </div>
            <div className={styles.skeletonContainerMobile}>
                <Skeleton
                    variant="rect"
                    width="48%"
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width="48%"
                    height={300}
                    animation="wave"
                />
            </div>
        </>
    );
};

export default SkeletonRecently;
