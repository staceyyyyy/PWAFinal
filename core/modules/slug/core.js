/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
import Error from '@core_modules/error/pages/default';
import { getResolver as getLocalResolver, getLocalStorage, setLocalStorage } from '@helper_localstorage';
import Layout from '@layout';
import { getResolver } from '@core_modules/slug/services/graphql';

const ContainerResolver = (props) => {
    const {
        CategoryPage, ProductPage, CmsPage, resolver, contentProps, storeConfig, ...other
    } = props;

    if (resolver.type === 'CATEGORY') {
        return <CategoryPage {...contentProps} categoryId={resolver.id} {...other} />;
    }
    if (resolver.type === 'PRODUCT') {
        return <ProductPage {...contentProps} {...other} />;
    }
    if (resolver.type === 'CMS_PAGE') {
        return <CmsPage {...contentProps} {...other} />;
    }
    return <Error statusCode={404} {...contentProps} />;
};

const Slug = (props) => {
    const {
        slug, storeConfig, ProductLoader, CategorySkeleton, LoadingView, t, cms_page = '', ...other
    } = props;

    const cmsList = getLocalStorage('cms_page');
    if (!cmsList) {
        setLocalStorage('cms_page', cms_page || '');
    }
    const cmsPages = typeof window !== 'undefined' && cmsList ? cmsList.split(',') : cms_page.split(',');

    let url = slug.join('/');
    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '.html';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;
    const { error, loading, data } = getResolver(url);

    const config = {
        ogContent: {},
    };

    if (error) return <Error statusCode={500} />;
    if (loading) {
        return (
            <Layout storeConfig={storeConfig} pageConfig={config} t={t}>
                <LoadingView open />
            </Layout>
        );
    }
    const resolver = data.urlResolver ? data.urlResolver : {};
    const contentProps = { slug, storeConfig };
    return <ContainerResolver resolver={resolver} {...other} contentProps={contentProps} />;
};

const SlugContainer = (props) => {
    const { slug, storeConfig } = props;
    let localResolver;
    if (typeof window !== 'undefined') {
        const contentProps = { slug, storeConfig };
        let key = '';
        for (let index = 0; index < slug.length; index++) {
            const element = slug[index];
            key += `/${element}`;
        }
        localResolver = getLocalResolver();
        const resolver = localResolver[key];
        if (resolver && resolver.type) {
            resolver.relative_url = key;
            return <ContainerResolver resolver={resolver} {...props} contentProps={contentProps} />;
        }
    }
    return <Slug {...props} />;
};

export default SlugContainer;
