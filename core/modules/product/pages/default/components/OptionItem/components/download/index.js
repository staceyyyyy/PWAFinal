/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { useApolloClient } from '@apollo/client';
import { localTotalCart } from '@services/graphql/schema/local';
import { handleSelectedDownload } from '@helper_productbyvariant';
// import Router from 'next/router';
import React from 'react';
import TagManager from 'react-gtm-module';
import {
    addDownloadProductToCart, getDownloadroduct, getGuestCartId as queryGetGuestCartId, getCustomerCartId,
} from '../../../../../../services/graphql';

const OptionsItemDownload = ({
    setOpen,
    setPrice,
    t,
    data: {
        __typename, sku, name, categories,
        price_range, stock_status,
    },
    DownloadView,
    price,
    Footer,
}) => {
    const [qty, setQty] = React.useState(1);
    const client = useApolloClient();

    let cartId = '';
    let isLogin = 0;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [addCartDownload] = addDownloadProductToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const [items, setItems] = React.useState([]);
    const [selectDownloadable, setSelectDownloadable] = React.useState({});
    const cartUser = getCustomerCartId();
    const downloadProduct = getDownloadroduct(sku);
    const { loading } = downloadProduct;

    const [loadingAdd, setLoadingAdd] = React.useState(false);

    React.useEffect(() => {
        if (items.length === 0 && downloadProduct.data && downloadProduct.data.products) {
            setItems([...downloadProduct.data.products.items[0].downloadable_product_links]);
        }
    }, [downloadProduct.data]);

    const handleOption = (id, price_value) => {
        let final_price_sum = 0;
        const selectedOption = handleSelectedDownload(selectDownloadable, id, price_value);
        setSelectDownloadable({
            ...selectedOption,
        });
        for (const [key, value] of Object.entries(selectedOption)) {
            final_price_sum += value;
        }
        const final_price_value = {
            ...price,
            priceRange: {
                ...price.priceRange,
                minimum_price: {
                    ...price.priceRange.minimum_price,
                    regular_price: {
                        ...price.priceRange.minimum_price.regular_price, value: final_price_sum,
                    },
                    final_price: {
                        ...price.priceRange.minimum_price.final_price, value: final_price_sum,
                    },
                },
            },
        };
        setPrice(final_price_value);
    };

    const handleAddToCart = async () => {
        const options = [];
        for (const [key, value] of Object.entries(selectDownloadable)) {
            options.push({ link_id: parseFloat(key) });
        }
        setLoadingAdd(true);
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        if (!cartId || cartId === '' || cartId === undefined) {
            if (!isLogin) {
                await getGuestCartId()
                    .then((res) => {
                        const token = res.data.createEmptyCart;
                        cartId = token;
                        setCartId(token);
                    })
                    .catch((e) => {
                        setLoadingAdd(false);
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
        if (__typename === 'DownloadableProduct') {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToCart',
                    eventLabel: name,
                    ecommerce: {
                        currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [{
                                name,
                                id: sku,
                                price: price_range.minimum_price.regular_price.value || 0,
                                category: categories.length > 0 ? categories[0].name : '',
                                list: categories.length > 0 ? categories[0].name : '',
                                quantity: qty,
                                dimensions4: stock_status,
                            }],
                        },
                    },
                },
            });
            addCartDownload({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(qty),
                    download_product_link: options,
                },
            })
                .then((res) => {
                    client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addDownloadableProductsToCart.cart.total_quantity } });
                    window.toastMessage({
                        variant: 'success',
                        text: t('product:successAddCart'),
                        open: true,
                    });
                    setLoadingAdd(false);
                    setOpen(false);
                })
                .catch((e) => {
                    setLoadingAdd(false);
                    window.toastMessage({
                        ...errorMessage,
                        text: e.message.split(':')[1] || errorMessage.text,
                    });
                });
        }
    };

    return (
        <>
            <DownloadView
                items={items}
                handleAddToCart={handleAddToCart}
                handleOption={handleOption}
                loading={loadingAdd}
                t={t}
            />
            <Footer qty={qty} handleAddToCart={handleAddToCart} setQty={setQty} t={t} loading={loadingAdd | loading} />
        </>
    );
};

export default OptionsItemDownload;
