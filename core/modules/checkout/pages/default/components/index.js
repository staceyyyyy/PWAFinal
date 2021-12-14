import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import Delivery from '@core_modules/checkout/pages/default/components/delivery';
import Email from '@core_modules/checkout/pages/default/components/email';
import Summary from '@core_modules/checkout/pages/default/components/summary';
import Address from '@core_modules/checkout/pages/default/components/address';
import Shipping from '@core_modules/checkout/pages/default/components/shipping';
import PaymentList from '@core_modules/checkout/pages/default/components/payment';
import Promo from '@core_modules/checkout/pages/default/components/promo';
import GiftCard from '@core_modules/checkout/pages/default/components/giftcard';
import OrderComment from '@core_modules/checkout/pages/default/components/OrderComment';
import RewardPoint from '@core_modules/checkout/pages/default/components/rewardpoint';
import Credit from '@core_modules/checkout/pages/default/components/credit';
import PickupInfo from '@core_modules/checkout/pages/default/components/PickupInformation';
import ExtraFee from '@core_modules/checkout/pages/default/components/ExtraFee';
import PromoModalItem from '@core_modules/checkout/pages/default/components/PromoModalItem';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import InStorePickup from '@core_modules/checkout/pages/default/components/instorepickup';
import dynamic from 'next/dynamic';

