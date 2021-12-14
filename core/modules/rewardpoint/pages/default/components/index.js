import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@common_typography';
import Link from 'next/link';
import formatDate from '@helper_date';
import Alert from '@material-ui/lab/Alert';
import Layout from '@layout_customer';
import useStyles from '@core_modules/rewardpoint/pages/default/style';

const DefaultView = (props) => {
    const styles = useStyles();
    const {
        data, t, loading, getPath, getId, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage,
    } = props;
    return (
        <Layout {...props}>
            <div className={styles.container}>
                <Typography variant="p">
                    {t('rewardpoint:balanceTitle')}
                    {' '}
                    <Typography variant="span" type="bold">{data.balance || 0}</Typography>
                </Typography>
                <Typography variant="p">
                    {t('rewardpoint:canbeTitle')}
                    {' '}
                    <Typography variant="span" type="bold">{data.formatedBalanceCurrency || ''}</Typography>
                </Typography>
                <Typography variant="p">
                    {t('rewardpoint:learnMore').split('$')[0]}
                    <Link href="/[...slug]" as="/aw-reward-points">
                        <a>
                            <Typography variant="span" type="bold">
                                {t('rewardpoint:learnMore').split('$')[1]}
                            </Typography>
                        </a>
                    </Link>
                </Typography>
                <div className={styles.tableOuterContainer}>
                    <TableContainer component={Paper} className={styles.tableContainer}>
                        <Table className={styles.table} aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">{t('rewardpoint:transactionId')}</TableCell>
                                    <TableCell align="left">{t('rewardpoint:balance')}</TableCell>
                                    <TableCell align="left">{t('rewardpoint:comment')}</TableCell>
                                    <TableCell align="left">{t('rewardpoint:expired')}</TableCell>
                                    <TableCell align="left">{t('rewardpoint:point')}</TableCell>
                                    <TableCell align="left">{t('rewardpoint:transactionDate')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!loading && data.transaction_history.items.length > 0 ? (
                                    <>
                                        {data.transaction_history.items.map((val, idx) => (
                                            <TableRow key={idx} className={styles.tableRowResponsive}>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rewardpoint:transactionId')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rewardpoint:transactionId')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>{val.transactionId}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rewardpoint:balance')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rewardpoint:balance')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>{val.balance}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rewardpoint:comment')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rewardpoint:comment')}
                                                            </Typography>
                                                        </div>
                                                        {
                                                            (val.comment.split('<a').length > 1 && val.comment.includes('/sales/order/view/order_id'))
                                                                ? (
                                                                    <div
                                                                        className={styles.value}
                                                                        // eslint-disable-next-line react/no-danger
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: `${val.comment.split('<a')[0]} 
                                                                            <a href="${getPath(val.comment)}">#${getId(val.comment)}</a>
                                                                            `,
                                                                        }}
                                                                    />
                                                                )
                                                                // eslint-disable-next-line react/no-danger
                                                                : (<div className={styles.value} dangerouslySetInnerHTML={{ __html: val.comment }} />)
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rewardpoint:expired')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rewardpoint:expired')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>
                                                            {val.expirationDate ? formatDate(val.expirationDate) : '-'}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rewardpoint:point')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rewardpoint:point')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>
                                                            <div className={val.points < 0 ? styles.textRed : styles.textGreen}>
                                                                {val.points < 0 ? `${val.points}` : `+${val.points}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={(
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rewardpoint:transactionDate')}
                                                        </Typography>
                                                    )}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('rewardpoint:transactionDate')}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles.value}>
                                                            {val.transactionDate ? formatDate(val.transactionDate) : '-'}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                colSpan={6}
                                                count={data.transaction_history.total_count || 0}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                labelRowsPerPage="Limit"
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'rows per page' },
                                                    native: true,
                                                }}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                            />
                                        </TableRow>
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Alert severity="warning">{t('rewardpoint:emptyMessage')}</Alert>
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

export default DefaultView;
