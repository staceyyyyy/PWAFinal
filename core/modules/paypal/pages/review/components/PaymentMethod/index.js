import React from 'react';
import Typography from '@common_typography';
import useStyles from '@core_modules/paypal/pages/review/components/PaymentMethod/style';
import classNames from 'classnames';
import { modules } from '@config';
// import Link from 'next/link';

const PaymentMethod = (props) => {
    const { t, checkout } = props;
    let paypalData = {};
    if (typeof window !== 'undefined') {
        paypalData = JSON.parse(localStorage.getItem(modules.paypal.keyData));
    }

    let paymentMethod = {};
    if (checkout && checkout.cart && checkout.cart.selected_payment_method) {
        paymentMethod = checkout.cart.selected_payment_method;
    }

    if (paypalData && paypalData.details && paypalData.details.payer
        && paypalData.details.payer.email_address) {
        paymentMethod = {
            ...paymentMethod,
            email_address: paypalData.details.payer.email_address,
        };
    }

    if (checkout.cart && checkout.cart.email) {
        paymentMethod = {
            ...paymentMethod,
            email_address: checkout.cart.email,
        };
    }

    const styles = useStyles();

    return (
        <div className="row">
            <div className="col-xs-12">
                <Typography variant="span" letter="capitalize" type="bold">
                    {t('checkout:paymentMethod')}
                </Typography>
            </div>
            <div className={classNames('col-xs-12', styles.detail)}>
                <Typography variant="p" letter="capitalize">
                    {paymentMethod.title || ''}
                </Typography>
                {
                    paymentMethod && paymentMethod.email_address && (
                        <Typography variant="p">
                            {paymentMethod.email_address}
                        </Typography>
                    )
                }
                <img
                    src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png"
                    alt="Buy now with paypal"
                />
            </div>
            {/* <div className="col-xs-12">
                <Link href={initialOptionPaypal.editUrl || ''}>
                    <a>
                        <Typography variant="span" letter="capitalize">
                            {t('common:button:edit')}
                        </Typography>
                    </a>
                </Link>
            </div> */}
        </div>
    );
};

export default PaymentMethod;
