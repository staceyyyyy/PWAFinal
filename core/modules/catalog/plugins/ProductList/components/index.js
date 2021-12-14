import React, { useEffect, useState } from 'react';
import GridList from '@common_gridlist';
import Typography from '@common_typography';
import classNames from 'classnames';
import { modules } from '@config';
import { setLocalStorage, getLocalStorage } from '@helper_localstorage';
import Filter from '@plugin_productlist/components/Filter';
import FilterDesktop from '@plugin_productlist/components/FilterDesktop';
import ProductItem from '@plugin_productitem/index';
import LabelView from '@plugin_productitem/components/LabelView';
import useStyles from '@plugin_productlist/components/style';
import Sort from '@plugin_productlist/components/FilterDesktop/sort';

const Content = (props) => {
    const {
        query, showTabs, customFilter, elastic, t,
        aggregations, setFiltervalue, category, defaultSort, config, TabView,
        products, categoryPath, renderEmptyMessage, ProductListSkeleton, loading,
        loadmore, handleLoadMore, dataTabs, onChangeTabs, ...other
    } = props;
    const styles = useStyles();
    const [isGrid, setGridState] = useState(true);

    const handleScroll = () => {
        // To get page offset of last user
        const lastUserLoaded = document.querySelector(
            '.grid-item:last-child',
        );
        if (lastUserLoaded) {
            const lastUserLoadedOffset = lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if (pageOffset > lastUserLoadedOffset && !loadmore && products.items.length < products.total_count) {
                handleLoadMore();
            }
        }
    };

    const setGrid = async (state) => {
        setLocalStorage('isGrid', state);
        setGridState(state);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        const gridView = getLocalStorage('isGrid');
        if (gridView !== null) {
            setGridState(gridView);
        }
    }, [isGrid]);

    return (
        <>
            {showTabs ? (
                <div className="hidden-desktop">
                    <TabView
                        // eslint-disable-next-line radix
                        value={query.category_id ? query.category_id : 0}
                        data={category}
                        onChange={(e, value) => setFiltervalue({ ...query, ...{ category_id: value } })}
                        {...other}
                    />
                </div>
            ) : null}
            <div className={modules.catalog.productListing.drawerFilterOnDesktop.enabled ? 'hidden-desktop' : ''}>
                <Filter
                    filter={customFilter || aggregations}
                    defaultSort={JSON.stringify(defaultSort)}
                    filterValue={query}
                    setFiltervalue={setFiltervalue}
                    isSearch={!!config.search}
                    products={products}
                    renderEmptyMessage={renderEmptyMessage}
                    loading={loading}
                    setGrid={(state) => setGrid(state)}
                    t={t}
                    {...other}
                />
            </div>
            {modules.catalog.productListing.drawerFilterOnDesktop.enabled ? (
                <div className={classNames(styles.filterBtnContainer, 'hidden-mobile')}>
                    <Sort
                        filter={customFilter || aggregations}
                        defaultSort={JSON.stringify(defaultSort)}
                        filterValue={query}
                        setFiltervalue={setFiltervalue}
                        isSearch={!!config.search}
                        t={t}
                        {...other}
                    />
                </div>
            ) : null}

            <div className="row">
                {modules.catalog.productListing.drawerFilterOnDesktop.enabled
                    ? (
                        <div className="col-sm-12 col-lg-2 hidden-mobile">
                            <FilterDesktop
                                filter={customFilter || aggregations}
                                defaultSort={JSON.stringify(defaultSort)}
                                filterValue={query}
                                setFiltervalue={setFiltervalue}
                                isSearch={!!config.search}
                                products={products}
                                renderEmptyMessage={renderEmptyMessage}
                                loading={loading}
                                tabs={dataTabs}
                                t={t}
                                onChangeTabs={onChangeTabs}
                            />
                        </div>
                    )
                    : null}
                <div className={`col-sm-12 col-xs-12 col-lg-${modules.catalog.productListing.drawerFilterOnDesktop.enabled ? '10' : '12'}`}>
                    {modules.catalog.productListing.drawerFilterOnDesktop.enabled
                        ? (
                            <Typography variant="p" type="regular" className={classNames('hidden-mobile', styles.countProductTextDesktop)}>
                                {products.total_count}
                                {' '}
                                {t('catalog:product:name')}
                            </Typography>
                        ) : null}
                    <div className={styles.productContainer}>
                        {loading && <ProductListSkeleton />}
                        {!loading && (
                            <GridList
                                data={products.items}
                                ItemComponent={ProductItem}
                                className="grid"
                                itemProps={{
                                    categorySelect: categoryPath,
                                    LabelView,
                                    isGrid,
                                    catalogList: true,
                                    className: 'grid-item',
                                    ...other,
                                }}
                                gridItemProps={
                                    isGrid
                                        ? {
                                            xs: 6, sm: 4, md: modules.catalog.productListing.drawerFilterOnDesktop.enabled ? 3 : 2,
                                        } : {
                                            xs: 12, sm: 12, md: modules.catalog.productListing.drawerFilterOnDesktop.enabled ? 12 : 12,
                                        }
                                }
                            />
                        )}
                        {(products.items.length === products.total_count) || loading
                            ? renderEmptyMessage(products.items.length, loading)
                            : null}
                        {loadmore ? (
                            <div className={styles.divLoadMore}>
                                <Typography align="center" variant="span" type="bold" letter="uppercase" color="gray">
                                    Loading
                                </Typography>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Content;
