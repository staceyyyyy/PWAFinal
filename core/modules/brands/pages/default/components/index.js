import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import AllBrands from '@core_modules/brands/pages/default/components/all';
import useStyles from '@core_modules/brands/pages/default/components/style';
import Featured from '@core_modules/brands/pages/default/components/featured';

const Component = (props) => {
    const { t, featured } = props;
    const desktop = breakPointsUp('sm');
    const styles = useStyles();
    return (
        <div className={classNames('wrapper-brands', styles.wrapperBrands)}>
            <Featured t={t} featured={featured} desktop={desktop} />
            <AllBrands {...props} />
        </div>
    );
};

export default Component;
