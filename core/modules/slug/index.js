import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import CategoryPage from '@core_modules/catalog/pages/category';
import ProductPage from '@core_modules/product/pages/default';
import CmsPage from '@core_modules/cms/pages/default';
import ProductLoader from '@core_modules/product/pages/default/components/Loader';
import CategorySkeleton from '@core_modules/catalog/pages/category/components/Skeleton';
import { getCmsList } from '@services/graphql/schema/config';
import graphRequest from '@graphql_request';
import { storeConfigNameCookie } from '@config';
import Core from '@core_modules/slug/core';
import LoadingView from '@common_backdrop';

const Page = (props) => (
    <Core
        CategoryPage={CategoryPage}
        ProductPage={ProductPage}
        CmsPage={CmsPage}
        LoadingView={LoadingView}
        ProductLoader={ProductLoader}
        CategorySkeleton={CategorySkeleton}
        {...props}
    />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
 */
Page.getInitialProps = async ({ query, req }) => {
    let cmsList = {};
    if (typeof window === 'undefined' && !req.cookies[storeConfigNameCookie]) {
        cmsList = await graphRequest(getCmsList);
    }
    const allcookie = req ? req.cookies : {};
    const obj = {
        slug: query.slug,
        namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
        token: req && req.session ? req.session.token : '',
        isLogin: allcookie.isLogin || 0,
        url_key: req
            ? `${req.protocol}://${req.get('host')}`
            : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    };

    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';
    return obj;
};

export default withApollo({ ssr: true })(withTranslation()(Page));
