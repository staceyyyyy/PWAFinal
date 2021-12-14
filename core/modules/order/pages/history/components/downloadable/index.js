/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint max-len: ["error", { "code": 180 }] */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Link from 'next/link';
import useStyles from '@core_modules/order/pages/history/style';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';

const DefaultView = (props) => {
    const {
        data, t,
        loadMore,
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
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:titleDownload')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:status')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:remaining')}</Typography></TableCell>
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
                                    : data.length > 0
                                        ? (
                                            <>
                                                {
                                                    data.map((val, index) => (
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
                                                                            <Link
                                                                                href="/sales/order/view/order_id/[id]"
                                                                                as={`/sales/order/view/order_id/${val.order_increment_id}`}
                                                                            >
                                                                                <a>
                                                                                    <Typography variant="span" type="regular" decoration="underline">
                                                                                        {val.order_increment_id}
                                                                                    </Typography>
                                                                                </a>
                                                                            </Link>
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
                                                                            {formatDate(val.date, 'M/DD/YY')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:title')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:title')}`}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={classNames(styles.valueDownload)}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {val.title}
                                                                        </Typography>
                                                                        { val.status == 'available'
                                                                        && (
                                                                            <a
                                                                                download
                                                                                className={styles.linkDownload}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                href={val.download_url}
                                                                            >
                                                                                <Button
                                                                                    variant="text"
                                                                                    startIcon={<GetAppIcon color="action" />}
                                                                                    size="small"
                                                                                    disableRipple
                                                                                >
                                                                                    <Typography variant="span" letter="capitalize">
                                                                                        {val.link_title}
                                                                                    </Typography>
                                                                                </Button>
                                                                            </a>
                                                                        )}
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
                                                                            {val.status}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        Remaining Downloads
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            Remaining Downloads
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {val.remaining_downloads}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                {/* <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                    colSpan={6}
                                                    count={data.length || 0}
                                                    rowsPerPage={10}
                                                    page={0}
                                                    labelRowsPerPage="Limit"
                                                    SelectProps={{
                                                        inputProps: { 'aria-label': 'rows per page' },
                                                        native: true,
                                                    }}
                                                    onChangePage={handleChangePage}
                                                    onChangeRowsPerPage={handleChangePageSize}
                                                />
                                            </TableRow> */}
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
