/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import Layout from '@layout';
import TagManager from 'react-gtm-module';
import { removeCheckoutData, getCheckoutData } from '@helper_cookies';
import Router from 'next/router';
import { debuging } from '@config';
import { getOrder, getPaymentBankList, getPaymentInformation } from '@core_modules/thanks/services/graphql';

const PageStoreCredit = (props) => {
    const {
        t, Content, pageConfig, checkoutData, storeConfig, Skeleton, ErrorInfo, ...other
    } = props;
    const config = {
        title: t('thanks:title'),
        headerTitle: t('thanks:title'),
        bottomNav: false,
        pageType: 'purchase',
        ...pageConfig,
    };
    const { data, loading, error } = getOrder(typeof checkoutData === 'string' ? JSON.parse(checkoutData) : checkoutData);
    const [getBankList, { data: bankList, error: errorBankList }] = getPaymentBankList();
    const { data: paymentInformation, loading: paymentLoading, error: paymentError } = getPaymentInformation(
        typeof checkoutData === 'string'
            ? {
                order_number: JSON.parse(checkoutData).order_number,
            }
            : {
                order_number: checkoutData.order_number,
            },
    );
    if (typeof window !== 'undefined') {
        const cdt = getCheckoutData();
        if (!cdt) Router.push('/');
    }

    React.useEffect(() => {
        if (data && data.ordersFilter && data.ordersFilter.data.length > 0) {
            let itemsProduct = [];
            const itemsChild = data.ordersFilter.data[0].detail[0].items.filter((item) => {
                if (item.parent_item_id !== null) return item;
            });
            const simpleData = data.ordersFilter.data[0].detail[0].items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
            itemsProduct = [...itemsChild, ...simpleData];
            const dataLayer = {
                pageType: 'purchase',
                event: 'checkout',
                ecommerce: {
                    purchase: {
                        actionField: {
                            id: checkoutData.order_number,
                            affiliation: storeConfig.store_name || 'Swift PWA',
                            revenue: JSON.stringify(data.ordersFilter.data[0].detail[0].grand_total),
                            coupon: data.ordersFilter.data[0].detail[0].coupon.is_use_coupon ? data.ordersFilter.data[0].detail[0].coupon.code : '',
                            tax: JSON.stringify(data.ordersFilter.data[0].detail[0].tax_amount),
                            shipping: JSON.stringify(data.ordersFilter.data[0].detail[0].payment.shipping_amount),
                        },
                        products: itemsProduct.map((product) => ({
                            name: product.name,
                            id: product.sku,
                            category: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
                            price: JSON.stringify(product.price),
                            list: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
                            quantity: JSON.stringify(product.qty_ordered),
                            dimension4: product.quantity_and_stock_status.is_in_stock ? 'In stock' : 'Out stock',
                            dimension5: JSON.stringify(product.rating.total),
                            dimension6: JSON.stringify(product.rating.value),
                            dimension7: data.ordersFilter.data[0].detail[0].discount_amount !== 0 ? 'YES' : 'NO',
                        })),
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
        }
    }, [data]);

    React.useEffect(() => function cleanup() {
        if (typeof window !== 'undefined') {
            const cdt = getCheckoutData();
            if (cdt) removeCheckoutData();
        }
    }, []);

    React.useEffect(() => {
        if (!bankList) {
            getBankList();
        }
    }, [bankList]);

    if (loading || !data || !bankList || paymentLoading || !paymentInformation) {
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig}>
                <Skeleton />
            </Layout>
        );
    }
    if (error || errorBankList || paymentError) {
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig}>
                <ErrorInfo variant="error" text={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')} />
            </Layout>
        );
    }

    const deleteCheckoutData = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
    };

    const handleCotinue = () => {
        deleteCheckoutData();
        Router.push('/');
    };

    const handleDetailOrder = () => {
        deleteCheckoutData();
        Router.push('/sales/order/view/order_id/[id]', `/sales/order/view/order_id/${checkoutData.order_number}`);
    };

    const handleConfirmPayment = () => {
        deleteCheckoutData();
        Router.push('/confirmpayment');
    };

    if (data && data.ordersFilter && data.ordersFilter.data.length > 0 && bankList && paymentInformation) {
        const dateOrder = data.ordersFilter.data[0].created_at ? new Date(data.ordersFilter.data[0].created_at.replace(/-/g, '/')) : new Date();
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig} showRecentlyBar={false}>
                <Content
                    {...other}
                    t={t}
                    handleCotinue={handleCotinue}
                    ordersFilter={data.ordersFilter}
                    checkoutData={checkoutData}
                    storeConfig={storeConfig}
                    dateOrder={dateOrder}
                    handleDetailOrder={handleDetailOrder}
                    handleConfirmPayment={handleConfirmPayment}
                    bankList={bankList.getPaymentBankList}
                    paymentInformation={paymentInformation}
                />
            </Layout>
        );
    }

    return (
        <ErrorInfo variant="warning" text={t('common:error:notFound')} />
    );
};

export default PageStoreCredit;
