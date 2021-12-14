import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
// import Router from 'next/router';
import React from 'react';
import Button from '@common_button';
import useStyles from '@core_modules/product/pages/default/components/OptionItem/style';

const Footer = ({
    qty = 1,
    setQty = () => { },
    handleAddToCart = () => { },
    t,
    loading = false,
    disabled = false,
}) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.qty}>
                <Typography type="bold" variant="span">{t('common:title:qty')}</Typography>
                <ButtonQty
                    value={qty}
                    onChange={setQty}
                    max={10000}
                    disabled={disabled}
                />
            </div>
            <div className={styles.footer}>
                <Button
                    className={styles.btnAddToCard}
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
                        variant="span"
                    >
                        {t('product:addToCart')}
                    </Typography>
                </Button>
            </div>
        </>
    );
};

export default Footer;
