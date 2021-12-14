import React from 'react';
import useStyles from '@core_modules/paypal/pages/review/components/ListItemCart/style';
import Typography from '@common_typography';
import Link from 'next/link';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatPrice } from '@helper_currency';
import Image from '@common_image';
import { features } from '@config';
import { SkeletonTable } from '@core_modules/paypal/pages/review/components/Skeleton';

const ListItemCart = (props) => {
    const styles = useStyles();
    const { t, checkout } = props;
    let data = [];
    if (checkout.cart && checkout.cart.items && checkout.cart.items.length > 0) {
        data = checkout.cart.items;
    }
    return (
        <div className={classNames('row', styles.containerItem)}>
            <div className={classNames('col-xs-12', styles.labelTitle)}>
                <Typography variant="h5">
                    {t('checkout:paypal:itemsCart')}
                </Typography>
                <Link href="/checkout/cart">
                    <a>
                        <Typography variant="span">
                            {t('checkout:paypal:editCart')}
                        </Typography>
                    </a>
                </Link>
            </div>
            <div className="col-xs-12">
                {
                    checkout.loading.all ? (<SkeletonTable />) : (
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data.length > 0 && (
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
                                                                                            {(item.label && item.label !== '')
                                                                                                ? item.label : item.value}
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
                                                                <Typography variant="span" align="right" letter="capitalize" type="semiBold">
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
                                                                <Typography variant="span" align="right" letter="capitalize" type="semiBold">
                                                                    {formatPrice(
                                                                        val.prices.row_total_including_tax.value,
                                                                        val.prices.row_total_including_tax.currency,
                                                                    )}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
            </div>

        </div>
    );
};

export default ListItemCart;
