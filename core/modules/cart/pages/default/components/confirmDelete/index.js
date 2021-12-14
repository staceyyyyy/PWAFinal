import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const ConfirmationDelete = ({
    t, open = false, handleDelete, handleCancel,
}) => (
    <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {t('cart:confirmDelete')}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
                {t('common:button:cancel')}
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
                {t('common:button:yes')}
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationDelete;
