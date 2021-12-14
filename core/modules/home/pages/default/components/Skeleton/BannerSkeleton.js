import Skeleton from '@common_skeleton';
import useStyles from '@core_modules/home/pages/default/components/style';

const BannerSliderSkeleteon = ({ logoUrl }) => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <img src={logoUrl} className="logo hidden-desktop" alt="Logo" />
            <Skeleton variant="rect" animation="wave" xsStyle={{ width: '100%', height: '60vw' }} mdStyle={{ width: '100%', height: '577px' }} />
        </div>
    );
};

export default BannerSliderSkeleteon;
