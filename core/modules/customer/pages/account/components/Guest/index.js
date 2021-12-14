// Library
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import { modules } from '@config';
import Footer from '@core_modules/customer/pages/account/components/Footer';
import FooterView from '@core_modules/customer/pages/account/components/Footer/view';
import useStyles from '@core_modules/customer/pages/account/components/Guest/style';

const WihtOut = (props) => {
    const styles = useStyles();
    const { t, data } = props;

    return (
        <div className={styles.root}>
            <div className={styles.authBlock}>
                <Typography variant="span">{t('customer:haveAccount')}</Typography>
                <Button fullWidth className={styles.btnSigin} href="/customer/account/login">
                    <Typography variant="span" type="bold" letter="uppercase" color="white">
                        {t('common:button:login')}
                    </Typography>
                </Button>
                <Typography variant="span">{t('customer:notHaveAccount')}</Typography>
                <Button fullWidth className={styles.btnSigin} variant="outlined" href="/customer/account/create">
                    <Typography variant="span" type="bold" letter="uppercase">
                        {t('common:button:register')}
                    </Typography>
                </Button>
            </div>
            <span className={styles.span} />
            <Footer {...props} data={data} FooterView={FooterView} modules={modules} />
        </div>
    );
};

export default WihtOut;
