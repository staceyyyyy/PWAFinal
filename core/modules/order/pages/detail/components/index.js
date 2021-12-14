/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import Layout from '@layout_customer';
import { modules } from '@config';
import useStyles from '@core_modules/order/pages/detail/style';
import ItemProduct from '@core_modules/order/pages/detail/components/product';
import Footer from '@core_modules/order/pages/detail/components/footer';
import Table from '@core_modules/order/pages/detail/components/TableListItem';
import OrderStatusIcon from '@core_modules/order/pages/detail/components/OrderStatusIcon';
import dayjs from 'dayjs';
import Button from '@common_button';
import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit';
import { setCheckoutData } from '@helper_cookies';

const DetailOrder = (props) => {
    const {
        t, detail, currency, features, reOrder, returnUrl,
        paymentInfo,
    } = props;
    const { checkout: { xendit: { paymentPrefixCodeOnSuccess } } } = modules;
    const styles = useStyles();
    const [openXendit, setOpenXendit] = React.useState(false);

    let items = [];
    if (detail.length > 0 && detail[0].detail[0].items.length) {
        const configurableProduct = [];
        detail[0].detail[0].items.map((item) => {
            if (item.parent_item_id == null) {
                const tmp = {};
                const child = detail[0].detail[0].items.filter((childItem) => childItem.parent_item_id === item.item_id);
                tmp.name = child.length ? child[0].name : item.name;
                configurableProduct.push({ ...item, ...tmp });
            }
        });
        const simpleProduct = detail[0].detail[0].items.filter((item) => !configurableProduct.find(({ sku }) => item.sku === sku) && item);
        items = [...configurableProduct, ...simpleProduct];
    }
    if (detail.length > 0) {
        const handleOpenXendit = () => {
            setCheckoutData({
                email: detail[0].detail[0].customer_email,
                order_number: detail[0].order_number,
                order_id: detail[0].order_number,
            });
            setOpenXendit(!openXendit);
        };
        return (
            <Layout t={t} wishlist={[]} activeMenu="/sales/order/history">
                {
                    paymentInfo && paymentInfo.invoice_url && (
                        <ModalXendit
                            open={openXendit}
                            setOpen={() => setOpenXendit(!openXendit)}
                            iframeUrl={paymentInfo.invoice_url}
                            order_id={detail[0].order_number}
                            payment_code={paymentInfo.method_code}
                            fromOrder
                            amount={detail[0].detail[0].grand_total}
                            mode={paymentInfo.xendit_mode}
                            xendit_qrcode_external_id={paymentInfo.xendit_qrcode_external_id}
                        />
                    )
                }
                <div className="column">
                    <div className={classNames('hidden-mobile', styles.blockHeader)}>
                        <Typography variant="h1" letter="uppercase" type="regular" className={classNames('clear-margin-padding', styles.headerTitle)}>
                            {t('order:order')}
                            {' # '}
                            {detail[0].order_number || ''}
                        </Typography>
                        <Typography variant="span" className="clear-margin-padding">
                            {formatDate(detail[0].created_at)}
                        </Typography>
                    </div>
                    <div className={styles.blockIcon}>
                        <OrderStatusIcon status={detail[0].status} t={t} />
                    </div>
                    <div className={classNames(styles.block)}>
                        <div className="row center-xs start-sm start-sm start-md start-lg">
                            <div className="col-xs-12">
                                <Typography
                                    variant="span"
                                    letter="capitalize"
                                    type="regular"
                                    className={classNames('clear-margin-padding', styles.blockLabel)}
                                >
                                    {t('order:orderInfo')}
                                </Typography>
                            </div>
                            <div className="col-xs-12 hidden-desktop">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:orderId')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].order_number || ''}
                                </Typography>
                                <Typography variant="p" type="bold" letter="uppercase" align="center">
                                    {t('order:date')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {formatDate(detail[0].created_at)}
                                </Typography>
                            </div>
                            {detail[0].detail[0].shipping_address.length > 0 && (
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                        {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                            ? t('order:pickupAt')
                                            : t('order:shippedTo')}
                                    </Typography>
                                    <Typography variant="span" className="clear-margin-padding">
                                        {detail[0].detail[0].shipping_address.firstname || ''}
                                        {' '}
                                        {detail[0].detail[0].shipping_address.lastname || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.street || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.city || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.region || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.country_id || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.telephone || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.postcode || ''}
                                    </Typography>
                                </div>
                            )}
                            {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store && (
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                        {t('order:pickupBy')}
                                    </Typography>
                                    <Typography variant="span" className="clear-margin-padding">
                                        {detail[0].detail[0].pickup_store.pickup_person.name}
                                        <br />
                                    </Typography>
                                    <Typography variant="span" className="clear-margin-padding">
                                        {`Hp : ${detail[0].detail[0].pickup_store.pickup_person.handphone}`}
                                        <br />
                                    </Typography>
                                    <Typography variant="span" className="clear-margin-padding">
                                        {`Email : ${detail[0].detail[0].pickup_store.pickup_person.email}`}
                                        <br />
                                    </Typography>
                                </div>
                            )}
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:orderStatus')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].status_label || ''}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:billingAddress')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].billing_address.firstname || ''}
                                    {' '}
                                    {detail[0].detail[0].billing_address.lastname || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.street || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.city || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.region || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.country_id || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.telephone || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.postcode || ''}
                                </Typography>
                            </div>
                            {detail[0].detail[0].shipping_address.length > 0 && (
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                        {t('order:shippingMethod')}
                                    </Typography>
                                    <Typography variant="span" className="clear-margin-padding">
                                        {detail[0].detail[0].shipping_methods.shipping_description || ''}
                                    </Typography>
                                </div>
                            )}
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:paymentMethod')}
                                </Typography>
                                {Object.keys(detail[0].detail[0].payment.payment_additional_info).map((item) => {
                                    if (
                                        item !== '__typename'
                                        && detail[0].detail[0].payment.payment_additional_info[item] !== ''
                                        && detail[0].detail[0].payment.payment_additional_info[item] !== null
                                    ) {
                                        return (
                                            <React.Fragment key={item}>
                                                <Typography variant="p" type="bold" letter="capitalize" className={styles.labelDetailSm}>
                                                    {item.replace('_', ' ')}
                                                </Typography>
                                                <Typography variant="span" className="clear-margin-padding">
                                                    {detail[0].detail[0].payment.payment_additional_info[item] || ''}
                                                </Typography>
                                            </React.Fragment>
                                        );
                                    }
                                })}
                                {
                                    (detail[0].status === 'pending' || detail[0].status === 'pending_payment')
                                    && paymentInfo && (paymentPrefixCodeOnSuccess.includes(paymentInfo.method_code)
                                    || paymentInfo.method_code === 'qr_codes')
                                    && (paymentInfo.due_date !== null
                                        ? dayjs().isBefore(dayjs(paymentInfo.due_date))
                                        : true
                                    )
                                    && (
                                        <>

                                            <div className={styles.btnPayNow}>
                                                <Typography variant="span" className="clear-margin-padding">
                                                    {t('order:onboarding')}
                                                </Typography>
                                            </div>
                                            <div className="hidden-mobile">
                                                <Button
                                                    onClick={() => handleOpenXendit()}
                                                    className={styles.btnPayNow}
                                                    align="left"
                                                >
                                                    <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
                                                        {t('thanks:paynow')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                            <div className="hidden-desktop">
                                                <Button
                                                    onClick={() => handleOpenXendit()}
                                                    className={styles.btnPayNow}
                                                >
                                                    <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
                                                        {t('thanks:paynow')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className="row center-xs start-sm start-sm start-md start-lg">
                            <div className="col-xs-12">
                                <Typography
                                    variant="span"
                                    letter="capitalize"
                                    type="regular"
                                    className={classNames('clear-margin-padding', styles.blockLabel)}
                                >
                                    {t('order:orderItem')}
                                </Typography>
                            </div>
                            <div className="col-xs-12">
                                <div className="hidden-desktop">
                                    {items.length > 0
                                        && items.map((item, key) => (
                                            <ItemProduct t={t} key={key} {...item} currency={currency} features={features} />
                                        ))}
                                </div>
                                <div className="hidden-mobile">
                                    <Table data={items} t={t} currency={currency} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(styles.block)}>
                        <div className="row end-md">
                            <div className="col-xs-12 col-sm-6 col-md-8 hidden-mobile" />
                            <div className="col-xs-12 col-sm-6 col-md-4">
                                {(detail[0].detail[0].subtotal || detail[0].detail[0].subtotal_incl_tax) && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            Sub total
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(
                                                detail[0].detail[0].tax_amount ? detail[0].detail[0].subtotal : detail[0].detail[0].subtotal_incl_tax,
                                                currency,
                                            )}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].tax_amount && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('common:tax')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].tax_amount, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].payment && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:shipping')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].payment.shipping_amount, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].discount_amount ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:discount')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].discount_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:credit')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {(modules.giftcard.enabled && detail[0].detail[0] && detail[0].detail[0].aw_giftcard.giftcard_amount) ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:giftcard')}
                                            {' '}
                                            (
                                            {detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code}
                                            )
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].applied_extra_fee ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {detail[0].detail[0].applied_extra_fee.title}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(
                                                detail[0].detail[0].applied_extra_fee.extrafee_value.value,
                                                detail[0].detail[0].applied_extra_fee.extrafee_value.currency,
                                            )}
                                        </Typography>
                                    </div>
                                ) : null}
                                <div className={styles.listSummary}>
                                    <Typography variant="title" type="bold" letter="capitalize" className={styles.labelSummary}>
                                        Total
                                    </Typography>
                                    <Typography variant="title" type="bold" letter="capitalize">
                                        {detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-8">
                                <div className="row">
                                    <div className={styles.wrapperButton}>
                                        <button type="button" className={styles.reorderButton} onClick={reOrder}>
                                            <Typography variant="span" type="regular">
                                                {t('order:reorder')}
                                            </Typography>
                                        </button>
                                    </div>
                                    {
                                        (detail[0].detail[0].aw_rma && detail[0].detail[0].aw_rma.status)
                                        && (
                                            <div className={styles.wrapperButton}>
                                                <button
                                                    type="button"
                                                    className={styles.reorderButton}
                                                    onClick={() => returnUrl(detail[0].order_number)}
                                                >
                                                    <Typography variant="span" type="regular">
                                                        {t('order:smReturn')}
                                                    </Typography>
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <Footer {...props} />
                    </div>
                </div>
            </Layout>
        );
    }
    return (
        <Alert className="m-15" severity="warning">
            {t('order:notFound')}
        </Alert>
    );
};

export default DetailOrder;
