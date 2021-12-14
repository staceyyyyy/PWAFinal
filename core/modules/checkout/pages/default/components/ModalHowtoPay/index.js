import Button from '@common_button';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import gqlService from '@core_modules/checkout/services/graphql';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import useStyles from '@core_modules/checkout/pages/default/components/ModalHowtoPay/style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const ModalHowtoPay = ({
    open,
    setOpen,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const { data, error, loading: loadingTutor } = gqlService.getCmsPage({ identifier: 'how-to-pay' });

    if (data && !error) {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={setOpen}
                maxWidth="sm"
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
            >
                <AppBar className={styles.appBar}>
                    <Typography
                        variant="label"
                        type="bold"
                        align="left"
                        letter="uppercase"
                        className={styles.title}
                    >
                        {data.cmsPage.title}
                    </Typography>
                    <IconButton
                        className={styles.btnClose}
                        edge="start"
                        onClick={setOpen}
                        aria-label="close"
                    >
                        <CloseIcon className={styles.iconClose} />
                    </IconButton>
                </AppBar>
                <div>
                    <DialogContent dividers>
                        <div className={styles.body}>
                            <CmsRenderer content={data.cmsPage.content} />
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <div className={styles.footer}>
                            <Button loading={loadingTutor} onClick={setOpen} className={styles.btnSave} type="submit">
                                {t('checkout:buttonOk')}
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
    return null;
};

export default ModalHowtoPay;
