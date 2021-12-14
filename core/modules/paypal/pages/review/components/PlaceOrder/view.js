import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@common_typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@core_modules/paypal/pages/review/components/PlaceOrder/style';

const ShippingAddress = (props) => {
    const {
        t, handlePlaceOrder, checkout,
    } = props;
    const styles = useStyles();
    let { disabled } = props;
    let order = false;
    let disabledCancel = false;
    if (checkout && checkout.loading) {
        order = checkout.loading.order;
        disabled = checkout.loading.order || checkout.loading.all || disabled;
        disabledCancel = checkout.loading.order || checkout.loading.all;
    }

    return (
        <div className={styles.container}>
            <Button
                className={styles.btnCancel}
                href="/checkout"
                color="primary"
                disabled={disabledCancel}
                variant="outlined"
            >
                <Typography
                    variant="span"
                    color={disabledCancel ? 'gray' : 'default'}
                    type="bold"
                    className={styles.btnLabel}
                >
                    {t('common:button:cancel')}
                </Typography>
            </Button>
            <Button
                className={styles.btnPlaceOrder}
                color="primary"
                onClick={handlePlaceOrder}
                disabled={disabled}
            >
                <Typography
                    variant="span"
                    color="white"
                    type="bold"
                    className={styles.btnLabel}
                >
                    {t('checkout:placeOrder')}
                </Typography>
                {order && (
                    <CircularProgress
                        size={24}
                        className={styles.buttonProgress}
                    />
                )}
            </Button>
        </div>
    );
};

export default ShippingAddress;
