import Typography from '@common_typography';
import formatDate from '@helper_date';
import Link from 'next/link';
import { formatPrice } from '@helper_currency';
import useStyles from '@core_modules/order/pages/history/style';

const ItemOrder = ({
    status_label, order_number, detail, t, created_at,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <div className={styles.contentItem}>
                <Typography variant="p" type="bold">
                    {status_label}
                </Typography>
                <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${order_number}`}>
                    <a>
                        <Typography variant="title" type="regular">
                            #
                            {order_number}
                        </Typography>
                    </a>
                </Link>
                <div className={styles.detailItem}>
                    <div className={`column ${styles.columnLabel}`}>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            {t('order:date')}
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            {t('order:totalItems')}
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            Total
                        </Typography>
                    </div>
                    <div className={styles.detailContent}>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            {formatDate(created_at)}
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            { detail[0].items.length }
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            { formatPrice(detail[0].grand_total, detail[0].global_currency_code) }
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemOrder;
