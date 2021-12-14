import React from 'react';
import Product from '@plugin_productlist';
import Typography from '@common_typography';
import useStyles from '@core_modules/searchresult/pages/default/components/style';

const SearchResult = (props) => {
    const styles = useStyles();
    const { storeConfig, t, q } = props;
    return (
        <div className={styles.container}>
            {/* add url path if no redirect to slug */}
            <div className="hidden-mobile">
                <Typography variant="h5" letter="uppercase" className={styles.title}>
                    {t('catalog:title:searchResult')}
                    {': '}
                    {q}
                </Typography>
            </div>
            <Product
                defaultSort={{ key: 'relevance', value: 'DESC' }}
                url_path="catalogsearch/result"
                showTabs
                catalog_search_engine={storeConfig.catalog_search_engine}
                t={t}
                storeConfig={storeConfig}
            />
        </div>
    );
};

export default SearchResult;
