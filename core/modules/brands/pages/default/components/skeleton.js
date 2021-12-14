import Skeleton from '@material-ui/lab/Skeleton';
import GridList from '@common_gridlist';
import Typography from '@common_typography';
import useStyles from '@core_modules/brands/pages/default/components/style';

const Item = () => ((
    <>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
    </>
));

const SkeletonBrands = ({ t }) => {
    const styles = useStyles();
    return (
        <>
            <Typography
                align="center"
                letter="uppercase"
                type="bold"
                variant="span"
                className={styles.title}
            >
                {t('brands:featuredBrands')}
            </Typography>
            <Skeleton variant="rect" width="100%" height={218} style={{ marginBottom: 20 }} />
            <Typography
                align="center"
                letter="uppercase"
                type="bold"
                variant="span"
                className={styles.title}
            >
                {t('brands:allBrands')}
            </Typography>
            <GridList
                data={[1, 2, 3, 4]}
                ItemComponent={Item}
                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
            />
        </>
    );
};

export default SkeletonBrands;
