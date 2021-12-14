import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/order/pages/detail/components/TableListItem/style';

const TableListProduct = ({
    data, t, currency,
}) => {
    const styles = useStyles();
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                #
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                {t('common:product:titleProduct')}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                SKU
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {t('common:title:price')}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {t('common:title:shortQty')}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {t('common:subtotal')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        <>
                            {
                                data.map((val, index) => (
                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                        <TableCell
                                            align="center"
                                        >
                                            <div className={styles.productImgContainer}>
                                                <img
                                                    src={val.image_url || '/assets/img/placeholder.png'}
                                                    className={styles.productImg}
                                                    alt={val.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.sku}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(val.price_incl_tax, currency)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {val.qty_ordered}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(val.row_total_incl_tax, currency)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Alert severity="warning">{t('order:notFound')}</Alert>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableListProduct;
