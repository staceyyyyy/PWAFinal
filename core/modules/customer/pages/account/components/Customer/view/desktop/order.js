/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';

const OrderView = (props) => {
    const {
        customerOrders, styles, t, reOrder,
    } = props;
    return (
        <>
            <h2 className={styles.infoTitle}>
                {t('customer:order:recentOrder')}
                <Link href="/sales/order/history">
                    <a className={styles.desktopLinkHeader}>{t('customer:menu:viewall')}</a>
                </Link>
            </h2>
            <hr />
            <div className="row">
                <div className="col-lg-12">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {t('customer:order:order')}
                                        {' '}
                                        #
                                    </TableCell>
                                    <TableCell>{t('customer:order:date')}</TableCell>
                                    <TableCell>{t('customer:order:shippedTo')}</TableCell>
                                    <TableCell>{t('customer:order:orderTotal')}</TableCell>
                                    <TableCell>{t('customer:order:status')}</TableCell>
                                    <TableCell>{t('customer:order:action')}</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customerOrders.items && customerOrders.items.length > 0
                                    ? (
                                        <>
                                            {customerOrders.items.map((val, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell component="td" scope="row">
                                                        {val.order_number}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {formatDate(val.created_at)}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {val.detail[0].shipping_address.firstname}
                                                        {' '}
                                                        {val.detail[0].shipping_address.lastname}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {formatPrice(val.detail[0].grand_total, val.detail[0].global_currency_code)}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {val.status_label}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        <Link href={`/sales/order/view/order_id/${val.order_number}`}>
                                                            <a className={styles.desktopLink}>Detail</a>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className={styles.reorderButton}
                                                            onClick={() => reOrder(val.order_number)}
                                                        >
                                                            <a className={styles.desktopLink}>Reorder</a>
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    )
                                    : null}
                                {customerOrders.items && customerOrders.items.length === 0 ? (
                                    <TableRow>
                                        <TableCell component="td" colSpan="6">
                                            {t('customer:notHaveOrder')}
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default OrderView;
