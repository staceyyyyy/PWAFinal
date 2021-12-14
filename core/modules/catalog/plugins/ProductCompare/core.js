/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
import React from 'react';
import Router from 'next/router';
import propTypes from 'prop-types';
import { setCookies, getCookies } from '@helper_cookies';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { localCompare } from '@services/graphql/schema/local';
import { createCompareList } from '@core_modules/product/services/graphql';
import { useQuery } from '@apollo/client';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';

const ProductCompareIcon = ({ withLink, WihtLinkView, isLogin }) => {
    const [getProductCompare, { loading, data: compareList }] = getCompareList({
        errorPolicy: 'all',
    });
    const [getUid, { data: dataUid }] = getCustomerUid();
    const { data: dataCompare, client } = useQuery(localCompare);
    const [setCompareList] = createCompareList();
    const { t } = useTranslation();

    React.useEffect(() => {
        if (!dataCompare && compareList && compareList.compareList != null) {
            client.writeQuery({
                query: localCompare,
                data: {
                    item_count: compareList.compareList.item_count,
                    items: compareList.compareList.items,
                },
            });
        }
    }, [dataCompare]);

    React.useEffect(() => {
        if (isLogin) {
            getUid();
        }
    }, [isLogin]);

    React.useEffect(() => {
        if (!compareList && !isLogin) {
            const uid = getCookies('uid_product_compare');
            if (uid) {
                getProductCompare({
                    variables: {
                        uid,
                    },
                });
            }
        }
        if (!loading && (compareList && compareList.compareList == null) && !isLogin) {
            setCompareList({
                variables: {
                    uid: [],
                },
            })
                .then(async (res) => {
                    setCookies('uid_product_compare', res.data.createCompareList.uid);
                });
        }
    }, [compareList, isLogin]);

    React.useEffect(() => {
        if (!compareList && dataUid) {
            if (isLogin) {
                const uid = getCookies('uid_product_compare');
                if (uid && dataUid.customer && dataUid.customer.compare_list && dataUid.customer.compare_list.uid) {
                    const uid_product = dataUid.customer.compare_list.uid;
                    getProductCompare({
                        variables: {
                            uid: uid_product,
                        },
                    });
                }
            }
        }
    }, [compareList, dataUid]);

    const handleLink = () => {
        Router.push('/catalog/product_compare');
    };

    if (withLink) {
        let tempCompare = null;
        if (dataCompare && dataCompare.item_count) {
            tempCompare = {
                compareList: {
                    item_count: dataCompare.item_count,
                    items: dataCompare.items,
                },
            };
        }
        if (tempCompare || compareList) {
            return (
                <>
                    <WihtLinkView compareList={tempCompare || compareList} handleLink={handleLink} />
                </>
            );
        }
        return null;
    }

    /* eslint-disable */
   if (dataCompare || compareList) {
    return (
        <>
            <Typography variant="span" type="bold" letter="uppercase">
                {t('common:productCompare:title')} ( {dataCompare ? dataCompare.item_count : compareList ? compareList.compareList.item_count : 0} )
            </Typography>
        </>
    );
   }

   return null
    /* eslint-enable */
};

ProductCompareIcon.propTypes = {
    WihtLinkView: propTypes.func.isRequired,
};

export default ProductCompareIcon;
