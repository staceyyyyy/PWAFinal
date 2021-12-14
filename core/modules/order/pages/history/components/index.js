/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Link from 'next/link';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/order/pages/history/style';

const DefaultView = (props) => {
    const {
        data, t, page, storeConfig, reOrder,
        pageSize, handleChangePage, handleChangePageSize, loadMore,
        returnUrl,
    } = props;
    const styles = useStyles();
    return (
        <Layout t={t} wishlist={[]}>
            <div>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left">
                                    <Typography variant="span" type="bold">
                                        {t('order:order')}
                                        {' '}
                                        #
                                    </Typography>
                                </TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:date')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:shippedTo')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:orderTotal')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:status')}</Typography></TableCell>
                                <TableCell align="left">
                                    <Typography variant="span" type="bold">{t('order:action')}</Typography>
                                    {' '}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loadMore ? (
                                    <TableRow>
                                        <TableCell colSpan={6} rowSpan={10}>
                                            <SkeletonContent />
                                        </TableCell>
                                    </TableRow>
                                )
                                    : data && data.items.length > 0
                                        ? (
                                            <>
                                                {
                                                    data.items.map((val, index) => (
                                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:order')} #`}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:order')} #`}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {val.order_number}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:date')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:date')}`}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {formatDate(val.created_at, 'M/DD/YY')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:shippedTo')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:shippedTo')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span">
                                                                            {val.detail[0].shipping_address.firstname || val.detail[0].billing_address.firstname}
                                                                            {' '}
                                                                            {val.detail[0].shipping_address.lastname || val.detail[0].billing_address.lastname}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:orderTotal')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:orderTotal')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {formatPrice(val.grand_total, storeConfig.base_currency_code || 'IDR')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:status')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:status')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {val.status_label}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:action')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:action')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={classNames(styles.value, styles.action)}>
                                                                        <Link
                                                                            href="/sales/order/view/order_id/[id]"
                                                                            as={`/sales/order/view/order_id/${val.order_number}`}
                                                                        >
                                                                            <a>
                                                                                <Typography variant="span" type="regular" decoration="underline">
                                                                                    {t('order:view')}
                                                                                </Typography>
                                                                            </a>
                                                                        </Link>
                                                                        {
                                                                            (val.detail[0].aw_rma && val.detail[0].aw_rma.status)
                                                                            && (
                                                                                <a onClick={() => returnUrl(val.order_number)}>
                                                                                    <Typography variant="span" type="regular" decoration="underline">{t('order:smReturn')}</Typography>
                                                                                </a>
                                                                            )
                                                                        }
                                                                        <a onClick={() => reOrder(val.order_number)}>
                                                                            <Typography variant="span" type="regular" decoration="underline">
                                                                                {t('order:reorder')}
                                                                            </Typography>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                <TableRow>
                                                    <TablePagination
                                                        rowsPerPageOptions={[10, 20, 50, { label: 'All', value: data.total_count }]}
                                                        colSpan={6}
                                                        count={data.total_count || 0}
                                                        rowsPerPage={pageSize}
                                                        page={page}
                                                        labelRowsPerPage="Limit"
                                                        SelectProps={{
                                                            inputProps: { 'aria-label': 'rows per page' },
                                                            native: true,
                                                        }}
                                                        onChangePage={handleChangePage}
                                                        onChangeRowsPerPage={handleChangePageSize}
                                                    />
                                                </TableRow>
                                            </>
                                        )

                                        : (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Alert severity="warning">{t('order:notFound')}</Alert>
                                                </TableCell>
                                            </TableRow>
                                        )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};

export default DefaultView;
