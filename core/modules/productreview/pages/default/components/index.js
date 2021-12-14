/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import RatingStar from '@common_ratingstar';
import Button from '@common_button';
import Link from 'next/link';
import useStyles from '@core_modules/productreview/pages/default/components/style';
import SkeletonProductReview from '@core_modules/productreview/pages/default/components/skeleton';
import DetailProductReview from '@core_modules/productreview/pages/default/components/detail';

const ProductReviewPage = (props) => {
    const styles = useStyles();
    const {
        t,
        reviewCustomer,
        loading,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage,
    } = props;

    const [isOpenDetail, setOpenDetail] = React.useState(false);
    const [reviewItem, setReviewItem] = React.useState(null);
    const handlePage = (event) => {
        handleChangePage(parseInt(event.target.value));
    };

    const handleRowsPerPage = (event) => {
        handleChangeRowsPerPage(parseInt(event.target.value, 10));
    };

    const openDetail = (state, val = null) => {
        setOpenDetail(state);
        setReviewItem(val);
    };
    return (
        <Layout {...props}>
            <div className={styles.container}>
                <DetailProductReview
                    open={isOpenDetail}
                    setOpen={() => openDetail(false)}
                    reviewItem={reviewItem}
                    {...props}
                />
                <div className={styles.tableOuterContainer}>
                    <TableContainer component={Paper} className={styles.tableContainer}>
                        <Table className={styles.table} aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">{t('productreview:created')}</TableCell>
                                    <TableCell align="left">{t('productreview:productName')}</TableCell>
                                    <TableCell align="left">{t('productreview:rating')}</TableCell>
                                    <TableCell align="left">{t('productreview:review')}</TableCell>
                                    <TableCell align="left" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading || !reviewCustomer ? (
                                    <SkeletonProductReview />
                                ) : reviewCustomer && reviewCustomer.items.length > 0 ? (
                                    <>
                                        {reviewCustomer.items.map((val, idx) => (
                                            <TableRow key={idx} className={styles.tableRowResponsive}>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('productreview:created')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('productreview:created')}</b>
                                                        </div>
                                                        <div className={styles.value}>{formatDate(val.created_at, 'DD/MM/YY')}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('productreview:productName')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('productreview:productName')}</b>
                                                        </div>
                                                        <div className={styles.value}>
                                                            <Link href={`/${val.product.url_key}`}>
                                                                {val.product.name}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('productreview:rating')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('productreview:rating')}</b>
                                                        </div>
                                                        <div className={styles.value}>
                                                            <RatingStar value={
                                                                val.ratings_breakdown.length > 0
                                                                    ? val.ratings_breakdown[0].value : 0
                                                            }
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('productreview:review')}
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.mobLabel}>
                                                            <b>{t('productreview:review')}</b>
                                                        </div>
                                                        <div className={styles.value}>{val.text}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th="Action"
                                                >
                                                    <div className={styles.displayFlexRow}>
                                                        <div className={styles.seeDetails}>
                                                            <Button
                                                                variant="text"
                                                                style={{
                                                                    textTransform: 'capitalize',
                                                                    fontWeight: 'normal',
                                                                }}
                                                                onClick={() => openDetail(true, val)}
                                                            >
                                                                {t('productreview:seeDetails')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                colSpan={5}
                                                count={reviewCustomer.items.length}
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

export default ProductReviewPage;
