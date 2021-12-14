import classNames from 'classnames';
import SwitcherCurrency from '@common_currency';
import SwitcherLanguage from '@common_language';
import useStyles from '@core_modules/setting/pages/default/components/style';

const SettingPage = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={classNames('col-md-12', styles.container)}>
            <div className={styles.block}>
                <SwitcherLanguage {...props} />
            </div>
            <div className={styles.block}>
                <SwitcherCurrency title={t('common:setting:currency')} {...props} />
            </div>
        </div>
    );
};

export default SettingPage;
