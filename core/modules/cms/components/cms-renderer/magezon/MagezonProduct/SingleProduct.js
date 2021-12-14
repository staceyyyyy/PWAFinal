/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import { features, modules } from '@config';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { useProduct } from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/helpers/useProduct';
import Button from '@core_modules/commons/Button';
import Typography from '@core_modules/commons/Typography';
import OptionItem from '@core_modules/product/plugins/OptionItem';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Link from 'next/link';
import Image from '@common_image';

const CustomButton = (props) => {
    const { t, styles, handleClick } = props;

    return (
        <Button className={styles.btnAddToCard} onClick={handleClick}>
            <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                {t('product:addToCart')}
            </Typography>
        </Button>
    );
};

const SingleProduct = (props) => {
    // prettier-ignore
    const {
        type,
        product, product_display,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
        item_xl, item_lg, item_md, item_sm, item_xs,
    } = props;
    const isGrid = product_display && product_display === 'grid';
    const isProductGrid = type === 'product_grid';
    const isSlider = type === 'product_slider';
    const { t } = useTranslation();
    // prettier-ignore
    const {
        name, url_key, id, __typename, review_count,
        short_description, small_image,
    } = product;
    // prettier-ignore
    const {
        styles, wishlist,
        price, setPrice,
        handleAddtowishlist, handleClick, handleSetCompareList,
    } = useProduct({ product, t });

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

    const getCol5Classes = () => {
        let classes = '';
        if (item_xl === 5) {
            classes += 'col-xl-5 ';
        }
        if (item_lg === 5) {
            classes += 'col-lg-5 ';
        }
        if (item_md === 5) {
            classes += 'col-md-5 ';
        }
        if (item_sm === 5) {
            classes += 'col-sm-5 ';
        }
        if (item_xs === 5) {
            classes += 'col-xs-5 ';
        }

        return classes;
    };

    const customButton = () => {
        if (product_addtocart) {
            return <CustomButton t={t} styles={styles} handleClick={handleClick} />;
        }
        return null;
    };

    return (
        <>
            <Grid
                item={isProductGrid}
                container
                direction={isGrid || isProductGrid || isSlider ? 'column' : 'row'}
                alignItems={isGrid || isSlider ? 'center' : 'stretch'}
                className={`mgz-single-product-card ${getCol5Classes()}`}
                xl={isProductGrid && item_xl !== 5 && 12 / item_xl}
                lg={isProductGrid && item_lg !== 5 && 12 / item_lg}
                md={isProductGrid && item_md !== 5 && 12 / item_md}
                sm={isProductGrid && item_sm !== 5 && 12 / item_sm}
                xs={isProductGrid && item_xs !== 5 && 12 / item_xs}
            >
                {product_image && (
                    <Grid
                        item
                        xs={isGrid ? 6 : isProductGrid || isSlider ? true : 3}
                        container
                        justify="center"
                        alignItems={isProductGrid ? 'center' : 'stretch'}
                    >
                        <div onClick={handleClick} style={{ width: features.imageSize.product.width }}>
                            <Image src={small_image.url} width={features.imageSize.product.width} height={features.imageSize.product.height} />
                        </div>
                    </Grid>
                )}
                <Grid item xs container direction="column" alignItems={isGrid || isProductGrid || isSlider ? 'center' : 'stretch'}>
                    {product_name && (
                        <Grid item>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                    )}
                    {product_review && (
                        <Grid item container justify={isGrid || isProductGrid || isSlider ? 'center' : 'flex-start'}>
                            <RatingStar value={review_count} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {review_count || 0} {review_count > 1 ? `${t('product:review')}s` : t('product:review')}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item container justify={isGrid || isProductGrid || isSlider ? 'center' : 'flex-start'}>
                        <Grid item>
                            {product_price && (
                                <div className="mgz-single-product-price">
                                    <PriceFormat {...price} />
                                </div>
                            )}
                            {product_shortdescription && (
                                <Link href={url_key}>
                                    <CmsRenderer content={short_description.html} />
                                </Link>
                            )}
                            <div className="mgz-single-product-option-item">
                                {__typename === 'GroupedProduct' ? (
                                    <CustomButton t={t} styles={styles} handleClick={handleClick} />
                                ) : (
                                    <OptionItem
                                        data={product}
                                        setPrice={setPrice}
                                        t={t}
                                        noLabel
                                        noValidate
                                        customPos
                                        showSwatches={product_swatches}
                                        showQty={false}
                                        disabled={false}
                                        showAddToCart={product_addtocart}
                                        handleAddToCart={handleClick}
                                        customButton={customButton}
                                    />
                                )}
                            </div>
                        </Grid>
                        {(!isGrid && !isSlider) && (
                            <Grid item style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                {modules.wishlist.enabled && product_wishlist && (
                                    <IconButton className={styles.btnShare} onClick={handleAddtowishlist}>
                                        {favoritIcon}
                                    </IconButton>
                                )}
                                {modules.productcompare.enabled && product_compare && (
                                    <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(id)}>
                                        <CompareArrowsIcon className={styles.iconShare} />
                                    </IconButton>
                                )}
                            </Grid>
                        )}
                    </Grid>
                    {(isGrid || isSlider) && (
                        <Grid item>
                            {modules.wishlist.enabled && product_wishlist && (
                                <IconButton className={styles.btnShare} onClick={handleAddtowishlist}>
                                    {favoritIcon}
                                </IconButton>
                            )}
                            {modules.productcompare.enabled && product_compare && (
                                <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(id)}>
                                    <CompareArrowsIcon className={styles.iconShare} />
                                </IconButton>
                            )}
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <style jsx>
                {`
                    .mgz-single-product-option-item {
                        margin-top: 10px;
                    }
                    .mgz-single-product-option-item :global(> div:not(div[class*='btnAdd'])) {
                    }
                    .mgz-single-product-option-item :global(div[role='radiogroup']) {
                        ${isGrid ? 'justify-content: center;' : ''}
                    }
                    .mgz-single-product-price {
                        ${isGrid || isProductGrid ? 'text-align: center;' : ''}
                    }
                    @media (max-width: 600px) {
                        .mgz-single-product-option-item :global(div[role='radiogroup'] > div) {
                            margin: 2px 5px;
                        }
                        .mgz-single-product-option-item :global(div[role='radiogroup'] > div > span) {
                            font-size: 11px;
                        }
                        .mgz-single-product-option-item :global(div[class*='btnAdd'] button) {
                            font-size: 11px;
                            height: 31px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-single-product-card:hover {
                        ${isProductGrid && `
                            border: 1px solid #bbbbbb;
                            position: relative;
                            z-index: 2;
                        `}
                    }
                `}
            </style>
        </>
    );
};

export default SingleProduct;
