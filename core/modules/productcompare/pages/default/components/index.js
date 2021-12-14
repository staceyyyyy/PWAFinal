/* eslint-disable max-len */
import React from 'react';
import useStyles from '@core_modules/productcompare/pages/default/components/style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import ProductItem from '@plugin_productitem';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import Typography from '@common_typography';
import ClearIcon from '@material-ui/icons/Clear';
import Empty from '@core_modules/productcompare/pages/default/components/empty';
import classNames from 'classnames';

const Content = (props) => {
    const styles = useStyles();
    const { t, handleRemoveProduct, compareList } = props;
    const [columnWidth, setColumnWidth] = React.useState(null);
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);

    React.useEffect(() => {
        if (!columnWidth && compareList) {
            const getWidht = typeof window !== 'undefined'
                ? window.innerWidth / (compareList.compareList.items.length + 1)
                : `${100 / (compareList.compareList.items.length + 1)}%`;
            setColumnWidth(getWidht);
        }
    }, [columnWidth, compareList]);

    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        handleRemoveProduct(selectDelete.uid);
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    if (compareList.compareList.items.length === 0) {
        console.log('hereee 222', compareList);
        return <Empty t={t} />;
    }

    /* eslint-disable */
    return (
        <div>
            <Typography type="bold" variant="h1" className={styles.title} align="left">
                {t('common:productCompare:title')}
            </Typography>
            <div className={styles.container}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow tabIndex={-1}>
                                <TableCell className={classNames('hidden-mobile', styles.stickyColumn)} style={{ width: columnWidth }}>
                                    {' '}
                                </TableCell>
                                {compareList.compareList.items.map((productCompare) => {
                                    const { product, product_id } = productCompare;
                                    return (
                                        <TableCell
                                            align="center"
                                            className={classNames(styles.column, styles.productColumn)}
                                            style={{ width: columnWidth }}
                                        >
                                            <div className={styles.productImage}>
                                                <ProductItem {...product} enableProductCompare={false} />
                                                <ClearIcon className="clearIcon" onClick={() => confirmDelete(productCompare)} />
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody className={styles.tableBody}>
                            <TableRow>
                                <TableCell className={classNames('hidden-mobile', styles.stickyColumn)} style={{ width: columnWidth }}>
                                    <Typography style={{ width: columnWidth, textTransform: 'uppercase' }}>
                                        {t('common:productCompare:label:sku')}
                                    </Typography>
                                </TableCell>
                                {compareList.compareList.items.map((productCompare) => {
                                    const { product } = productCompare;
                                    return (
                                        <TableCell className={styles.column} style={{ width: columnWidth }}>
                                            <Typography
                                                type="bold"
                                                variant="p"
                                                className={classNames('column__title hidden-desktop sku', styles.sku)}
                                            >
                                                {t('common:productCompare:label:sku')}
                                            </Typography>

                                            {product.sku}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell className={classNames('hidden-mobile', styles.stickyColumn)} style={{ width: columnWidth }}>
                                    {t('common:productCompare:label:description')}
                                </TableCell>
                                {compareList.compareList.items.map((productCompare) => {
                                    const { product } = productCompare;
                                    return (
                                        <TableCell className={styles.column} style={{ width: columnWidth }}>
                                            <Typography type="bold" variant="p" className="column__title hidden-desktop">
                                                {t('common:productCompare:label:description')}
                                            </Typography>
                                            <div
                                                className="description-item"
                                                style={{ width: columnWidth }}
                                                dangerouslySetInnerHTML={{ __html: product.description.html }}
                                            />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell className={classNames('hidden-mobile', styles.stickyColumn)} style={{ width: columnWidth }}>
                                    {t('common:productCompare:label:shortDescription')}
                                </TableCell>
                                {compareList.compareList.items.map((productCompare) => {
                                    const { product } = productCompare;
                                    return (
                                        <TableCell className={styles.column} style={{ width: columnWidth }}>
                                            <Typography type="bold" variant="p" className="column__title hidden-desktop">
                                                {t('common:productCompare:label:shortDescription')}
                                            </Typography>

                                            <div dangerouslySetInnerHTML={{ __html: product.short_description.html }} />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell className={classNames('hidden-mobile', styles.stickyColumn)} style={{ width: columnWidth }}>
                                    {t('common:productCompare:label:brand')}
                                </TableCell>
                                {compareList.compareList.items.map(() => (
                                    <TableCell className={styles.column} style={{ width: columnWidth }}>
                                        <Typography type="bold" variant="p" className="column__title hidden-desktop">
                                            {t('common:productCompare:label:brand')}
                                        </Typography>{' '}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={cancelDelete} />
            </div>
        </div>
    );
    /* eslint-enable */
};

export default Content;
