import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import Link from 'next/link';
import Image from '@common_image';
import { features } from '@config';
import useStyles from '@core_modules/cart/pages/default/components/item/TableListItem/style';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';

const TableListProduct = ({
    data, t, deleteItem, handleFeed, toggleEditDrawer,
}) => {
    const styles = useStyles();
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);
    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: selectDelete.id,
            product: selectDelete.product,
            quantity: selectDelete.quantity,
            prices: selectDelete.prices,
        });
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    const handleAddWishlist = (item) => {
        handleFeed(item);
    };

    const openEdit = (item) => {
        toggleEditDrawer({
            id: item.id,
            quantity: item.quantity,
            product_name: item.product.name,
        });
    };

    return (
        <>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={cancelDelete}
            />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" colSpan={2}>
                                <Typography variant="span" type="bold">
                                    Item
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
                            {/* <TableCell align="center">
                                <Typography variant="span" type="bold">
                                    {t('common:title:action')}
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            <>
                                {
                                    data.map((val, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow className={styles.tableRowResponsive} key={index}>
                                                <TableCell
                                                    align="center"
                                                    rowSpan={2}
                                                >
                                                    <div className={styles.productImgContainer}>
                                                        <Link
                                                            href="/[...slug]"
                                                            as={`/${val.product.url_key}`}
                                                        >
                                                            <a>
                                                                <Image
                                                                    src={val.product.small_image.url}
                                                                    className={styles.productImg}
                                                                    alt={val.product.name}
                                                                    width={features.imageSize.product.width}
                                                                    height={features.imageSize.product.height}
                                                                    quality={80}
                                                                />
                                                            </a>
                                                        </Link>
                                                        {
                                                            val.prices.price.value === 0 ? (
                                                                <span>Free</span>
                                                            ) : null
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={styles.noBorder}
                                                >
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <Link
                                                                href="/[...slug]"
                                                                as={`/${val.product.url_key}`}
                                                            >
                                                                <a>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {val.product.name}
                                                                    </Typography>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className="col-xs-12 column">
                                                            { val.configurable_options ? val.configurable_options.map((item, idx) => (
                                                                <Typography variant="span" letter="capitalize" key={idx}>
                                                                    <strong>{item.option_label}</strong>
                                                                    {' '}
                                                                    :
                                                                    {' '}
                                                                    {item.value_label}
                                                                </Typography>
                                                            )) : null}
                                                        </div>
                                                        {
                                                            val.links && val.links.length > 0 && (
                                                                <div className="col-xs-12 row option-link">
                                                                    <Typography variant="span" letter="capitalize" type="bold">
                                                                        Downloads :
                                                                        {' '}
                                                                    </Typography>
                                                                    <div className="column">
                                                                        { val.links.map((item, idx) => (
                                                                            <Typography variant="span" letter="capitalize" key={idx}>
                                                                                {item.title}
                                                                            </Typography>
                                                                        )) }
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    {val.bundle_options && val.bundle_options.length ? (
                                                        <div className="product-options">
                                                            {val.bundle_options.map((value, idx) => (
                                                                <div className="option-wrapper" key={idx}>
                                                                    <strong>{value.label}</strong>
                                                                    {' '}
                                                                    :
                                                                    <div className="option-wrapper__item">
                                                                        {value.values.map((item, idt) => (
                                                                            <div key={idt}>
                                                                                {item.quantity}
                                                                                {' '}
                                                                                x
                                                                                {item.label}
                                                                                {' '}
                                                                                <strong>
                                                                                    + $
                                                                                    {item.price}
                                                                                </strong>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                    {val.bundle_options && val.bundle_options.length ? (
                                                        <div className="product-options">
                                                            {val.bundle_options.map((bundle, idb) => (
                                                                <div className="option-wrapper" key={idb}>
                                                                    <strong>{bundle.label}</strong>
                                                                    {' '}
                                                                    :
                                                                    <div className="option-wrapper__item">
                                                                        {bundle.values.map((item, idt) => (
                                                                            <div key={idt}>
                                                                                {item.quantity}
                                                                                {' '}
                                                                                x
                                                                                {item.label}
                                                                                {' '}
                                                                                <strong>
                                                                                    + $
                                                                                    {item.price}
                                                                                </strong>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                    {val.customizable_options && val.customizable_options.length ? (
                                                        <div className="product-options">
                                                            {val.customizable_options.map((op, idx) => (
                                                                <div className="option-wrapper" key={idx}>
                                                                    <div className="row option-wrapper__item">
                                                                        <strong>
                                                                            {op.label}
                                                                            {' '}
                                                                            :
                                                                        </strong>
                                                                        {op.values.map((item, idt) => (
                                                                            <p key={idt} className="option-item">
                                                                                {(item.label && item.label !== '') ? item.label : item.value}
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={styles.noBorder}
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {formatPrice(
                                                            val.prices.row_total_including_tax.value,
                                                            val.prices.row_total_including_tax.currency || 'IDR',
                                                        )}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={styles.noBorder}
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {val.quantity}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={styles.noBorder}
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {formatPrice(
                                                            val.prices.row_total_including_tax.value,
                                                            val.prices.row_total_including_tax.currency,
                                                        )}
                                                    </Typography>
                                                </TableCell>
                                                {/* <TableCell
                                                align="center"
                                            >
                                                <div className="row center-xs" style={{ maxWidth: 100 }}>
                                                    <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                        <IconButton
                                                            className={styles.iconBtn}
                                                            onClick={() => openEdit(val)}
                                                        >
                                                            <CreateOutlined className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                    <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                        <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                            <FavoriteBorderOutlined className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                    <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                        <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                            <DeleteOutlineOutlined className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </TableCell> */}
                                            </TableRow>
                                            <TableRow>
                                                {(val && val.product.stock_status === 'OUT_OF_STOCK') ? (
                                                    <>
                                                        <TableCell colSpan={3}>
                                                            <Alert severity="error" style={{ width: '11vw' }}>
                                                                {t('cart:oos')}
                                                            </Alert>
                                                        </TableCell>
                                                    </>
                                                ) : (<TableCell colSpan={3} />)}
                                                <TableCell
                                                    align="right"
                                                >
                                                    <div>
                                                        <IconButton
                                                            className={styles.iconBtn}
                                                            onClick={() => openEdit(val)}
                                                        >
                                                            <CreateOutlined fontSize="small" className={styles.icon} />
                                                        </IconButton>
                                                        <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                            <FavoriteBorderOutlined fontSize="small" className={styles.icon} />
                                                        </IconButton>
                                                        <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                            <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
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
        </>
    );
};

export default TableListProduct;
