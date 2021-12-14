/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import useStyles from '@core_modules/cart/pages/default/components/style';
import Item from '@core_modules/cart/pages/default/components/item/item';
import TableList from '@core_modules/cart/pages/default/components/item/TableListItem';

const ItemProduct = (props) => {
    const {
        t, editMode, toggleEditDrawer, product, quantity, configurable_options = [], deleteItem, prices,
        handleFeed, bundle_options, links, customizable_options,
    } = props;
    const [confirmDel, setConfirmDel] = useState(false);
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: props.id,
            product: props.product,
            quantity: props.quantity,
            prices: props.prices,
        });
    };

    const handleAddWishlist = () => {
        handleFeed(props);
    };
    return (
        <Item
            t={t}
            confirmDel={confirmDel}
            handleDelete={handleDelete}
            handleAddWishlist={handleAddWishlist}
            setConfirmDel={setConfirmDel}
            product={product}
            configurable_options={configurable_options}
            bundle_options={bundle_options}
            links={links}
            quantity={quantity}
            prices={prices}
            editMode={editMode}
            toggleEditDrawer={toggleEditDrawer}
            customizable_options={customizable_options}
        />
    );
};

const ItemView = (props) => {
    const styles = useStyles();
    const {
        data, t, toggleEditMode, editMode, deleteItem, handleFeed, toggleEditDrawer,
    } = props;
    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.toolbarCounter}>
                    <Typography variant="p" type="regular">
                        <span>{data.total_quantity}</span>
                        {' '}
                        {t('cart:counter:text')}
                    </Typography>
                </div>
                <div className={classNames(styles.toolbarActions, 'hidden-desktop')}>
                    <Button variant="outlined" className={styles.toolbarButton} onClick={toggleEditMode}>
                        {editMode ? <>{t('common:button:save')}</> : <>{t('common:button:edit')}</>}
                    </Button>
                </div>
            </div>
            <div className={classNames(styles.items, 'hidden-desktop')}>
                {data.items.map((item, idx) => (
                    <ItemProduct
                        {...item}
                        key={idx}
                        t={t}
                        editMode={editMode}
                        toggleEditDrawer={() => toggleEditDrawer({
                            id: item.id,
                            quantity: item.quantity,
                            product_name: item.product.name,
                        })}
                        deleteItem={deleteItem}
                        handleFeed={handleFeed}
                    />
                ))}
            </div>
            <div className="hidden-mobile">
                <TableList
                    data={data.items}
                    t={t}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                />
            </div>
        </div>
    );
};

export default ItemView;
