import Layout from '@layout';
import React from 'react';
import { getHost } from '@helper_config';
import { getCookies } from '@helper_cookies';
import { getCompareList, removeProductsFromCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import Empty from '@core_modules/productcompare/pages/default/components/empty';
import ErrorView from '@core_modules/productcompare/pages/default/components/ErrorInfo';
import { localCompare } from '@services/graphql/schema/local';
import { useQuery } from '@apollo/client';

const HomeCore = (props) => {
    const {
        Content, pageConfig, isLogin, storeConfig, ViewSkeleton, t, ...other
    } = props;
    const [getProduct, {
        data: compareList, loading, refetch, error,
    }] = getCompareList();
    const [setRemoveProductCompare] = removeProductsFromCompareList();
    const [getUid, { data: dataUid }] = getCustomerUid();
    const { client } = useQuery(localCompare);

    React.useEffect(() => {
        if (isLogin) {
            getUid();
        }
    }, [isLogin]);

    React.useEffect(() => {
        if (!isLogin) {
            const uid = getCookies('uid_product_compare');
            if (uid) {
                getProduct({
                    variables: {
                        uid,
                    },
                });
            }
        }
    }, []);

    React.useEffect(() => {
        if (dataUid && isLogin) {
            const uid = getCookies('uid_product_compare');
            if (uid) {
                const uid_product = dataUid.customer.compare_list.uid;
                getProduct({
                    variables: {
                        uid: uid_product,
                    },
                });
            }
        }
    }, [dataUid]);
    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];

    const config = {
        title: storeConfig.default_title,
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        schemaOrg,
        ...pageConfig,
    };

    if (loading) {
        return (
            <Layout {...props} pageConfig={config}>
                <ViewSkeleton t={t} />
            </Layout>
        );
    }

    if (!compareList || compareList.compareList == null) {
        return (
            <Layout {...props} pageConfig={config} {...other}>
                <Empty t={t} />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout {...props} pageConfig={config} {...other}>
                <ErrorView variant="error" text={t('common:error:fetchError')} />
            </Layout>
        );
    }

    const handleRemoveProduct = (id) => {
        window.backdropLoader(true);
        const uid_product = getCookies('uid_product_compare');
        const uids = [];
        let uid_customer = '';
        uids.push(id.toString());
        if (isLogin) {
            /* eslint-disable */
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
            /* eslint-enable */
        }
        setRemoveProductCompare({
            variables: {
                uid: isLogin ? uid_customer : uid_product,
                products: uids,
            },
        })
            .then(async (res) => {
                await client.writeQuery({
                    query: localCompare,
                    data: {
                        item_count: res.data.removeProductsFromCompareList.item_count,
                        items: res.data.removeProductsFromCompareList.items,
                    },
                });
                refetch();
                window.backdropLoader(false);
                window.toastMessage({ open: true, variant: 'success', text: t('common:productCompare:successRemove') });
                if (res.data.removeProductsFromCompareList.item_count === 0) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            })
            .catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('common:productCompare:failedRemove'),
                });
            });
    };

    return (
        <Layout {...props} pageConfig={config} {...other}>
            <Content storeConfig={storeConfig} {...other} t={t} compareList={compareList} handleRemoveProduct={handleRemoveProduct} />
        </Layout>
    );
};

export default HomeCore;
