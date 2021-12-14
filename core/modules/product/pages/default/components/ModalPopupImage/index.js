import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Plus from '@material-ui/icons/Add';
import Min from '@material-ui/icons/Minimize';
import Banner from '@common_slick/BannerThumbnail';
import useStyles from '@core_modules/product/pages/default/components/ModalPopupImage/style';

const PopupImage = (props) => {
    const { open, setOpen, banner } = props;
    const styles = useStyles();
    const refZoom = React.createRef();

    const zoomIn = () => {
        if (refZoom && refZoom.current && refZoom.current.zoomIn) {
            refZoom.current.zoomIn(refZoom.current.getZoom() + 1);
        }
    };

    const zoomOut = () => {
        if (refZoom && refZoom.current && refZoom.current.zoomOut) {
            refZoom.current.zoomOut(refZoom.current.getZoom() - 1);
        }
    };

    return (
        <Dialog fullScreen open={open} onClose={setOpen}>
            <div className={styles.container}>
                <IconButton className={styles.buttonClose} onClick={setOpen}>
                    <Close color="inherit" fontSize="inherit" />
                </IconButton>
                <div className={styles.actionZoom}>
                    <IconButton className={styles.buttonActionZoom} onClick={zoomIn}>
                        <Plus color="inherit" fontSize="inherit" />
                    </IconButton>
                    <IconButton className={styles.buttonActionZoom} onClick={zoomOut}>
                        <Min color="inherit" fontSize="inherit" />
                    </IconButton>
                </div>
                <Banner
                    data={banner}
                    noLink
                    thumbnail
                    showArrow
                    contentWidth="auto"
                    autoPlay={false}
                    width={960}
                    height={1120}
                    zoom
                    zoomRef={refZoom}
                />
            </div>
        </Dialog>
    );
};

export default PopupImage;
