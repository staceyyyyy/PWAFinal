import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CancelRounded';
import Button from '@common_button';
import Typography from '@common_typography';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DialogContent = withStyles(() => ({
    root: {
        padding: 0,
        background: 'transparent',
    },
}))(MuiDialogContent);

const Dialog = withStyles(() => ({
    root: {
        padding: 0,
        '& :first-child': {
            padding: 0,
        },
    },
    paper: {
        boxShadow: 'none',
        padding: 0,
        background: 'white',
    },
}))(MuiDialog);

const ModalXenditView = (props) => {
    const {
        open, setOpen, iframeUrl, handleCloseXendit, t,
        payment_code, mode,
        handleSimulateQr, loadSimulate,
    } = props;

    return (
        <Dialog
            TransitionComponent={Transition}
            aria-labelledby="customized-dialog-title"
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            className="modal-xendit"
            PaperProps={{
                classes: {
                    root: 'modal-xendit-paper',
                },
            }}
        >
            <IconButton
                color="primary"
                size="medium"
                className="xendit-btn-close"
                onClick={() => {
                    setOpen();
                    handleCloseXendit();
                }}
                disabled={loadSimulate}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
            <DialogContent classes={{ root: 'modal-xendit-box' }}>
                {
                    payment_code === 'qr_codes' && mode && mode === 'test' && (
                        <div className="form qr-simulate">
                            <Button
                                disabled={loadSimulate}
                                type="button"
                                className="btn-qr-code"
                                onClick={() => handleSimulateQr()}
                                loading={loadSimulate}
                            >
                                <Typography variant="span" letter="uppercase" type="bold" color="white">
                                    {t('common:button:simulateQrCode')}
                                </Typography>

                            </Button>
                        </div>
                    )
                }
                {
                    payment_code === 'qr_codes'
                        ? (
                            <img
                                id="iframe-invoice"
                                className="img-qr-code"
                                alt="Invoice"
                                src={iframeUrl}
                            />
                        ) : (
                            <iframe
                                id="iframe-invoice"
                                className="iframe-invoice"
                                title="Invoice"
                                src={iframeUrl}
                            />
                        )
                }
            </DialogContent>
            <style jsx global>
                {`

                
                    .modal-xendit {
                        background: transparent;
                    }
                    .modal-xendit-paper {
                        overflow-y: visible;
                    }
                    .xendit-btn-close {
                        position: absolute;
                        right: -15px;
                        top: -15px;
                        z-index: 99;
                    }

                   .modal-xendit-box {
                       padding: 0px;
                       width: 600px;
                       background: transparent;
                       height: calc(100vh - 150px);
                       overflow: hidden;
                   }
                   .iframe-invoice {
                        height: inherit;
                        width: inherit;
                        border: 0;
                        overflow-y: scroll;
                    }

                    .img-qr-code { 
                        height: 80%;
                        width: inherit;
                        margin-bottom: 10%;
                    }

                    .qr-simulate {
                        padding: 15px;
                        margin-top: 5%;
                    }

                    .btn-qr-code {
                        height: 45px;
                        padding: 5px;
                    }

                    @media screen and (max-width: 768px) {
                        .modal-xendit-box {
                            padding: 0px;
                            height: calc(100vh - 40px);
                            width: calc(100vw - 70px);
                            overflow: hidden;
                        }
                    }
                    
                `}
            </style>
        </Dialog>
    );
};

export default ModalXenditView;
