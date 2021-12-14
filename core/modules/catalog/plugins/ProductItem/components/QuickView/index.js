/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useTranslation } from '@i18n';
import PriceFormat from '@common_priceformat';
import Banner from '@common_slick/BannerThumbnail';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@common_typography';
import classNames from 'classnames';
import Button from '@common_button';
import RatingStar from '@common_ratingstar';
import { getHost } from '@helper_config';
import { modules } from '@config';

import useStyles from '@plugin_productitem/components/QuickView/style';

const DesktopOptions = dynamic(() => import('@core_modules/product/pages/default/components/OptionItem/DesktopOptions'), { ssr: false });
const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: false });
const WeltpixelLabel = dynamic(() => import('@plugin_productitem/components/WeltpixelLabel'), { ssr: false });

const QuickView = (props) => {
    const styles = useStyles();
    const route = useRouter();
    const { t } = useTranslation(['common', 'product', 'catalog']);
    const {
        onClose, selectedValue, open, data, weltpixel_labels,
    } = props;

    const product = data.items[0];

    const reviewValue = parseInt(product.review.rating_summary, 0) / 20;

    // generate banner image
    const bannerData = [];
    if (product.media_gallery.length > 0) {
        // eslint-disable-next-line array-callback-return
        product.media_gallery.map((media) => {
            bannerData.push({
                link: '#',
                imageUrl: media.url,
            });
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: product.image.url,
        });
    }

    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: product.price_range,
        priceTiers: product.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: product.__typename,
        specialFromDate: product.special_from_date,
        specialToDate: product.special_to_date,
    });
    const [additionalPrice, setAdditionalPrice] = React.useState(0);
    const [stockStatus, setStockStatus] = React.useState(product.stock_status);
    // Customizable Options
    const [customizableOptions, setCustomizableOptions] = React.useState([]);
    const [errorCustomizableOptions, setErrorCustomizableOptions] = React.useState([]);

    const checkCustomizableOptionsValue = async () => {
        if (product.options && product.options.length > 0) {
            const requiredOptions = product.options.filter((op) => op.required);
            if (requiredOptions.length > 0) {
                if (customizableOptions.length > 0) {
                    let countError = 0;
                    const optionsError = [];
                    for (let idx = 0; idx < requiredOptions.length; idx += 1) {
                        const op = requiredOptions[idx];
                        const findValue = customizableOptions.find((val) => val.option_id === op.option_id);
                        if (!findValue) {
                            optionsError.push(op);
                            countError += 1;
                        }
                    }
                    if (countError > 0) {
                        await setErrorCustomizableOptions(optionsError);
                        return false;
                    }
                    return true;
                }
                await setErrorCustomizableOptions(requiredOptions);

                return false;
            }
            return true;
        }
        return true;
    };

    React.useEffect(() => {
        if (errorCustomizableOptions && errorCustomizableOptions.length > 0) {
            // eslint-disable-next-line consistent-return
            const errorCustomizable = errorCustomizableOptions.filter((err) => {
                const findValue = customizableOptions.find((op) => op.option_id === err.option_id);
                return !findValue;
            });
            setErrorCustomizableOptions(errorCustomizable);
        }
    }, [customizableOptions]);

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog scroll="body" onClose={handleClose} fullWidth maxWidth="md" open={open}>
            <div className={styles.modal}>
                <IconButton className={styles.btnClose} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <div className={classNames(styles.container, 'row')}>
                    <div className={classNames(styles.headContainer, 'col-xs-12 col-lg-6')}>
                        <Banner
                            data={banner}
                            noLink
                            thumbnail={false}
                            showArrow
                            autoPlay={false}
                            width={600}
                            height={1120}
                            customClassCaraousel={styles.caraousel}
                        >
                            {
                                modules.catalog.productListing.label.enabled
                                    && modules.catalog.productListing.label.weltpixel.enabled && (
                                    <WeltpixelLabel t={t} weltpixel_labels={weltpixel_labels} categoryLabel={false} />
                                )
                            }
                        </Banner>
                    </div>
                    <div className={classNames(styles.body, 'col-xs-12 col-lg-6')}>

                        <div className={styles.titleContainer}>
                            <div className={styles.titlePriceContainer}>
                                <Typography
                                    variant="title"
                                    type="bold"
                                    letter="capitalize"
                                    className={classNames(styles.title, 'clear-margin-padding')}
                                >
                                    {product.name}
                                </Typography>
                                <PriceFormat {...price} additionalPrice={additionalPrice} />
                            </div>
                        </div>
                        <div className={styles.titleContainer}>
                            <div className={classNames('row', styles.sku)}>
                                <Typography className="clear-margin-padding" variant="p" type="regular" letter="capitalize">
                                    SKU#:
                                    {' '}
                                </Typography>
                                <Typography variant="p" type="bold" letter="none">
                                    {product.sku || ''}
                                </Typography>
                            </div>
                            <Typography variant="p" type="bold" letter="uppercase">
                                {stockStatus.replace(/_/g, ' ') || ''}
                            </Typography>
                        </div>

                        <div className={styles.titleContainer}>
                            <div className={styles.ratingContainer}>
                                <RatingStar value={reviewValue || 0} />
                                <Typography variant="p" type="regular" letter="capitalize">
                                    {product.review.reviews_count || 0}
                                    {' '}
                                    {t('product:review')}
                                </Typography>
                            </div>
                        </div>
                        <div className="row">
                            {
                                modules.catalog.productListing.label.enabled
                                    && modules.catalog.productListing.label.weltpixel.enabled && (
                                    <WeltpixelLabel
                                        t={t}
                                        weltpixel_labels={weltpixel_labels || []}
                                        categoryLabel={false}
                                        onDetailProduct
                                    />
                                )
                            }
                        </div>

                        <div className="hidden-desktop">
                            {' '}
                            <div className={styles.desc}>
                                <Typography variant="span" type="regular" size="10">
                                    {product.short_description.html
                                        ? <span dangerouslySetInnerHTML={{ __html: product.short_description.html }} /> : null}
                                </Typography>
                            </div>
                        </div>
                        <div className="hidden-mobile">
                            <DesktopOptions
                                price={price}
                                t={t}
                                data={data.items[0]}
                                setBanner={setBanner}
                                setPrice={setPrice}
                                setStockStatus={setStockStatus}
                                setAdditionalPrice={setAdditionalPrice}
                                customizableOptions={customizableOptions}
                                setCustomizableOptions={setCustomizableOptions}
                                errorCustomizableOptions={errorCustomizableOptions}
                                checkCustomizableOptionsValue={checkCustomizableOptionsValue}
                                additionalPrice={additionalPrice}
                            />
                            <Button
                                className={classNames(styles.btnGoToProduct)}
                                color="primary"
                                align="left"
                                onClick={() => route.push(`/${product.url_key}`)}
                            >
                                <Typography
                                    align="center"
                                    type="bold"
                                    letter="uppercase"
                                    color="white"
                                    variant="inherit"
                                >
                                    {t('product:goToProduct')}
                                </Typography>
                            </Button>
                            <div className={styles.desktopShareIcon}>
                                <Typography className={styles.shareTitle} variant="title">
                                    {t('product:shareTitle')}
                                </Typography>
                                <ItemShare link={getHost() + route.asPath} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

QuickView.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default QuickView;
