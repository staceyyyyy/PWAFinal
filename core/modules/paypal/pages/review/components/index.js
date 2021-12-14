import React from 'react';
import Typography from '@common_typography';
import ListItemCart from '@core_modules/paypal/pages/review/components/ListItemCart';
import ShippingMethod from '@core_modules/paypal/pages/review/components/ShippingMethod';
import ShippingAddress from '@core_modules/paypal/pages/review/components/ShippingAddress';
import PaymentMethod from '@core_modules/paypal/pages/review/components/PaymentMethod';
import PlaceOrder from '@core_modules/paypal/pages/review/components/PlaceOrder';
import SummaryPlugin from '@plugin_summary';

const PaypalReviewComponent = (props) => {
    const { t, checkout } = props;
    return (
        <div id="paypal-review" className="row between-lg">
            <div className="col-lg-12 col-xs-12">
                <Typography variant="h1" letter="uppercase" type="bold">
                    {t('checkout:paypal:reviewPage')}
                </Typography>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <ShippingMethod {...props} />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <ShippingAddress {...props} />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <PaymentMethod {...props} />
            </div>
            <div className="col-lg-12 col-xs-12">
                <ListItemCart
                    {...props}
                />
            </div>
            <div className="col-lg-12 col-xs-12">
                {
                    !checkout.loading.all && checkout.cart && checkout.cart.items && (
                        <SummaryPlugin
                            disabled={checkout.loading.all}
                            isDesktop
                            t={t}
                            dataCart={checkout.cart}
                            handleActionSummary={() => {}}
                            hideButton
                            withLabel={false}
                            labelItemAlign="right"
                        />
                    )
                }

            </div>
            <div className="col-lg-12 col-xs-12">
                <PlaceOrder
                    {...props}
                />
            </div>
        </div>
    );
};

export default PaypalReviewComponent;
