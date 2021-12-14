/* eslint-disable no-nested-ternary */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import ProductByVariant, { generateValue, generateAvailableCombination, handleSelected } from '@helper_productbyvariant';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { localTotalCart } from '@services/graphql/schema/local';
import {
    addConfigProductsToCart,
    getConfigurableProduct,
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
} from '../../../../../../services/graphql';

const OptionsItemConfig = (props) => {
    const {
        setBanner,
        setPrice,
        t,
        data: {
            __typename, sku, media_gallery, image, price_range, price_tiers, name, categories,
        },
        setOpen,
        loading,
        setLoading,
        ConfigurableView,
        Footer,
        setStockStatus,
        stockStatus,
    } = props;

    const client = useApolloClient();
    const [selectConfigurable, setSelectConfigurable] = React.useState({});
    const [selectedProduct, setSelectedProduct] = React.useState({});
    const [qty, setQty] = React.useState(1);

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
            if (media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                media_gallery.map((media) => {
                    bannerData.push({
                        link: '#',
                        imageUrl: media.url,
                    });
                });
            } else {
                bannerData.push({
                    link: '#',
                    imageUrl: image.url,
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

    const handleAddToCart = async () => {
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        const errorData = {};
        // eslint-disable-next-line array-callback-return
        configProduct.data.products.items[0].configurable_options.map((option) => {
            if (selectConfigurable[option.attribute_code] === '' || !selectConfigurable[option.attribute_code]) {
                errorData[option.attribute_code] = `${option.attribute_code} ${t('validate:required')}`;
            }
        });
        setError(errorData);
        if (JSON.stringify(errorData) === '{}') {
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
                } else {
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
                        client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addConfigurableProductsToCart.cart.total_quantity } });
                        window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                        setLoading(false);
                        setOpen(false);
                    })
                    .catch((e) => {
                        setLoading(false);
                        window.toastMessage({
                            ...errorMessage,
                            text: e.message.split(':')[1] || errorMessage.text,
                        });
                    });
            }
        }
    };

    React.useEffect(() => {
        if (configProduct.data && options.length === 0) {
            const op = generateValue(selectConfigurable, configProduct.data.products.items[0].configurable_options, combination);
            setOptions(op);
        }
    }, [configProduct]);

    React.useMemo(() => {
        if (configProduct.data) {
            const op = generateValue(selectConfigurable, configProduct.data.products.items[0].configurable_options, combination);
            setOptions(op);
        }
    }, [selectConfigurable]);
    return (
        <>
            {options.map((data, index) => (
                <ConfigurableView
                    key={index}
                    option={data.options}
                    selected={selectConfigurable}
                    value={data.value}
                    handleSelect={handleSelect}
                    error={error}
                    loading={loading}
                    configProduct={configProduct}
                />
            ))}

            <Footer
                qty={qty}
                handleAddToCart={handleAddToCart}
                setQty={setQty}
                t={t}
                loading={loading || configProduct.loading}
                disabled={!selectedProduct || !selectedProduct.sku || stockStatus === 'OUT_OF_STOCK'}
            />

        </>
    );
};

export default OptionsItemConfig;
