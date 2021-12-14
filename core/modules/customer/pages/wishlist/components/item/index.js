/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import ConfirmationDelete from '@common_confirmdialog';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Link from 'next/link';
import Image from '@common_image';
import { features } from '@config';
import { setResolver, getResolver } from '@helper_localstorage';
import useStyles from '@core_modules/customer/pages/wishlist/components/item/style';

const WishlistComp = ({
    price_range, price_tiers, __typename, imageSrc,
    name, wishlistItemId, t, sku, url_key,
    handleRemove, handleToCart, special_from_date, special_to_date,
}) => {
    const styles = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = () => {
        handleRemove({ wishlistItemId });
        setOpenDelete(!openDelete);
    };
    const handleAddToCart = () => {
        handleToCart({
            sku, url_key, wishlistItemId, __typename,
        });
    };
    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'PRODUCT',
        };
        await setResolver(urlResolver);
    };
    return (
        <>
            <ConfirmationDelete
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleYes={handleDelete}
                message={t('customer:wishlist:warningDelete')}
            />
            <div className={styles.card}>
                <div className={styles.imgItem}>
                    <Image
                        src={imageSrc}
                        className={styles.productImg}
                        alt={name}
                        width={features.imageSize.product.width}
                        height={features.imageSize.product.height}
                        quality={80}
                    />
                </div>
                <div className={styles.content}>
                    <Link href="/[...slug]" as={`/${url_key}`}>
                        <a onClick={() => handleClick(`/${url_key}`)}>
                            <Typography variant="p">{name}</Typography>
                        </a>
                    </Link>
                    <PriceFormat
                        variant="p"
                        priceRange={price_range}
                        priceTiers={price_tiers}
                        productType={__typename}
                        specialFromDate={special_from_date}
                        specialToDate={special_to_date}
                    />
                    <Button className={styles.btnAdd} onClick={handleAddToCart}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white">
                            {t('customer:wishlist:addToBag')}
                        </Typography>
                    </Button>
                </div>
                <IconButton onClick={() => setOpenDelete(!openDelete)}>
                    <Delete />
                </IconButton>
            </div>
        </>
    );
};

export default WishlistComp;
