import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import formatDate from '@helper_date';
import useStyles from '@core_modules/rma/pages/detail/components/styles';

const DetailComponents = ({ detail_rma, t }) => {
    const styles = useStyles();
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow className={styles.tableRowResponsive}>
                        <TableCell
                            className={styles.tableCellResponsive}
                            align="left"
                        >
                            <div className={styles.displayFlexRow}>
                                <div className={styles.mobLabel}>
                                    <b>Status</b>
                                </div>
                                <div className={styles.value}>{detail_rma.status.name}</div>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRowResponsive}>
                        <TableCell
                            className={styles.tableCellResponsive}
                            align="left"
                        >
                            <div className={styles.displayFlexRow}>
                                <div className={styles.mobLabel}>
                                    <b>{t('rma:view:orderDate')}</b>
                                </div>
                                <div className={styles.value}>{formatDate(detail_rma.order_date)}</div>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRowResponsive}>
                        <TableCell
                            className={styles.tableCellResponsive}
                            align="left"
                        >
                            <div className={styles.displayFlexRow}>
                                <div className={styles.mobLabel}>
                                    <b>Order</b>
                                </div>
                                <div className={styles.value}>
                                    #
                                    {detail_rma.order_number}
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRowResponsive}>
                        <TableCell
                            className={styles.tableCellResponsive}
                            align="left"
                        >
                            <div className={styles.displayFlexRow}>
                                <div className={styles.mobLabel}>
                                    <b>{t('rma:view:myAddress')}</b>
                                </div>
                                <div className={styles.value}>
                                    {detail_rma.customer_address.firstname || ''}
                                    <br />
                                    {detail_rma.customer_address.street || ''}
                                    <br />
                                    {detail_rma.customer_address.city || ''}
                                    <br />
                                    {detail_rma.customer_address.region || ''}
                                    <br />
                                    {detail_rma.customer_address.country_id || ''}
                                    <br />
                                    {detail_rma.customer_address.telephone || ''}
                                    <br />
                                    {detail_rma.customer_address.postcode || ''}
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DetailComponents;
