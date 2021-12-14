import Banner from '@common_slick/Banner';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@core_modules/home/pages/default/components/style';

const BannerView = (props) => {
    const { images } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    return (
        <div className={classNames(styles.header)} id="home-banner">
            {images && images.length && <Banner data={images} showArrow={desktop} />}
        </div>
    );
};

export default BannerView;
