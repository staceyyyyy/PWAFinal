import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useTranslation } from '@i18n';

const ModalCookies = () => {
    const { t } = useTranslation();
    return (
        <>
            <Dialog onClose={() => {}} aria-labelledby="dialog-cookies-warning" open>
                <DialogContent>
                    <div>
                        <h2 id="server-modal-title">{t('common:error:browser')}</h2>
                        <p id="server-modal-description">{t('common:message:browserError')}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalCookies;
