import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaypalButtonView = (props) => {
    const { paypalToken, initialOptionPaypal, paypalHandlingProps } = props;
    if (!paypalToken.loading && initialOptionPaypal['data-order-id'] !== '') {
        return (
            <PayPalScriptProvider defer options={initialOptionPaypal}>
                <PayPalButtons
                    style={{ layout: 'horizontal' }}
                    {...paypalHandlingProps}
                />
            </PayPalScriptProvider>
        );
    }

    return null;
};

export default PaypalButtonView;
