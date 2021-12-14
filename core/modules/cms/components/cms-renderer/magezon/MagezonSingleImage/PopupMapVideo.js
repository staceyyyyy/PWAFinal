import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';

const Transition = React.forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

const PopupMapVideo = ({
    open, setOpen, url, title,
}) => (
    <Dialog
        open={open}
        onClose={setOpen}
        scroll="paper"
        TransitionComponent={Transition}
        PaperProps={{
            style: { background: 'transparent' },
            elevation: 0,
        }}
    >
        <DialogContent style={{ background: 'transparent' }}>
            <div className="modal-map-video">
                <IconButton className="btn-close-map-video" onClick={() => { setOpen(); }}>
                    <CloseIcon />
                </IconButton>
                <iframe
                    width={560}
                    height={315}
                    src={url}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            <style jsx global>
                {`
                .modal-map-video {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                }

                .btn-close-map-video {
                    position: absolute;
                    right: -15px;
                    top: -15px;
                    color: white;
                }
            `}
            </style>
        </DialogContent>
    </Dialog>
);

export default PopupMapVideo;
