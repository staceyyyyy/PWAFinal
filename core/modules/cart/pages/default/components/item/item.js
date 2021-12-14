import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import { features } from '@config';
import Image from '@common_image';
import Typography from '@common_typography';
import useStyles from '@core_modules/cart/pages/default/components/style';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';

const ItemView = (props) => {
    const {
        t, confirmDel, handleDelete, setConfirmDel,
        product, configurable_options, quantity, prices, handleAddWishlist,
        editMode, toggleEditDrawer, bundle_options, links, customizable_options,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.item}>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={() => setConfirmDel(false)}
            />
            <div className={styles.itemImgWrapper}>
                <Image
                    src={product.small_image.url}
                    className={styles.itemImg}
                    alt={product.name}
                    width={features.imageSize.product.width}
                    height={features.imageSize.product.height}
                    quality={80}
                />
                {
                    prices.price.value === 0 ? (
                        <span>{t('common:title:free')}</span>
                    ) : null
                }
            </div>
            <div className={styles.itemInfo}>
                <Link
                    href="/[...slug]"
                    as={`/${product.url_key}`}
                >
                    <a className={styles.itemName}>{product.name}</a>
                </Link>
                <div className={styles.itemVariant}>
                    {configurable_options && configurable_options.length > 0 ? <div>{t('common:variant')}</div> : null}
                    { configurable_options ? configurable_options.map((item, idx) => (
                        <div key={idx}>
                            {item.option_label}
                            {' '}
                            :
                            {' '}
                            {item.value_label}
                        </div>
                    )) : null}
                    {
                        links && links.length > 0 && (
                            <div className="col-xs-12 row option-link-mobile">
                                <Typography variant="span" letter="capitalize" type="bold">
                                    Downloads :
                                    {' '}
                                </Typography>
                                <div className="column">
                                    { links.map((item, idx) => (
                                        <Typography variant="span" letter="capitalize" key={idx}>
                                            {item.title}
                                        </Typography>
                                    )) }
                                </div>
                            </div>
                        )
                    }
                    {bundle_options && bundle_options.length ? (
                        <div className="product-options">
                            {bundle_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.label}</strong>
                                    {' '}
                                    :
                                    <div className="option-wrapper__item">
                                        {val.values.map((item, idt) => (
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
                    {customizable_options && customizable_options.length ? (
                        <div className="product-options">
                            {customizable_options.map((op, idx) => (
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
                    <div>
                        Qty :
                        {' '}
                        {quantity}
                    </div>
                </div>
                {product.stock_status === 'OUT_OF_STOCK' && (
                    <Alert severity="error" className="alert m-15">
                        { t('cart:oos') }
                    </Alert>
                )}
                <div className={styles.itemPrice}>
                    {formatPrice(prices.price_including_tax.value, prices.price_including_tax.currency)}
                </div>
            </div>

            <div className={styles.itemActions}>
                <Zoom
                    in={editMode}
                    style={{ transitionDelay: editMode ? '0ms' : '100ms' }}
                >
                    <IconButton
                        className={styles.iconBtn}
                        onClick={toggleEditDrawer}
                    >
                        <CreateOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={editMode}
                    style={{ transitionDelay: editMode ? '50ms' : '50ms' }}
                >
                    <IconButton className={styles.iconBtn} onClick={handleAddWishlist}>
                        <FavoriteBorderOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={editMode}
                    onClick={() => setConfirmDel(true)}
                    style={{ transitionDelay: editMode ? '100ms' : '0ms' }}
                >
                    <IconButton className={styles.iconBtn}>
                        <DeleteOutlineOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
            </div>
        </div>
    );
};

export default ItemView;
