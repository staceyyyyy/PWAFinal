import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import React from 'react';
import Button from '@common_button';
import classNames from 'classnames';
import useStyles from '@plugin_optionitem/components/Footer/style';

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, showAddToCart = true, customStyleBtnAddToCard = '', labelAddToCart = '',
        maxQty = 10000, customButton, customQty = false, freeItemsData,
    } = props;
    const styles = useStyles();

    if (customButton) {
        return customButton;
    }

    return (
        <>
            { showQty && (
                <div className={styles.qty}>
                    <Typography type="bold" variant="span">{t('common:title:qty')}</Typography>
                    <ButtonQty
                        value={qty}
                        onChange={setQty}
                        max={customQty ? freeItemsData.quantity : maxQty}
                        disabled={disabled}
                    />
                </div>
            ) }
            {
                showAddToCart && (
                    <div className={styles.btnAddToCardContainer}>
                        <Button
                            className={classNames(styles.btnAddToCard, customStyleBtnAddToCard)}
                            color="primary"
                            onClick={handleAddToCart}
                            loading={loading}
                            disabled={disabled}
                        >
                            <Typography
                                align="center"
                                type="bold"
                                letter="uppercase"
                                color="white"
                                variant="inherit"
                            >
                                {labelAddToCart || t('product:addToCart')}
                            </Typography>
                        </Button>
                    </div>
                )
            }
        </>
    );
};

export default ConfigurableView;
