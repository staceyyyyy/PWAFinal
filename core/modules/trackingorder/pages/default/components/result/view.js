/* eslint-disable prefer-destructuring */
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import Button from '@common_button';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';
import useStyles from '@core_modules/trackingorder/pages/default/components/style';

const resultItem = ({
    t, orders, storeConfig, openModal,
}) => {
    const styles = useStyles();
    const data = orders.data[0];
    if (orders.data.length > 0) {
        let { detail } = data;
        detail = detail[0];
        const shippingMethods = detail.shipping_methods.shipping_detail;

        const items = [
            { primary: t('trackingorder:orderStatus'), secondary: data.status_label },
            {
                primary: t('trackingorder:shippedTo'),
                secondary: `${detail.shipping_address.firstname} ${detail.shipping_address.lastname}`,
            },
            { primary: t('trackingorder:orderId'), secondary: data.order_number },
            {
                primary: t('trackingorder:orderTotal'),
                secondary: formatPrice(data.grand_total, storeConfig.base_currency_code || 'USD'),
            },
            {
                primary: t('trackingorder:paymentMethod'),
                secondary: detail.payment.payment_additional_info.method_title,
            },
            {
                primary: t('trackingorder:shippingMethod'),
                secondary: detail.shipping_methods.shipping_description,
            },
        ];

        if (shippingMethods.length > 0) {
            shippingMethods.forEach((shipping) => {
                if (shipping.data_detail) {
                    let dt = shipping.data_detail;
                    dt = dt.replace(/'/g, '`');
                    dt = dt.replace(/"/g, "'");
                    dt = dt.replace(/`/g, '"');

                    if (checkJson(dt) && !JSON.parse(dt).errors) {
                        dt = JSON.parse(dt);
                        items.push({
                            primary: t('trackingorder:trackingOrder'),
                            secondary: (
                                <Button
                                    variant="text"
                                    onClick={() => openModal(shipping.trackorder_type, dt)}
                                    align="left"
                                    className={styles.btnTrackOrder}
                                >
                                    <Typography type="bold" decoration="underline" align="left">
                                        {shipping.track_number}
                                        {' '}
                                        {`(${shipping.trackorder_type})`}
                                    </Typography>
                                </Button>
                            ),
                        });
                    } else {
                        items.push({
                            primary: t('trackingorder:trackingOrder'),
                            secondary: shipping.track_number,
                        });
                    }
                } else {
                    items.push({
                        primary: t('trackingorder:trackingOrder'),
                        secondary: shipping.track_number,
                    });
                }
            });
        }
        return (
            <div className={classNames(styles.container, 'row')}>
                <div className="col-xs-12">
                    <Typography variant="title" size="16" className="label-result">
                        {t('trackingorder:trackingInformation')}
                    </Typography>
                </div>
                <div className="col-xs-12 hidden-mobile">
                    <TableContainer className={styles.tableContainer}>
                        <Table className={styles.table} aria-label="simple table">
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row" className={styles.labelTable}>
                                            <Typography align="left" letter="capitalize" className="clear-margin-padding">
                                                {item.primary}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left" className={styles.valueTable}>
                                            <Typography variant="span" type="regular" className="clear-margin-padding">
                                                {item.secondary}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="col-xs-12 hidden-desktop">
                    <List>
                        {items.map((item, i) => (
                            <ListItem key={i}>
                                <ListItemText
                                    className={styles.label}
                                    primary={(
                                        <Typography align="left" letter="capitalize" className="clear-margin-padding">
                                            {item.primary}
                                        </Typography>
                                    )}
                                />
                                <ListItemSecondaryAction className={styles.detail}>
                                    <Typography variant="span" type="regular" className="clear-margin-padding">
                                        {item.secondary}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <style jsx global>
                    {`
                        .label-result {
                            font-size: 20px;
                            margin-top: 30px;
                        }
                    `}
                </style>
            </div>
        );
    }
    return <Alert severity="warning">{t('trackingorder:orderNotFound')}</Alert>;
};

export default resultItem;
