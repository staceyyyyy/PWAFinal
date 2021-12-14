/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import Thumbor from '@common_image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatPrice } from '@helper_currency';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from '@plugin_summary/components/DesktopSummary/style';
import PaypalButtonView from '@plugin_paypalbutton';

const Summary = (props) => {
    const {
        t, summary, handleActionSummary = () => { }, loading, disabled,
        showItems = false, items = [], hideButton = false, isDesktop,
        isLoader, deleteCart, updateCart, withAction, withLabel = true,
        labelItemAlign = 'left', dataCart,
    } = props;
    const styles = useStyles();
    const [openItem, setOpenItem] = React.useState(false);
    const Loader = () => (
        <div id="desktopSummary" className={isDesktop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            <Typography variant="h1" type="regular" letter="capitalize">
                {t('common:summary:title')}
            </Typography>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <ListItemText primary={<Typography variant="title" type="bold">Total</Typography>} />
                <Skeleton variant="rect" width="60%" height="30px" animation="wave" />
            </ListItem>
        </div>
    );
    if (isLoader) {
        return <Loader />;
    }

    return (
        <div id="desktopSummary" className={isDesktop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            { withLabel && (
                <Typography variant="h1" type="regular" letter="capitalize">
                    {t('common:summary:title')}
                </Typography>
            ) }
            {
                showItems ? (
                    <>
                        <div className={classNames('row between-xs')} onClick={() => setOpenItem(!openItem)}>
                            <div className="col-xs-6">
                                <Typography variant="span">{`${items.length} items in Cart`}</Typography>
                            </div>
                            <div className="col-xs-2">
                                {
                                    openItem ? (<ExpandLess />) : (<ExpandMore />)
                                }
                            </div>
                        </div>
                        {
                            openItem ? (
                                <div className={classNames('row')}>
                                    {
                                        items.map((item, index) => (
                                            <div
                                                id="listItemProductSummary"
                                                className={classNames('col-xs-12 row between-xs', styles.list, styles.listProduct)}
                                                key={index}
                                            >
                                                { withAction && (
                                                    <div
                                                        className="delete"
                                                        onClick={() => {
                                                            deleteCart(item.id);
                                                        }}
                                                    >
                                                        x
                                                    </div>
                                                )}
                                                <div className="col-xs-4">
                                                    <Thumbor
                                                        className="product-image-photo"
                                                        src={item.product.small_image.url}
                                                        alt={item.product.name}
                                                        width={61}
                                                        height={75}
                                                    />
                                                </div>
                                                <div className={classNames('col-xs-8', styles.bodyProductItem)}>
                                                    <Typography variant="span">{item.product.name}</Typography>
                                                    <div className="flex-grow" />
                                                    {
                                                        withAction && (
                                                            <div>
                                                                <span
                                                                    className="item-minus qty-update"
                                                                    onClick={() => {
                                                                        if (item.quantity > 1) {
                                                                            updateCart(item.id, item.quantity - 1);
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="item-count">{item.quantity}</span>

                                                                <span
                                                                    className="item-plus qty-update"
                                                                    onClick={() => {
                                                                        updateCart(item.id, item.quantity + 1);
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <Typography variant="span" size="14" letter="uppercase">
                                                        {item.prices.row_total.value === 0
                                                            ? t('common:title:free')
                                                            : formatPrice(
                                                                item.prices.row_total.value,
                                                                item.prices.row_total.currency || 'IDR',
                                                            )}
                                                    </Typography>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </>
                )
                    : null
            }
            <List>
                {
                    summary.data.map((dt, index) => (
                        <ListItem className={classNames(styles.list, 'listSummary')} key={index}>
                            <ListItemText
                                className={styles.labelItem}
                                primary={<Typography variant="p" letter="capitalize" size="12" align={labelItemAlign}>{dt.item}</Typography>}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="span" type="regular">
                                    {dt.value}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
                <ListItem className={classNames(styles.list, 'listSummary')}>
                    <ListItemText
                        className={styles.labelItem}
                        primary={<Typography variant="title" type="bold" align={labelItemAlign}>Total</Typography>}
                    />
                    <ListItemSecondaryAction>
                        <Typography variant="title" type="bold">
                            {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency) : null}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <div className={styles.footer}>
                {
                    !hideButton ? (
                        <Button loading={loading} disabled={disabled} className={styles.btnCheckout} onClick={handleActionSummary}>
                            <Typography variant="span" color="white" type="bold" letter="uppercase">
                                {t('common:button:checkout')}
                            </Typography>
                        </Button>
                    ) : null
                }
                {
                    !hideButton && dataCart && (
                        <div className={styles.paypalBtn}>
                            <PaypalButtonView cart={dataCart} t={t} />
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default Summary;
