/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
import GridList from '@common_gridlist';
import Carousel from '@common_slick/Caraousel';
import SkeletonWidget from '@common_slick/Caraousel/Skeleton';
import { modules } from '@config';
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList } from '@core_modules/cms/services/graphql';
import ProductItem from '@plugin_productitem';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import React, { useMemo } from 'react';
import { useTranslation } from '@i18n';

/**
 * [CONSTANT] variable
 */
const TEMPLATE_SLIDER = 'slider';
const TEMPLATE_GRID = 'grid';

const WidgetListProduct = (props) => {
    const { template, products_count, conditions_encoded } = props;
    const { t } = useTranslation();

    /**
     * [QUERY] query for products items
     */
    const dataConditions = useMemo(() => getProductListConditions(conditions_encoded), [conditions_encoded]);
    const dataFilter = generateQueries(template, dataConditions);
    const { data, loading, error } = getProductList({ ...dataFilter, pageSize: products_count });
    const dataItems = data?.products?.items || [];

    /**
     * [METHOD] on reinit trigger when all data has been rendered, hide skeleton
     */
    const onReInit = () => {
        if (document.getElementsByClassName('widget-product-list')) {
            const elms = document.getElementsByClassName('widget-product-list');
            for (let i = 0; i < elms.length; i++) {
                elms[i].className = 'full-width widget-product-list';
            }
        }
        if (document.getElementsByClassName('widget-product-list-skeleton')) {
            const elms = document.getElementsByClassName('widget-product-list-skeleton');
            for (let i = 0; i < elms.length; i++) {
                elms[i].className = 'full-width widget-product-list-skeleton hide';
            }
        }
    };

    /**
     * [TEMPLATE] type slider
     */
    const classSkeleton = 'full-width widget-product-list-skeleton';
    const classProductList = 'full-width widget-product-list';
    if (loading) {
        return (
            <div className={classSkeleton}>
                <SkeletonWidget />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <div className="mgz-product-error">
                    <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />
                </div>
            </>
        );
    }

    if (template === TEMPLATE_SLIDER && !loading && dataItems?.length > 0) {
        return (
            <>
                <div className={classProductList}>
                    <Carousel
                        onReInit={onReInit}
                        enableQuickView={false}
                        data={dataItems}
                        Item={ProductItem}
                        slideLg={dataItems?.length > 10 ? 6 : 4}
                    />
                </div>
            </>
        );
    }

    /**
     * [TEMPLATE] type grid
     */
    if (template === TEMPLATE_GRID && !loading && dataItems?.length > 0) {
        return (
            <>
                <div className={classProductList}>
                    <GridList
                        data={dataItems}
                        ItemComponent={ProductItem}
                        className="grid"
                        gridItemProps={{ xs: 6, sm: 4, md: modules.catalog.productListing.drawerFilterOnDesktop.enabled ? 3 : 2 }}
                    />
                </div>
            </>
        );
    }

    return <SkeletonWidget />;
};

export default WidgetListProduct;
