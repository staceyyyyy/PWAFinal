/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@common_typography';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import RedeemIcon from '@material-ui/icons/Redeem';
import ProductItem from '@plugin_productitem';
import useStyles from '@core_modules/checkout/pages/default/components/PromoModalItem/style';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });

const PromoModalItemView = (props) => {
    const {
        items, handleAddToCart, handleClickOpen, handleClose, open,
        availableMaxQty, customQty,
    } = props;
    const styles = useStyles();

    const [triger, setTriger] = React.useState(false);
    const maxHeigtToShow = 51;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.getElementById('header');
            const checkScrollTop = () => {
                // handle show hide header
                if (header) {
                    if (window.pageYOffset > 51) {
                        header.classList.add('header-small');
                    } else {
                        header.classList.remove('header-small');
                    }
                }
                if (!triger && window.pageYOffset > maxHeigtToShow) {
                    setTriger(true);
                } else if (triger && window.pageYOffset < maxHeigtToShow) {
                    setTriger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, triger]);

    return (
        <>
            <div className={triger ? styles.freeItemContainerMobileFixed : styles.freeItemContainer}>
                <RedeemIcon />
            &nbsp;
                <span>
                    Select your
                    <Button variant="text" color="primary" onClick={handleClickOpen}>
                        <Typography type="bold" letter="uppercase">
                            Free Gift!
                        </Typography>
                    </Button>
                </span>
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
                <MuiDialogTitle disableTypography className={styles.root} id="customized-dialog-title">
                    <Typography variant="h6">Free Promo Items</Typography>
                    <Typography variant="span">{`Available max quatity : ${availableMaxQty}`}</Typography>
                    {handleClose ? (
                        <IconButton aria-label="close" className={styles.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
                <div className={classNames(styles.carouselContainer, 'col-xs-12 col-lg-12')}>
                    <Caraousel
                        data={items}
                        Item={ProductItem}
                        enableAddToCart
                        enableOption
                        handleAddToCart={handleAddToCart}
                        enableWishlist={false}
                        enablePrice={false}
                        enableRating={false}
                        enableQuickView={false}
                        showQty
                        customQty={customQty}
                        maxQty={availableMaxQty}
                        slideLg={5}
                    />
                </div>
            </Dialog>
        </>
    );
};

export default PromoModalItemView;
