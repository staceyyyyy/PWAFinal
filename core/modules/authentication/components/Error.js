import Typography from '@common_typography';
import Button from '@common_button';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';

import useStyle from './style';

const Error = ({ t }) => {
    const styles = useStyle();
    const appEnv = getAppEnv();

    const handleReload = () => {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    const handleBackToStore = () => {
        if (typeof window !== 'undefined') {
            window.location.replace(
                getStoreHost(appEnv || 'prod'),
            );
        }
    };

    return (
        <div className={styles.container}>
            <img src="/assets/img/ghosts.png" alt="ghost-error" className={styles.img} />
            <Typography variant="h1" type="bold">
                {t('checkout:error:title')}
            </Typography>
            <Typography variant="span" type="semiBold" color="gray" align="center">
                {t('checkout:error:message')}
            </Typography>
            <Button variant="text" onClick={handleReload}>
                <Typography variant="title" type="semiBold" color="red">
                    {t('checkout:error:try')}
                </Typography>
            </Button>
            <Button variant="text" onClick={handleBackToStore}>
                <Typography variant="span" type="semiBold">
                    {t('checkout:error:backToStore')}
                </Typography>
            </Button>
        </div>
    );
};

export default Error;
