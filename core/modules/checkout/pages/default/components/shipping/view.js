import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { formatPrice } from '@helper_currency';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';
import Arrow from '@material-ui/icons/ArrowDropDown';
import DeliveryItem from '@core_modules/checkout/components/radioitem';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/checkout/pages/default/components/style';

import {
    ExpanDetailStyle, ExpanPanelStyle, ExpanSummaryStyle, IconAccordion,
} from './style';

const IconLabel = withStyles(IconAccordion)(({ classes, label }) => <div id={`${label}Icon`} className={classes[label]} />);

const Accordion = withStyles(ExpanPanelStyle)(MuiAccordion);

const AccordionSummary = withStyles(ExpanSummaryStyle)(MuiAccordionSummary);

const AccordionDetails = withStyles(ExpanDetailStyle)(MuiAccordionDetails);

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const ShippingView = (props) => {
    const styles = useStyles();
    const {
        isOnlyVirtualProductOnCart, checkout, storeConfig, loading, selected, handleShipping, data, t,
    } = props;
    let content;
    const [expanded, setExpanded] = React.useState(null);
    const [expandedActive, setExpandedActive] = React.useState(true);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpandedActive(false);
        setExpanded(newExpanded ? panel : false);
    };
    if (checkout.selected.delivery === 'pickup') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR');
        content = <DeliveryItem value={{ price }} label={t('checkout:pickupStore')} selected borderBottom={false} />;
    } else if (checkout.selected.delivery === 'instore') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR');
        content = <DeliveryItem value={{ price }} label={t('checkout:instorePickup')} selected borderBottom={false} />;
    } else if (loading.shipping || loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.shippingMethods.length !== 0) {
        const available = data.shippingMethods;
        const config = storeConfig.shipments_configuration ? JSON.parse(`${storeConfig.shipments_configuration}`) : {};
        const group = config ? Object.keys(config) : [];
        const shipping = [];
        for (let index = 0; index < group.length; index += 1) {
            const groupData = [];
            const key = group[index];
            let cnf = config[key];
            cnf = cnf.split(',');
            // create group data if same label on config
            for (let idx = 0; idx < available.length; idx += 1) {
                const element = available[idx];
                const identifier = `${element.carrier_code}_${element.method_code}`;

                for (let idc = 0; idc < cnf.length; idc += 1) {
                    // add check if available on group shipping
                    const checkShipping = groupData.find((x) => x.method_code === element.method_code);

                    if (identifier.match(new RegExp(`^${cnf[idc]}`)) !== null && !checkShipping) {
                        groupData.push({
                            ...element,
                            disabled: !element.available,
                        });
                    }
                }
            }
            if (groupData.length > 0) {
                // ad active key if on group data selected payment method
                let active = false;
                if (selected.shipping) {
                    for (let idx = 0; idx < groupData.length; idx += 1) {
                        const element = groupData[idx];
                        const activeIdentifer = `${element.carrier_code}_${element.method_code}`;
                        if (activeIdentifer === selected.shipping) {
                            active = true;
                        }
                    }
                }
                shipping.push({
                    group: key,
                    data: groupData,
                    active,
                });
            }
        }
        const index = data.shippingMethods.findIndex((x) => x.carrier_code === 'pickup');
        if (index >= 0) {
            data.shippingMethods.splice(index, 1);
        }

        // remove instore carrier_code from reguler shipping method
        const regulerIndex = shipping.findIndex((ship) => ship.group === 'sg-reguler');
        if (regulerIndex !== -1) {
            const removeInstore = shipping[regulerIndex].data.filter((item) => item.carrier_code !== 'instore');
            shipping[regulerIndex].data = removeInstore;
        }

        if (shipping.length > 0) {
            // check if have active on group data by default selected if
            let itemActive = false;
            const error = [];
            for (let idx = 0; idx < shipping.length; idx += 1) {
                const element = shipping[idx];
                if (element.active) {
                    itemActive = true;
                }
                if (element.data && element.data.length > 0) {
                    element.data.forEach((dt) => {
                        if (dt.error_message) {
                            error.push(dt.error_message);
                        }
                    });
                }
            }
            content = (
                <div className="column">
                    <div className={styles.paymentExpansionContainer}>
                        {shipping.map((item, keyIndex) => {
                            if (item.data.length !== 0) {
                                return (
                                    <Accordion
                                        expanded={
                                            expanded === keyIndex // if key index same with expanded active
                                        || (item.active && expandedActive) // expand if item active and not change expand
                                        || (!itemActive && expandedActive && keyIndex === 0)
                                        } // if dont have item active, set index 0 to active
                                        onChange={handleChange(keyIndex)}
                                        key={keyIndex}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel1d-content"
                                            id={`panel-${item.group}`}
                                            expandIcon={<Arrow className={styles.icon} />}
                                        >
                                            <div className={styles.labelAccordion}>
                                                <IconLabel label={item.group.replace('sg-', '')} />
                                                <Typography letter="uppercase" variant="span" type="bold">
                                                    {t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)
                                                === `shippingGrouping.${item.group.replace('sg-', '')}`
                                                        ? item.group.replace('pg-', '')
                                                        : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
                                                </Typography>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="column">
                                                {item.data.length !== 0 ? (
                                                    <Radio
                                                        value={selected.shipping}
                                                        onChange={handleShipping}
                                                        valueData={item.data}
                                                        CustomItem={DeliveryItem}
                                                        classContainer={styles.radioShiping}
                                                        storeConfig={storeConfig}
                                                        propsItem={{
                                                            borderBottom: false,
                                                            classContent: styles.listShippingGroup,
                                                        }}
                                                    />
                                                ) : null}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <div className={styles.listError}>
                        {
                            error && error.length > 0 && error.map((msg, key) => (
                                <Alert key={key} style={{ fontSize: 10, marginBottom: 5 }} severity="error">
                                    {msg}
                                </Alert>
                            ))
                        }
                    </div>
                </div>
            );
        } else {
            content = (
                <Radio
                    value={selected.shipping}
                    onChange={handleShipping}
                    classContainer={styles.listShipping}
                    CustomItem={DeliveryItem}
                    valueData={data.shippingMethods}
                />
            );
        }
    } else {
        content = <Typography variant="p">{t('checkout:noShipping')}</Typography>;
    }

    return isOnlyVirtualProductOnCart ? null : (
        <div className={styles.block} id="checkoutShipping">
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:shippingMethod')}
            </Typography>
            {content}
        </div>
    );
};

export default ShippingView;
