/* eslint-disable no-nested-ternary */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import ProductByVariant, { generateValue, generateAvailableCombination, handleSelected } from '@helper_productbyvariant';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { localTotalCart } from '@services/graphql/schema/local';
import { modules } from '@config';
import Router from 'next/router';
import {
    addConfigProductsToCart,
    getConfigurableProduct,
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
} from '@core_modules/product/services/graphql';

const OptionsItemConfig = (props) => {
    const {
        setBanner = () => { },
        setPrice = () => { },
        t,
        data,
        setOpen = () => { },
        ConfigurableView,
        Footer,
        setStockStatus = () => { },
        stockStatus = '',
        handleAddToCart: CustomAddToCart,
        View,
        loading: customLoading,
        setLoading: setCustomLoading,
        checkCustomizableOptionsValue,
        errorCustomizableOptions,
        customizableOptions,
        handleSelecteProduct = () => { },
        isGrid,
        noValidate = false,
        ...other
    } = props;

    const client = useApolloClient();

    const {
        __typename, sku, media_gallery, image, price_range, price_tiers,
        small_image, name, categories, url_key, stock_status,
    } = data;

    const [selectConfigurable, setSelectConfigurable] = React.useState({});
    const [selectedProduct, setSelectedProduct] = React.useState({});
    const [qty, setQty] = React.useState(1);
    let [loading, setLoading] = React.useState(false);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const configProduct = getConfigurableProduct(sku);

    const [firstSelected, setFirstSelected] = React.useState({});
    const [combination, setCombination] = React.useState({});
    const [options, setOptions] = React.useState([]);

    const handleSelect = async (value, key) => {
        const selectedOption = handleSelected(selectConfigurable, key, value);
        const comb = configProduct.data && generateAvailableCombination(selectedOption, configProduct.data.products.items[0]);
        setCombination({ ...comb });
        setSelectConfigurable({
            ...selectedOption,
        });
        // console.log(configProduct.data.products.items[0].variants);
        const product = await ProductByVariant(selectedOption, configProduct.data.products.items[0].variants);
        if (product && JSON.stringify(product) !== '{}') {
            setSelectedProduct({ ...product });
            handleSelecteProduct({ ...product });
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
                let imageUrl = '';
                if (product.image) {
                    imageUrl = product.image.url;
                } else if (product.small_image) {
                    imageUrl = product.small_image.url;
                }
                bannerData.push({
                    link: '#',
                    imageUrl,
                });
            }
            setBanner(bannerData);
            setPrice({
                priceRange: product.price_range,
                priceTiers: product.price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: product.__typename,
            });
            setStockStatus(product.stock_status);
        } else {
            const bannerData = [];
            if (media_gallery && media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                media_gallery.map((media) => {
                    bannerData.push({
                        link: '#',
                        imageUrl: media.url,
                    });
                });
            } else {
                let imageUrl = '';
                if (image) {
                    imageUrl = image.url;
                } else if (small_image) {
                    imageUrl = small_image.url;
                }
                bannerData.push({
                    link: '#',
                    imageUrl,
                });
            }
            setBanner(bannerData);
            setPrice({
                priceRange: price_range,
                priceTiers: price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: __typename,
            });
            setStockStatus('OUT_OF_STOCK');
            handleSelecteProduct({ ...data });
        }

        firstSelected.code = key;
        firstSelected.value = value;
        await setFirstSelected({ ...firstSelected });
    };

    let cartId = '';
    let isLogin = 0;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [addCartConfig] = addConfigProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();

    const [error, setError] = React.useState({});

    const addToCart = async () => {
        let customizable_options = [];
        const entered_options = [];
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            customizableOptions.map((op) => {
                if (customizable_options.length > 0) {
                    const findOptions = customizable_options.find((item) => item.id === op.option_id);
                    if (findOptions) {
                        customizable_options = customizable_options.filter(
                            (item) => item.id !== op.option_id,
                        );
                        if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: `${findOptions.value_string},${op.value}`,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: `${findOptions.value_string},${op.value}`,
                            });
                        }
                    } else if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                if (customizable_options.length === 0) {
                    if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                return op;
            });
        }
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        const errorData = {};
        if (!noValidate) {
            // eslint-disable-next-line array-callback-return
            configProduct.data.products.items[0].configurable_options.map((option) => {
                if (selectConfigurable[option.attribute_code] === '' || !selectConfigurable[option.attribute_code]) {
                    errorData[option.attribute_code] = `${option.attribute_code} ${t('validate:required')}`;
                }
            });
        }
        setError(errorData);

        if (JSON.stringify(errorData) === '{}') {
            if (CustomAddToCart && typeof CustomAddToCart === 'function') {
                CustomAddToCart({
                    parentProduct: {
                        ...data,
                        qty: parseFloat(qty),
                    },
                    childProduct: {
                        ...selectedProduct,
                        qty: parseFloat(qty),
                    },
                    customizable_options,
                    entered_options,
                });
            } else {
                setLoading(true);
                if (!cartId || cartId === '' || cartId === undefined) {
                    if (!isLogin) {
                        await getGuestCartId()
                            .then((res) => {
                                const token = res.data.createEmptyCart;
                                cartId = token;
                                setCartId(token);
                            })
                            .catch((e) => {
                                setLoading(false);
                                window.toastMessage({
                                    ...errorMessage,
                                    text: e.message.split(':')[1] || errorMessage.text,
                                });
                            });
                    } else if (cartUser.data && cartUser.data.customerCart) {
                        const token = cartUser.data.customerCart.id || '';
                        cartId = token;
                        setCartId(token);
                    }
                }
                if (__typename === 'ConfigurableProduct') {
                    const variables = {
                        cartId,
                        sku: selectedProduct.sku,
                        qty: parseFloat(qty),
                        parentSku: sku,
                        customizable_options,
                        entered_options,
                    };
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'addToCart',
                            eventLabel: name,
                            ecommerce: {
                                currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                                add: {
                                    products: [
                                        {
                                            name,
                                            id: sku,
                                            price: price_range.minimum_price.regular_price.value || 0,
                                            category: categories.length > 0 ? categories[0].name : '',
                                            list: categories.length > 0 ? categories[0].name : '',
                                            quantity: qty,
                                            dimensions4: stockStatus,
                                        },
                                    ],
                                },
                            },
                        },
                    });
                    addCartConfig({
                        variables,
                    })
                        .then((res) => {
                            client.writeQuery({
                                query: localTotalCart,
                                data: { totalCart: res.data.addConfigurableProductsToCart.cart.total_quantity },
                            });
                            window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                            setLoading(false);
                            setOpen(false);
                        })
                        .catch((e) => {
                            if (e.message === "The product's required option(s) weren't entered. Make sure the options are entered and try again.") {
                                Router.push(`/${url_key}`);
                            }
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: e.message.split(':')[1] || errorMessage.text,
                            });
                        });
                }
            }
        }
    };

    const handleAddToCart = async () => {
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            const check = await checkCustomizableOptionsValue();
            if (check) {
                addToCart();
            }
        } else {
            addToCart();
        }
    };

    React.useEffect(() => {
        if (configProduct.data && configProduct.data.products.items.length > 0
            && options.length === 0 && configProduct.data.products.items[0].configurable_options) {
            const op = generateValue(selectConfigurable, configProduct.data.products.items[0].configurable_options, combination);
            setOptions(op);
        }
    }, [configProduct]);

    React.useMemo(() => {
        if (configProduct.data && configProduct.data.products.items.length > 0
            && configProduct.data.products.items[0].configurable_options) {
            const op = generateValue(selectConfigurable, configProduct.data.products.items[0].configurable_options, combination);
            setOptions(op);
        }
    }, [selectConfigurable]);
    return (
        <View
            options={options}
            handleSelect={handleSelect}
            error={error}
            configProduct={configProduct}
            selected={selectConfigurable}
            qty={qty}
            handleAddToCart={handleAddToCart}
            setQty={setQty}
            t={t}
            loading={loading || configProduct.loading}
            disabled={!selectedProduct || !selectedProduct.sku || stockStatus === 'OUT_OF_STOCK'}
            isGrid={isGrid}
            disableItem={stock_status === 'OUT_OF_STOCK'}
            {...other}
        />
    );
};

export default OptionsItemConfig;
