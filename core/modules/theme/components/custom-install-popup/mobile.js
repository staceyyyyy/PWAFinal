/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { installMessage, appName } from '@config';
import useStyles from '@core_modules/theme/components/custom-install-popup/style';

const PopupInstalation = () => {
    const styles = useStyles();
    const closePopup = () => {
        const el = document.getElementById('popup-mobile__install');
        // hidden popup
        if (el) {
            el.style.display = 'none';
        }

        const date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        localStorage.setItem('hideInstallPopup', true);
        localStorage.setItem('expiredHideInstallPopup', date.getDate());
    };
    return (
        <div id="popup-mobile__install" className={classNames('row', styles.containerMobile)}>
            <div className={styles.iconClose}>
                <span className={styles.iconCloseButton} onClick={() => closePopup()}>x</span>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.titleMobile}>{appName}</div>
                <p style={{ margin: 0 }}>{installMessage}</p>
            </div>
            <div className={styles.btnInstallContainer}>
                <Button className={styles.btnInstall} id="btn-install__mobile" variant="contained" color="primary">
                    Install
                </Button>
            </div>
        </div>
    );
};

export default PopupInstalation;
