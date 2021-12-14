/* eslint-disable array-callback-return */
import Layout from '@layout';
import Error from 'next/error';
import { StripHtmlTags } from '@helper_text';
import { features, modules, debuging } from '@config';
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module';
import { getCookies } from '@helper_cookies';
import Loading from '@core_modules/product/pages/default/components/Loader';
import {
    getProduct,
    getProductLabel,
    addWishlist as mutationAddWishlist,
    smartProductTabs,
    addProductsToCompareList,
} from '@core_modules/product/services/graphql';
import Header from '@core_modules/product/pages/default/components/header';
import generateSchemaOrg from '@core_modules/product/helpers/schema.org';
import { setLocalStorage, getLocalStorage } from '@helper_localstorage';
import { getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { localCompare } from '@services/graphql/schema/local';
import { useQuery } from '@apollo/client';

const ContentDetail = ({
    t, product, Content, isLogin, weltpixel_labels, dataProductTabs, storeConfig,
}) => {
    const item = product.items[0];
    const route = useRouter();

    const reviewValue = parseInt(item.review.rating_summary, 0) / 20;
    const [getUid, { data: dataUid, refetch: refetchCustomerUid }] = getCustomerUid();
    const [addProductCompare] = addProductsToCompareList();
    const { data: dataCompare, client } = useQuery(localCompare);

    React.useEffect(() => {
        if (isLogin && !dataUid && modules.productcompare.enabled) {
            getUid();
        }
    }, [isLogin, dataUid]);

    React.useEffect(() => {
        let categoryProduct = '';
        // eslint-disable-next-line no-unused-expressions
        item.categories.length > 0
            && item.categories.map(({ name }, indx) => {
                if (indx > 0) categoryProduct += `/${name}`;
                else categoryProduct += name;
            });
        const tagManagerArgs = {
            dataLayer: {
                pageName: item.name,
                pageType: 'product',
                ecommerce: {
                    detail: {
                        product: [
                            {
                                name: item.name,
                                id: item.sku,
                                price: item.price_range.minimum_price.regular_price.value || 0,
                                category: categoryProduct,
                                dimensions4: item.stock_status,
                                dimensions5: reviewValue,
                                dimensions6: item.review.reviews_count,
                                dimensions7: item.sale === 0 ? 'NO' : 'YES',
                            },
                        ],
                    },
                    currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: item.name,
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }, []);

    const bannerData = [];
    if (item.media_gallery.length > 0) {
        // eslint-disable-next-line array-callback-return
        item.media_gallery.map((media) => {
            bannerData.push({
                link: '#',
                imageUrl: media.url,
                videoUrl: media && media.video_content,
            });
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: item.image.url,
            videoUrl: '#',
        });
    }

    const [openOption, setOpenOption] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openShare, setOpenShare] = React.useState(false);
    const [openImageDetail, setOpenImageDetail] = React.useState(false);
    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: item.price_range,
        priceTiers: item.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: item.__typename,
        specialFromDate: item.special_from_date,
        specialToDate: item.special_to_date,
    });
    const [additionalPrice, setAdditionalPrice] = React.useState(0);
    const [stockStatus, setStockStatus] = React.useState(item.stock_status);
    const [wishlist, setWishlist] = React.useState(false);

    // Customizable Options
    const [customizableOptions, setCustomizableOptions] = React.useState([]);
    const [errorCustomizableOptions, setErrorCustomizableOptions] = React.useState([]);

    React.useEffect(() => {
        setPrice({
            priceRange: item.price_range,
            priceTiers: item.price_tiers,
            // eslint-disable-next-line no-underscore-dangle
            productType: item.__typename,
            specialFromDate: item.special_from_date,
            specialToDate: item.special_to_date,
        });
        setBanner(bannerData);
    }, [item]);

    const [addWishlist] = mutationAddWishlist();
    const handleWishlist = () => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: item.name,
                    label: item.name,
                    ecommerce: {
                        currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [
                                {
                                    name: item.name,
                                    id: item.sku,
                                    price: item.price_range.minimum_price.regular_price.value || 0,
                                    category: item.categories.length > 0 ? item.categories[0].name : '',
                                    list: item.categories.length > 0 ? item.categories[0].name : '',
                                    dimensions4: item.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            addWishlist({
                variables: {
                    productId: item.id,
                },
            })
                .then(async () => {
                    await setWishlist(!wishlist);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    route.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    let expandData = [];
    if (item.description.html) {
        expandData = [
            ...expandData,
            {
                title: 'Detail',
                type: 'html',
                content: item.description.html,
            },
        ];
    }
    if (item.more_info && item.more_info.length > 0) {
        expandData = [
            ...expandData,
            {
                title: 'More Info',
                type: 'array',
                content: item.more_info,
            },
        ];
    }

    let breadcrumbsData = [];
    if (typeof window !== 'undefined') {
        const lastCategory = getCookies('lastCategory');
        const cat = item.categories.filter(({ url_path }) => url_path === lastCategory);
        if (cat.length > 0) {
            if (cat[0].breadcrumbs && cat[0].breadcrumbs.length > 0) {
                breadcrumbsData = cat[0].breadcrumbs.map((bc) => ({
                    label: bc.category_name,
                    link: `/${bc.category_url_path}`,
                    active: false,
                    id: bc.category_id,
                }));
            }
            breadcrumbsData.push({
                label: cat[0].name,
                link: `/${cat[0].url_path}`,
                active: false,
                id: cat[0].id,
            });
        }

        breadcrumbsData.push({
            label: item.name,
            link: '#',
            active: true,
        });
    }

    const handleOption = () => {
        const { productAvailableToCart } = features;
        // eslint-disable-next-line no-underscore-dangle
        if (productAvailableToCart[item.__typename]) {
            setOpenOption(true);
        } else {
            window.toastMessage({
                variant: 'warning',
                text: t('product:productNotAvailable'),
                open: true,
            });
        }
    };

    const handleSetCompareList = (id_compare) => {
        window.backdropLoader(true);
        const uid_product_compare = getCookies('uid_product_compare');
        const uids = [];
        let uid_customer = '';
        uids.push(id_compare.toString());
        if (isLogin) {
            /* eslint-disable */
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
            /* eslint-enable */
        }
        let isExist = false;
        if (dataCompare && dataCompare.items && dataCompare.items.length > 0) {
            dataCompare.items.map((itemCompare) => {
                if (itemCompare.uid === id_compare.toString()) {
                    isExist = true;
                }
                return null;
            });
        }
        if (!isExist) {
            addProductCompare({
                variables: {
                    uid: isLogin ? uid_customer : uid_product_compare,
                    products: uids,
                },
            })
                .then(async (res) => {
                    client.writeQuery({
                        query: localCompare,
                        data: {
                            item_count: res.data.addProductsToCompareList.item_count,
                            items: res.data.addProductsToCompareList.items,
                        },
                    });
                    if (isLogin) {
                        refetchCustomerUid();
                    }
                    window.backdropLoader(false);
                    window.toastMessage({ open: true, variant: 'success', text: t('common:productCompare:successCompare') });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                    });
                });
        } else {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('common:productCompare:existProduct'),
            });
        }
    };

    const handleOpenImageDetail = () => {
        setOpenImageDetail(!openImageDetail);
    };

    const checkCustomizableOptionsValue = async () => {
        if (item.options && item.options.length > 0) {
            const requiredOptions = item.options.filter((op) => op.required);
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

    return (
        <Content
            data={{
                ...product.items[0],
                weltpixel_labels,
            }}
            t={t}
            openOption={openOption}
            handleOption={handleOption}
            setOpenOption={setOpenOption}
            setBanner={setBanner}
            setPrice={setPrice}
            openShare={openShare}
            setOpenShare={setOpenShare}
            route={route}
            banner={banner}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            breadcrumbsData={breadcrumbsData}
            price={price}
            handleWishlist={handleWishlist}
            reviewValue={reviewValue}
            wishlist={wishlist}
            expandData={expandData}
            features={features}
            config={modules.catalog.pdp}
            openImageDetail={openImageDetail}
            handleOpenImageDetail={handleOpenImageDetail}
            stockStatus={stockStatus}
            setStockStatus={setStockStatus}
            customizableOptions={customizableOptions}
            setCustomizableOptions={setCustomizableOptions}
            errorCustomizableOptions={errorCustomizableOptions}
            checkCustomizableOptionsValue={checkCustomizableOptionsValue}
            additionalPrice={additionalPrice}
            setAdditionalPrice={setAdditionalPrice}
            smartProductTabs={dataProductTabs}
            isLogin={isLogin}
            handleSetCompareList={handleSetCompareList}
            storeConfig={storeConfig}
        />
    );
};

const PageDetail = (props) => {
    let product = {};
    let weltpixel_labels = [];
    let productTab = {
        tab_1: {
            label: null,
            content: null,
        },
    };
    const {
        slug, Content, t, isLogin, pageConfig, CustomHeader, storeConfig,
    } = props;

    const context = isLogin && isLogin === 1 ? { request: 'internal' } : {};

    /**
     * Check if partial data exists, AKA being navigated from a PLP or search page.
     */
    const router = useRouter();
    const productProps = router.query.productProps ? JSON.parse(router.query.productProps) : {};
    const productVariables = Object.keys(productProps).length > 0 ? {
        variables: {
            includeName: productProps.name && productProps.name !== '',
            includePrice: productProps.price && true,
            includeImg: productProps.small_image?.url && true,
        },
    } : {};

    const labels = getProductLabel(slug[0], { context });
    const { loading, data, error } = getProduct(slug[0], { context, ...productVariables });
    const [getProductTabs, { data: dataProductTabs }] = smartProductTabs();
    React.useEffect(() => {
        if (slug[0] !== '') {
            getProductTabs({
                variables: {
                    filter: {
                        url_key: {
                            eq: slug[0],
                        },
                    },
                },
            });
        }
    }, [slug[0]]);

    if (error || loading || !data) {
        return (
            <Layout pageConfig={{}} CustomHeader={CustomHeader ? <CustomHeader /> : <Header />} {...props}>
                <Loading
                    name={productProps.name || ''}
                    price={productProps.price || 0}
                    banner={productProps.small_image ? [{ link: '#', imageUrl: productProps.small_image?.url, videoUrl: '#' }] : []}
                />
            </Layout>
        );
    }
    if (data) {
        let temporaryArr = [];
        product = data.products;

        if (Object.keys(productProps).length > 0) {
            product = {
                ...product,
                items: [{
                    ...product.items[0],
                    name: productProps.name || '',
                    small_image: productProps.small_image || {},
                    price: productProps.price || {},
                    price_range: { ...productProps.price.priceRange },
                    price_tiers: { ...productProps.price.priceTiers },
                    special_from_date: { ...productProps.price.specialFromDate },
                    special_to_date: { ...productProps.price.specialToDate },
                }],
            };
        }

        const viewedProduct = getLocalStorage('recently_viewed_product');
        if (product.items.length > 0) {
            const item = product.items[0];
            let isExist = false;

            if (viewedProduct) {
                temporaryArr = viewedProduct;
                if (viewedProduct.length > 0) {
                    viewedProduct.map((val) => {
                        if (val.url_key === item.url_key) {
                            isExist = true;
                        }
                        return null;
                    });
                }
            }
            if (isExist === false) {
                const newItem = {
                    url_key: item.url_key,
                };
                temporaryArr.push(newItem);
                setLocalStorage('recently_viewed_product', temporaryArr);
            }
        }
        if (product.items.length === 0) return <Error statusCode={404} />;
    }

    if (labels.data && labels.data.products && labels.data.products.items.length > 0 && labels.data.products.items[0].weltpixel_labels) {
        weltpixel_labels = labels.data.products.items[0].weltpixel_labels;
    }

    if (dataProductTabs) {
        const productItem = dataProductTabs.products;
        if (productItem.items.length > 0) {
            productTab = productItem.items[0].smartProductTabs
                ? productItem.items[0].smartProductTabs
                : {
                    tab_1: {
                        label: null,
                        content: null,
                    },
                };
        }
    }

    const schemaOrg = generateSchemaOrg(product.items[0]);
    const config = {
        title: product.items.length > 0 ? product.items[0].name : '',
        bottomNav: false,
        header: 'absolute', // available values: "absolute", "relative", false (default)
        pageType: 'product',
        ogContent: {
            description: {
                type: 'meta',
                value: StripHtmlTags(product.items[0].description.html),
            },
            'og:image': product.items[0].small_image.url,
            'og:image:type': 'image/jpeg',
            'og:description': StripHtmlTags(product.items[0].description.html),
            'og:image:width': features.imageSize.product.width,
            'og:image:height': features.imageSize.product.height,
            'og:image:alt': product.items[0].name || '',
            'og:type': 'product',
            'product:availability': product.items[0].stock_status,
            'product:category': product.items[0].categories && product.items[0].categories.length > 0 && product.items[0].categories[0].name,
            'product:condition': 'new',
            'product:price:currency': product.items[0].price_range.minimum_price.final_price.currency,
            'product:price:amount': product.items[0].price_range.minimum_price.final_price.value,
            'product:pretax_price:currency': product.items[0].price_range.minimum_price.final_price.currency,
            'product:pretax_price:amount': product.items[0].price_range.minimum_price.final_price.value,
        },
        schemaOrg,
    };

    return (
        <Layout pageConfig={pageConfig || config} CustomHeader={CustomHeader ? <CustomHeader /> : <Header />} {...props}>
            <ContentDetail
                product={product}
                t={t}
                Content={Content}
                isLogin={isLogin}
                weltpixel_labels={weltpixel_labels}
                dataProductTabs={productTab}
                storeConfig={storeConfig}
            />
        </Layout>
    );
};

export default PageDetail;
