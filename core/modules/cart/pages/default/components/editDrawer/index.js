import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@common_typography';
import Button from '@common_button';
import ButtonQty from '@common_buttonqty';
import useStyles from '@core_modules/cart/pages/default/components/editDrawer/style';

const EditDrawer = ({
    t, open, toggleOpen, id, quantity = 1, product_name = '', updateItem,
}) => {
    const styles = useStyles();
    const [qty, setQty] = React.useState(quantity);

    React.useEffect(() => {
        setQty(quantity);
    }, [quantity]);
    const toggleDrawer = (anchor, _open) => (event) => {
        if (
            event
            && event.type === 'keydown'
            && (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        toggleOpen(!_open);
    };
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer('bottom', false)}
            onOpen={toggleDrawer('bottom', true)}
        >
            <div className={styles.container}>
                <Typography variant="title" type="regular" align="center">
                    {product_name}
                </Typography>
                <div className={styles.qty}>
                    <Typography variant="span">{t('common:title:qty')}</Typography>
                    <ButtonQty
                        value={qty}
                        onChange={setQty}
                        max={10000}
                    />
                </div>
                <Button
                    className={styles.toolbarButton}
                    onClick={() => {
                        toggleOpen(false);
                        updateItem({
                            cart_item_id: id,
                            quantity: qty,
                        });
                    }}
                    customRootStyle={{ width: 'fit-content' }}
                >
                    {t('cart:button:saveEdit')}
                </Button>
            </div>
        </SwipeableDrawer>
    );
};

export default EditDrawer;
