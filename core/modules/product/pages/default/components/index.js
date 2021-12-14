/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
import Button from '@common_button';
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import classNames from 'classnames';
import React from 'react';
import { getHost } from '@helper_config';
import Breadcrumb from '@common_breadcrumb';
import RatingStar from '@common_ratingstar';
import { breakPointsUp } from '@helper_theme';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/product/pages/default/components/style';
import ExpandDetail from '@core_modules/product/pages/default/components/ExpandDetail';
import ListReviews from '@core_modules/product/pages/default/components/ListReviews';
import OptionItem from '@core_modules/product/pages/default/components/OptionItem';
import SharePopup from '@core_modules/product/pages/default/components/SharePopup';
import ModalPopupImage from '@core_modules/product/pages/default/components/ModalPopupImage';
import { modules } from '@config';
import { getProductBannerLite } from '@core_modules/product/services/graphql';

const Banner = dynamic(() => import('@common_slick/BannerThumbnail'), { ssr: true });
const DesktopOptions = dynamic(() => import('@core_modules/product/pages/default/components/OptionItem/DesktopOptions'), { ssr: true });
const TabsView = dynamic(() => import('@core_modules/product/pages/default/components/DesktopTabs'), { ssr: true });
const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: false });
const WeltpixelLabel = dynamic(() => import('@plugin_productitem/components/WeltpixelLabel'), { ssr: false });
const UpsellDrawer = dynamic(() => import('@core_modules/product/pages/default/components/RightDrawer'), { ssr: false });
const RelatedProductCaraousel = dynamic(() => import('@core_modules/product/pages/default/components/RelatedProductCaraousel'), { ssr: false });
const PromoBannersLite = dynamic(() => import('@core_modules/product/pages/default/components/PromoBannersLite'), { ssr: false });

