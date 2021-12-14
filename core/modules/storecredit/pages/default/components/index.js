/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Alert from '@material-ui/lab/Alert';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import useStyles from '@core_modules/storecredit/pages/default/components/style';
import SkeletonStoreCredit from '@core_modules/storecredit/pages/default/components/skeleton';

const StoreCreditPage = (props) => {
    const styles = useStyles();
    const {
        t,
        storeCredit,
        loading,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage,
    } = props;

    const handlePage = (event) => {
        handleChangePage(parseInt(event.target.value));
    };

    const handleRowsPerPage = (event) => {
        handleChangeRowsPerPage(parseInt(event.target.value, 10));
    };
    return (
        <Layout {...props}>
            <div className={styles.container}>
                <p className={styles.textBalance}>
                    {t('storecredit:balance')}
                    {' '}
                    <b>
                        {storeCredit.current_balance && storeCredit.current_balance.value !== null
                            ? formatPrice(storeCredit.current_balance.value, storeCredit.current_balance.currency)
                            : ''}
                    </b>
                </p>

                <div className={styles.tableOuterContainer}>
                    <TableContainer component={Paper} className={styles.tableContainer}>
                        <Table className={styles.table} aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">{t('storecredit:transactionId')}</TableCell>
                                    <TableCell align="left">{t('storecredit:adjustment')}</TableCell>
                                    <TableCell align="left">{t('storecredit:creditbalance')}</TableCell>
                                    <TableCell align="left">{t('storecredit:comment')}</TableCell>
                                    <TableCell align="left">{t('storecredit:transactionDate')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <SkeletonStoreCredit />
                                ) : storeCredit.transaction_history.items.length > 0 ? (
                                    <>
                                        {storeCredit.transaction_history.items.map((val, idx) => (
                                            <TableRow key={idx} className={styles.tableRowResponsive}>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('storecredit:transactionId')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('storecredit:transactionId')}</b>
                                                        </div>
                                                        <div className={styles.value}>{val.transaction_id}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('storecredit:adjustment')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('storecredit:adjustment')}</b>
                                                        </div>
                                                        <div className={styles.value}>
                                                            <div className={val.store_credit_adjustment.value < 0
                                                                ? styles.textRed : styles.textGreen}
                                                            >
                                                                {formatPrice(
                                                                    val.store_credit_adjustment.value,
                                                                    val.store_credit_adjustment.currency,
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('storecredit:creditbalance')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('storecredit:creditbalance')}</b>
                                                        </div>
                                                        <div className={styles.value}>
                                                            {formatPrice(val.store_credit_balance.value, val.store_credit_balance.currency)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('storecredit:comment')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('storecredit:comment')}</b>
                                                        </div>
                                                        <div className={styles.value}>{val.comment}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('storecredit:transactionDate')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('storecredit:transactionDate')}</b>
                                                        </div>
                                                        <div className={styles.value}>{formatDate(val.transaction_date_time)}</div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                colSpan={5}
                                                count={storeCredit.transaction_history.total_count}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'rows per page' },
                                                    native: true,
                                                }}
                                                onChangePage={handlePage}
                                                onChangeRowsPerPage={handleRowsPerPage}
                                            />
                                        </TableRow>
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Alert severity="warning">{t('storecredit:emptyMessage')}</Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Layout>
    );
};

export default StoreCreditPage;
