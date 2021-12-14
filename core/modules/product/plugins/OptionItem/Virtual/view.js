import React from 'react';
import Footer from '@plugin_optionitem/components/Footer';

const SimpleOptionView = ({
    qty = 1,
    setQty = () => { },
    handleAddToCart = () => { },
    t,
    loading = false,
    disabled = false,
    showQty = true,
    showAddToCart = true,
    ...other
}) => (
    <>
        <Footer
            loading={loading}
            disabled={disabled}
            showQty={showQty}
            handleAddToCart={handleAddToCart}
            qty={qty}
            setQty={setQty}
            t={t}
            showAddToCart={showAddToCart}
            {...other}
        />
    </>
);

export default SimpleOptionView;
