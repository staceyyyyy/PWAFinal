/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/Accordion';
import MuiExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import MuiExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';

import Typography from '@common_typography';
import Button from '@common_button';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Radio from '@common_forms/Radio';
import Skeleton from '@material-ui/lab/Skeleton';
import commonConfig from '@config';
import FieldPoint from '@core_modules/checkout/components/fieldcode';
import RadioItem from '@core_modules/checkout/components/radioitem';
import ModalHowtoPay from '@core_modules/checkout/pages/default/components/ModalHowtoPay';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { ExpanDetailStyle, ExpanPanelStyle, ExpanSummaryStyle } from './style';

const ExpansionPanel = withStyles(ExpanPanelStyle)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(ExpanSummaryStyle)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(ExpanDetailStyle)(MuiExpansionPanelDetails);
const PO = 'purchaseorder';
const PaypalCode = 'paypal_express';

/**
 * Loader
 * @returns {COMPONENT}
 */
const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

/**
 * [VIEW] Payment
 * @param {object} props
 * @returns
 */
const PaymentView = (props) => {
    const styles = useStyles();
    const {
        loading, data, checkout, storeConfig, t, handlePayment, handlePurchaseOrder,
        handlePurchaseOrderSubmit, selected, paypalTokenData, paypalHandlingProps, initialOptionPaypal,
    } = props;
    const { modules } = commonConfig;
    const [expanded, setExpanded] = React.useState(null);
    const [expandedActive, setExpandedActive] = React.useState(true);
    const [openModal, setModal] = React.useState(false);

    let content;

    /**
     * [METHOD] handle change
     * @param {*} panel
     * @returns
     */
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        setExpandedActive(false);
    };

    /**
     * [METHOD] handle modal
     * @param {*} state
     */
    const handleModal = (state = false) => {
        setModal(state);
    };

    /**
     * [MAIN] return of view
     */
    if (loading.payment || loading.all) {
        content = <Loader />;
    } else if (data.cart.prices.grand_total.value === 0) {
        content = <Typography variant="p">{t('checkout:noNeedPayment')}</Typography>;
    } else if (data.paymentMethod.length !== 0 && storeConfig.payments_configuration) {
        let paymentConfig = JSON.parse(`${storeConfig.payments_configuration}`);
        const groups = paymentConfig ? Object.keys(paymentConfig) : [];
        // create grouping by config
        paymentConfig = groups.map((key) => {
            const groupData = [];
            let config = paymentConfig[key];
            config = config.split(',');
            for (let idx = 0; idx < data.paymentMethod.length; idx++) {
                const element = data.paymentMethod[idx];
                for (let idc = 0; idc < config.length; idc++) {
                    if (config[idc] === element.code) {
                        groupData.push(element);
                    }
                }
            }
            let active = false;
            if (groupData.length > 0) {
                // ad active key if on group data selected payment method
                if (selected.payment) {
                    for (let idx = 0; idx < groupData.length; idx += 1) {
                        const element = groupData[idx];
                        if (element.code === selected.payment) {
                            active = true;
                        }
                    }
                }
            }
            return {
                group: key,
                data: groupData,
                active,
            };
        });

        // check if have active on group data by default selected if
        let itemActive = false;
        if (paymentConfig) {
            for (let idx = 0; idx < paymentConfig.length; idx += 1) {
                const element = paymentConfig[idx];
                if (element.active) {
                    itemActive = true;
                }
            }
        }
        content = (
            <div>
                <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                {paymentConfig && (
                    <div className={styles.paymentExpansionContainer}>
                        {paymentConfig.map((item, index) => {
                            if (item.data.length !== 0) {
                                return (
                                    <ExpansionPanel
                                        expanded={
                                            expanded === index // if key index same with expanded active
                                            || (item.active && expandedActive) // expand if item active and not change expand
                                            || (!itemActive && expandedActive && index === 0)
                                        } // if dont have item active, set index 0 to active
                                        onChange={handleChange(index)}
                                        key={index}
                                    >
                                        <ExpansionPanelSummary
                                            aria-controls="panel1d-content"
                                            id={`panel-${item.group}`}
                                            expandIcon={<Arrow className={styles.icon} />}
                                        >
                                            <Typography letter="uppercase" variant="span" type="bold">
                                                {t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)
                                                === `paymentGrouping.${item.group.replace('pg-', '')}`
                                                    ? item.group.replace('pg-', '')
                                                    : t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)}
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Grid container>
                                                {item.data.length !== 0 ? (
                                                    <Grid item xs={12}>
                                                        <Radio
                                                            value={selected.payment}
                                                            onChange={handlePayment}
                                                            valueData={item.data}
                                                            CustomItem={RadioItem}
                                                            ComponentOptional={(item) => {
                                                                // prettier-ignore
                                                                const isPurchaseOrder = item.code === PO || selected.payment === PO;
                                                                const isPaypal = item.code === PaypalCode && selected.payment === PaypalCode;
                                                                if (isPurchaseOrder) {
                                                                    return (
                                                                        <Grid item xs={12}>
                                                                            <FieldPoint
                                                                                id="purchase-order"
                                                                                name="purchase-order"
                                                                                placeholder={t('checkout:purchaseOrderNumber')}
                                                                                action={handlePurchaseOrderSubmit}
                                                                                onChange={handlePurchaseOrder}
                                                                                value={checkout.selected.purchaseOrderNumber || ''}
                                                                                disabled={checkout.loading.purchaseOrderNumber}
                                                                                loading={checkout.loading.purchaseOrderNumber}
                                                                                styleFrame={{ marginTop: 0, marginBottom: 0 }}
                                                                                styleFrameText={{ marginTop: 0, marginBottom: 0 }}
                                                                                styleTextField={{ marginTop: 0, marginBottom: 0 }}
                                                                            />
                                                                        </Grid>
                                                                    );
                                                                }
                                                                if (isPaypal && !paypalTokenData.loading
                                                                    && initialOptionPaypal['data-order-id'] !== '') {
                                                                    return (
                                                                        <Grid item xs={12} lg="3" md="4">
                                                                            <PayPalScriptProvider defer options={initialOptionPaypal}>
                                                                                <PayPalButtons
                                                                                    style={{ layout: 'horizontal' }}
                                                                                    {...paypalHandlingProps}
                                                                                />
                                                                            </PayPalScriptProvider>
                                                                        </Grid>
                                                                    );
                                                                }

                                                                return null;
                                                            }}
                                                            propsItem={{
                                                                borderBottom: false,
                                                                RightComponent: true,
                                                            }}
                                                        />
                                                    </Grid>
                                                ) : null}
                                            </Grid>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    } else if (checkout.selected.delivery === 'pickup') {
        content = <Typography variant="p">{t('checkout:noPaymentPickup')}</Typography>;
    } else {
        content = <Typography variant="p">{t('checkout:noPayment')}</Typography>;
    }

    return (
        <div className={styles.block} id="checkoutPayment">
            <ModalHowtoPay open={openModal} setOpen={() => handleModal(false)} />
            <div className={styles.paymentHeader}>
                <Typography variant="title" type="bold" letter="uppercase">
                    {t('checkout:payment')}
                </Typography>
                {modules.checkout.howtoPay.enabled ? (
                    <div>
                        <Button className={styles.howToPay} onClick={() => handleModal(true)}>
                            {t('checkout:howtoPay')}
                        </Button>
                    </div>
                ) : null}
            </div>
            <div>{content}</div>
        </div>
    );
};

export default PaymentView;