const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        containerStyle,
        checkout,
        storeConfig,
        CashbackInfoView,
        chasbackMessage,
        DeliveryView,
        DeliverySkeleton,
        formik,
        t,
        setCheckout,
        isOnlyVirtualProductOnCart,
        handleOpenMessage,
        EmailView,
        config,
        updateFormik,
        AddressView,
        ShippingView,
        PaymentView,
        PromoView,
        GiftCardView,
        OrderCommentView,
        SummaryView,
        RewardPointView,
        StoreCreditView,
        modules,
        HeaderView,
        manageCustomer,
        ExtraFeeView,
        cartId,
        PromoModalItemView,
        paypalTokenData,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
    } = props;

    const styles = useStyles();
    const SummaryRef = React.createRef();
    const { order: loading, all: disabled } = checkout.loading;
    const isSelectedPurchaseOrder = checkout.selected.payment === 'purchaseorder';
    // prettier-ignore
    const isPurchaseOrderApply = isSelectedPurchaseOrder && checkout.status.purchaseOrderApply;

    /**
     * [METHOD] handle click for place order
     */
    const handleClick = () => {
        if (SummaryRef.current) {
            SummaryRef.current.handlePlaceOrder();
        }
    };

    /**
     * [VIEW]
     */
    return (
        <div id="checkout" className={classNames(styles.mobileBottomSpace, 'row between-lg')}>
            <div className="col-xs-12 center hidden-mobile">
                <HeaderView storeConfig={storeConfig} />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 center">
                {checkout.data.cart && checkout.data.cart.promoBanner && (
                    <GimmickBanner data={checkout.data.cart.promoBanner || []} />
                )}
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8" style={containerStyle || {}}>
                {modules.checkout.cashback.enabled && checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                    <CashbackInfoView
                        message={chasbackMessage}
                        price={checkout.data.cart.applied_cashback.data[0].amount}
                        currency={storeConfig.base_currency_code}
                        promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                    />
                )}

                {/* {modules.checkout.inStorePickup.enabled && (
                    <div className="row col-xs-12">
                        <div className="col-xs-6">
                            <Button onClick={() => setInStore(false)}>Shipping</Button>
                        </div>
                        <div className="col-xs-6">
                            <Button onClick={() => setInStore(true)}>In Store Pickup</Button>
                        </div>
                    </div>
                )} */}

                <>
                    {modules.checkout.pickupStore.enabled || modules.checkout.inStorePickup.enabled ? (
                        <Delivery
                            t={t}
                            DeliveryView={DeliveryView}
                            Skeleton={DeliverySkeleton}
                            formik={formik}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            storeConfig={storeConfig}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                        />
                    ) : null}
                    <Email
                        t={t}
                        formik={formik}
                        EmailView={EmailView}
                        checkout={checkout}
                        config={config}
                        setCheckout={setCheckout}
                        handleOpenMessage={handleOpenMessage}
                        cartId={cartId}
                    />
                    {/* eslint-disable */}
                    {checkout.selected.delivery === 'home' ? (
                        <Address
                            checkout={checkout}
                            t={t}
                            setCheckout={setCheckout}
                            defaultAddress={checkout.data.defaultAddress}
                            updateFormik={updateFormik}
                            AddressView={AddressView}
                            manageCustomer={manageCustomer}
                            storeConfig={storeConfig}
                            formik={formik}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                        />
                    ) : checkout.selected.delivery === 'pickup' ? (
                            <PickupInfo t={t} formik={formik} checkout={checkout} setCheckout={setCheckout} />
                    ) : (
                        <InStorePickup 
                            handleOpenMessage={handleOpenMessage}
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                        />
                    )}
                    <Shipping
                        t={t}
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        formik={formik}
                        handleOpenMessage={handleOpenMessage}
                        storeConfig={storeConfig}
                        ShippingView={ShippingView}
                        isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                    />

                    <div className={classNames(styles.block)}>
                        <Typography variant="title" type="bold" letter="uppercase">
                            {t('checkout:feePromoLabel')}
                        </Typography>
                        <div className="row">
                            {modules.checkout.extraFee.enabled ? (
                                <ExtraFee
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    updateFormik={updateFormik}
                                    handleOpenMessage={handleOpenMessage}
                                    t={t}
                                    storeConfig={storeConfig}
                                    ExtraFeeView={ExtraFeeView}
                                />
                            ) : null}
                            {modules.promo.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                    <Promo
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        PromoView={PromoView}
                                    />
                                </div>
                            ) : null}
                            {modules.giftcard.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                    <GiftCard
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        GiftCardView={GiftCardView}
                                    />
                                </div>
                            ) : null}
                            {modules.rewardpoint.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                    <RewardPoint
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        RewardPointView={RewardPointView}
                                    />
                                </div>
                            ) : null}
                            {modules.storecredit.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                    <Credit
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        StoreCreditView={StoreCreditView}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <PaymentList
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        handleOpenMessage={handleOpenMessage}
                        t={t}
                        storeConfig={storeConfig}
                        PaymentView={PaymentView}
                        modules={modules}
                        paypalTokenData={paypalTokenData}
                        paypalHandlingProps={paypalHandlingProps}
                        setInitialOptionPaypal={setInitialOptionPaypal}
                        initialOptionPaypal={initialOptionPaypal}
                        setTokenData={setTokenData}
                    />
                    {modules.checkout.orderComment.enabled ? (
                        <div className={classNames(styles.block)}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                <OrderComment
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    OrderCommentView={OrderCommentView}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                <PromoModalItem
                    t={t}
                    storeConfig={storeConfig}
                    checkout={checkout}
                    setCheckout={setCheckout}
                    PromoModalItemView={PromoModalItemView}
                />
                <Summary
                    {...props}
                    loading={loading}
                    disabled={disabled}
                    checkout={checkout}
                    updateFormik={updateFormik}
                    setCheckout={setCheckout}
                    handleOpenMessage={handleOpenMessage}
                    formik={formik}
                    storeConfig={storeConfig}
                    SummaryView={SummaryView}
                    // eslint-disable-next-line no-return-assign
                    refSummary={SummaryRef}
                    isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                />
            </div>
            <div className="col-xs-12 col-sm-8 hidden-mobile center">
                <Button
                    customRootStyle={{ marginBottom: 80, marginTop: 50 }}
                    onClick={handleClick}
                    fullWidth
                    loading={loading}
                    disabled={disabled || checkout.error.shippingAddress || (isSelectedPurchaseOrder && !isPurchaseOrderApply)}
                    className={styles.placeOrderDesktop}
                >
                    <Typography variant="span" letter="uppercase" type="bold" color="white">
                        {t('checkout:placeOrder')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;