const ProductPage = (props) => {
    const styles = useStyles();
    const {
        t,
        data,
        openOption,
        handleOption,
        setOpenOption,
        setBanner,
        setPrice,
        openShare,
        setOpenShare,
        route,
        banner,
        openDrawer,
        setOpenDrawer,
        breadcrumbsData,
        price,
        handleWishlist,
        reviewValue,
        wishlist,
        expandData,
        openImageDetail,
        handleOpenImageDetail,
        stockStatus,
        additionalPrice,
        smartProductTabs,
        isLogin,
        handleSetCompareList,
    } = props;
    const desktop = breakPointsUp('sm');

    const context = (isLogin && isLogin === 1) ? { request: 'internal' } : {};
    const [getBannerLite, bannerLiteResult] = getProductBannerLite(route.asPath.slice(1), { context });

    React.useEffect(() => {
        getBannerLite();
    }, [bannerLiteResult.called]);

    const bannerLiteData = bannerLiteResult.data ? bannerLiteResult.data.products.items[0].banners_data : [];
    const bannerLiteObj = {
        top: bannerLiteData.filter((bannerLite) => bannerLite.banner_type === '0') || [],
        after: bannerLiteData.filter((bannerLite) => bannerLite.banner_type === '1') || [],
        label: bannerLiteData.filter((bannerLite) => bannerLite.banner_type === '2') || [],
    };

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

    return (
        <>
            <div className="hidden-mobile">
                <UpsellDrawer
                    open={openDrawer}
                    setOpen={() => setOpenDrawer(!openDrawer)}
                    t={t}
                    dataProduct={data}
                    isLogin={isLogin}
                />
                <ModalPopupImage open={openImageDetail} setOpen={handleOpenImageDetail} banner={banner} />
            </div>
            <OptionItem {...props} open={openOption} setOpen={() => setOpenOption(!openOption)} setBanner={setBanner} setPrice={setPrice} />
            <SharePopup open={openShare} setOpen={() => setOpenShare(!openShare)} link={getHost() + route.asPath} {...props} />
            <div className={classNames(styles.container, 'row')}>
                <div className="col-lg-12 hidden-mobile">
                    <Breadcrumb data={breadcrumbsData} variant="text" />
                </div>

                {(bannerLiteObj.top && bannerLiteObj.top.length > 0) && (
                    bannerLiteObj.top.map((topBanner) => (
                        <PromoBannersLite
                            type="top"
                            key={topBanner.entity_id}
                            classes={classNames(styles.bannerLiteTop, 'col-xs-12')}
                            src={topBanner.banner_link}
                            imgSrc={topBanner.banner_image}
                            alt={topBanner.banner_alt}
                        />
                    ))
                )}

                <div className={classNames(styles.headContainer, 'col-xs-12 col-lg-6')}>
                    {(bannerLiteObj.top && bannerLiteObj.top.length > 0) && (
                        bannerLiteObj.top.map((topBanner) => (
                            <PromoBannersLite
                                type="top"
                                key={topBanner.entity_id}
                                classes={classNames(styles.bannerLiteTopMobile, 'col-xs-12')}
                                src={topBanner.banner_link}
                                imgSrc={topBanner.banner_image}
                                alt={topBanner.banner_alt}
                            />
                        ))
                    )}
                    <div className="row">
                        {(bannerLiteObj.label && bannerLiteObj.label.length > 0) && (
                            bannerLiteObj.label.map((labelBanner) => (
                                <PromoBannersLite
                                    type="label"
                                    key={labelBanner.entity_id}
                                    classes={classNames(styles.bannerLiteLabel, 'col-xs-6')}
                                    imgSrc={labelBanner.banner_image}
                                    alt={labelBanner.banner_alt}
                                />
                            ))
                        )}
                    </div>
                    <Banner
                        data={banner}
                        noLink
                        thumbnail
                        showArrow
                        contentWidth="auto"
                        autoPlay={false}
                        width={960}
                        height={1120}
                        actionImage={desktop ? handleOpenImageDetail : () => { }}
                        customProduct={styles.bannerProduct}
                    >
                        {
                            modules.catalog.productListing.label.enabled
                            && modules.catalog.productListing.label.weltpixel.enabled && (
                                <WeltpixelLabel
                                    t={t}
                                    weltpixel_labels={data.weltpixel_labels || []}
                                    categoryLabel={false}
                                    withThumbnailProduct
                                />
                            )
                        }
                    </Banner>
                    <div className="hidden-desktop">
                        <UpsellDrawer
                            open={openDrawer}
                            setOpen={() => setOpenDrawer(!openDrawer)}
                            t={t}
                            dataProduct={data}
                            isLogin={isLogin}
                        />
                    </div>
                </div>
                <div className={classNames(styles.body, 'col-xs-12 col-lg-6')}>
                    <div className={classNames(styles.titleContainer, 'hidden-desktop')}>
                        <Breadcrumb data={breadcrumbsData} variant="text" />
                    </div>

                    <div className={styles.titleContainer}>
                        <div className={styles.titlePriceContainer}>
                            <Typography variant="title" type="bold" letter="capitalize" className={classNames(styles.title, 'clear-margin-padding')}>
                                {data.name}
                            </Typography>
                            <PriceFormat {...price} additionalPrice={additionalPrice} />
                        </div>
                        <div className={styles.shareContainer}>
                            {modules.productcompare.enabled && (
                                <div className="hidden-desktop">
                                    <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(data.id)}>
                                        <CompareArrowsIcon color="primary" />
                                    </IconButton>
                                </div>
                            )}
                            <IconButton className={styles.btnShare} onClick={handleWishlist}>
                                {favoritIcon}
                            </IconButton>
                            <div className="hidden-desktop">
                                <IconButton className={classNames(styles.btnShare, 'hidden-desktop')} onClick={() => setOpenShare(true)}>
                                    <ShareOutlined className={styles.iconShare} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <div className={classNames('row', styles.sku)}>
                            <Typography className="clear-margin-padding" variant="p" type="regular" letter="capitalize">
                                SKU#:
                                {' '}
                            </Typography>
                            <Typography variant="p" type="bold" letter="none">
                                {data.sku || ''}
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
                                {data.review.reviews_count || 0}
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
                                    weltpixel_labels={data.weltpixel_labels || []}
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
                                {data.short_description.html ? <span dangerouslySetInnerHTML={{ __html: data.short_description.html }} /> : null}
                            </Typography>
                        </div>
                        <div>
                            <ExpandDetail data={expandData} smartProductTabs={smartProductTabs} />
                        </div>
                        <div className="row">
                            {(bannerLiteObj.after && bannerLiteObj.after.length > 0) && (
                                bannerLiteObj.after.map((afterBanner) => (
                                    <PromoBannersLite
                                        type="after"
                                        key={afterBanner.entity_id}
                                        classes={classNames(styles.bannerLiteAfter, 'col-xs-6')}
                                        src={bannerLiteObj.after.banner_link}
                                        imgSrc={afterBanner.banner_image}
                                        alt={afterBanner.banner_alt}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="hidden-mobile">
                        <DesktopOptions {...props} setOpen={setOpenOption} setBanner={setBanner} setPrice={setPrice} />

                        <div className="row">
                            {(bannerLiteObj.after && bannerLiteObj.after.length > 0) && (
                                bannerLiteObj.after.map((afterBanner) => (
                                    <PromoBannersLite
                                        type="after"
                                        key={afterBanner.entity_id}
                                        classes={classNames(styles.bannerLiteAfter, 'col-xs-6')}
                                        src={bannerLiteObj.after.banner_link}
                                        imgSrc={afterBanner.banner_image}
                                        alt={afterBanner.banner_alt}
                                    />
                                ))
                            )}
                        </div>

                        <div className={styles.desktopShareIcon}>
                            <Typography className={styles.shareTitle} variant="title">
                                {t('product:shareTitle')}
                            </Typography>
                            <div className={modules.productcompare.enabled && styles.rowItem}>
                                <ItemShare link={getHost() + route.asPath} />
                                {modules.productcompare.enabled && (
                                    <Button className={styles.btnCompare} color="primary" onClick={() => handleSetCompareList(data.id)}>
                                        <CompareArrowsIcon color="primary" style={{ fontSize: '18px' }} />
                                        <Typography variant="p" align="center" letter="uppercase">
                                            Compare
                                        </Typography>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden-desktop">
                    <ListReviews {...props} />
                </div>
                <div className={classNames(styles.tabs, 'col-xs-12 col-lg-12 hidden-mobile')}>
                    <TabsView
                        {...props}
                        dataInfo={expandData}
                        smartProductTabs={smartProductTabs || {
                            tab_2: {
                                label: null,
                                content: null,
                            },
                        }}
                    />
                </div>
                <RelatedProductCaraousel t={t} dataProduct={data} isLogin={isLogin} />
                <div className={classNames(styles.footer, 'hidden-desktop')}>
                    <Button
                        className={styles.btnAddToCard}
                        color="primary"
                        onClick={handleOption}
                        disabled={data && data.stock_status === 'OUT_STOCK'}
                    >
                        <Typography variant="span" align="center" type="bold" letter="uppercase" color="white">
                            {t('product:addToCart')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
