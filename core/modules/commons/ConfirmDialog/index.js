import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@common_button';
import propTypes from 'prop-types';
import { useTranslation } from '@i18n';

const ConfirmationDialog = ({
    open = false, handleYes, handleCancel, message,
}) => {
    const { t } = useTranslation(['common']);
    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    {t('common:button:cancel')}
                </Button>
                <Button onClick={handleYes} color="primary" autoFocus>
                    {t('common:button:yes')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleYes: propTypes.func.isRequired,
    handleCancel: propTypes.func.isRequired,
    message: propTypes.string,
};

ConfirmationDialog.defaultProps = {
    message: 'Are you Sure ?',
};

export default ConfirmationDialog;
