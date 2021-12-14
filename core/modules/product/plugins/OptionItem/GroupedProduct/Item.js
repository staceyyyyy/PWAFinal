import React from 'react';
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';

import useStyles from '@plugin_optionitem/GroupedProduct/style';

const ItemGrouped = ({
    max = 10000,
    disabled = false,
    product,
    itemsCart = {},
    setItemsCart = () => {},
}) => {
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(itemsCart[product.sku] || 0);

    const handleLocalChange = (event) => {
        const val = event.target.value;
        if (val && val !== '' && !disabled) {
            if (val < 0) {
                // window.toastMessage({
                //     open: true,
                //     text: 'Min input 1',
                //     variant: 'error',
                // });
            } else if (val > max) {
                window.toastMessage({
                    open: true,
                    text: `Max input ${max}`,
                    variant: 'error',
                });
            } else {
                if (setItemsCart) {
                    const items = itemsCart;
                    items[product.sku] = val;
                    setItemsCart(items);
                }
                setLocalValue(parseInt(val, 0));
            }
        }
    };

    return (
        <div className={styles.item}>
            <div className={styles.itemName}>
                <Typography>{product.name}</Typography>
                <PriceFormat
                    priceRange={product.price_range}
                    priceTiers={product.price_tiers}
                    // eslint-disable-next-line no-underscore-dangle
                    productType={product.__typename}
                    specialFromDate={product.special_from_date}
                    specialToDate={product.special_to_date}
                />
            </div>
            {
                product.stock_status === 'OUT_OF_STOCK'
                    ? (
                        <Typography variant="p" type="bold" letter="uppercase">
                            {product.stock_status.replace(/_/g, ' ') || ''}
                        </Typography>
                    )
                    : (
                        <input
                            className={styles.inputQty}
                            type="number"
                            onChange={handleLocalChange}
                            readOnly={disabled}
                            value={localValue}
                        />
                    )
            }
        </div>
    );
};

export default ItemGrouped;
