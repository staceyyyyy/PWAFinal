import Button from '@common_button';
import Typography from '@common_typography';
import formatDate from '@helper_date';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import Router from 'next/router';
import Layout from '@layout_customer';
import useStyles from '@core_modules/rma/pages/history/components/styles';

const HistoryContent = (props) => {
    const {
        loading, data, error, t, pageSize, page, handleChangePage, handleChangePageSize, Loader, WarningInfo,
    } = props;
    const styles = useStyles();

    if (error) {
        return (
            <Layout {...props} title={t('customer:menu:return')}>
                <WarningInfo variant="error" text={t('rma:error:fetch')} />
            </Layout>
        );
    }

    if (loading || !data) {
        return <Layout {...props}><Loader /></Layout>;
    }

    if (!loading && data) {
        if (data.getCustomerRequestAwRma.items.length === 0) {
            return (
                <Layout {...props} title={t('customer:menu:return')}>
                    <WarningInfo variant="warning" text={t('rma:error:notFound')} />
                </Layout>
            );
        }
    }
    return (
        <Layout {...props}>
            <div className={styles.tableOuterContainer}>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left">{t('rma:table:returnId')}</TableCell>
                                <TableCell align="left">{t('rma:table:orderId')}</TableCell>
                                <TableCell align="left">{t('rma:table:products')}</TableCell>
                                <TableCell align="left">{t('rma:table:status')}</TableCell>
                                <TableCell align="left">{t('rma:table:createdAt')}</TableCell>
                                <TableCell align="left">{t('rma:table:updatedAt')}</TableCell>
                                <TableCell align="left">{t('rma:table:actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && data.getCustomerRequestAwRma.items.length > 0 ? (
                                <>
                                    {
                                        data.getCustomerRequestAwRma.items.map((val, index) => (
                                            <TableRow className={styles.tableRowResponsive} key={index}>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:returnId')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:returnId')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>{val.increment_id}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:orderId')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:orderId')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>{val.order_number}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:products')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:products')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>
                                                            {
                                                                val.items.map((item) => `${item.name}, `)
                                                            }
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:status')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:status')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>{val.status.name}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:createdAt')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:createdAt')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>{formatDate() }</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:updatedAt')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:updatedAt')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>
                                                            {formatDate() }
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:actions')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rma:table:actions')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>
                                                            <Button
                                                                variant="text"
                                                                className="clear-margin-padding text-center"
                                                                onClick={() => Router.push(
                                                                    '/rma/customer/view/id/[id]',
                                                                    `/rma/customer/view/id/${val.increment_id}`,
                                                                )}
                                                                align="left"
                                                            >
                                                                <Typography
                                                                    className="clear-margin-padding"
                                                                    variant="span"
                                                                    decoration="underline"
                                                                >
                                                                    {t('rma:table:view')}
                                                                </Typography>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>

                                        ))
                                    }
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                            colSpan={7}
                                            count={data.getCustomerRequestAwRma.total_count || 0}
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
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Alert severity="warning">{t('rma:empty')}</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};

export default HistoryContent;
