import useStyles from '@plugin_minicart/components/style';
import Item from '@plugin_minicart/components/product/item';

const ItemCart = (props) => {
    const styles = useStyles();
    const {
        data, deleteCart, updateCart, t,
    } = props;
    if (data.length === 0) {
        return <div className={styles.emptyCart}>{t('common:cart:emptyCart')}</div>;
    }
    const heightFinal = window.innerHeight - 200;
    return (
        <ol className={styles.miniCartItems} style={{ height: heightFinal }}>
            {data.map((val, idx) => (
                <Item {...val} key={idx} deleteCart={deleteCart} updateCart={updateCart} />
            ))}
        </ol>
    );
};

export default ItemCart;
