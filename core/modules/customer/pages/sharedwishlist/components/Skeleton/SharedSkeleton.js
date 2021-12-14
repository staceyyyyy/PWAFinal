import Skeleton from '@common_skeleton';
import useStyles from '@core_modules/customer/pages/sharedwishlist/components/style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

const SharedSkeleteon = ({ t }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left">
                                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            <TableRow className={styles.tableRowResponsive}>
                                <TableCell
                                    className={styles.tableCellResponsiveProduct}
                                    align="left"
                                    data-th={t('customer:wishlist:product')}
                                >
                                    <div className={styles.productItem}>
                                        <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" height="200px" width="80%" animation="wave" />
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={styles.tableCellResponsive}
                                    align="left"
                                    data-th={t('customer:wishlist:addToCart')}
                                >
                                    <div className={styles.productAction}>
                                        <div>
                                            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={styles.footerWishlist}>
                <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" height="50px" width="20%" animation="wave" />
            </div>
        </div>
    );
};

export default SharedSkeleteon;
