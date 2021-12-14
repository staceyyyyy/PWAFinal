import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import Content from '@core_modules/catalog/pages/category/components';
import Core from '@core_modules/catalog/pages/category/core';
import { withTranslation } from '@i18n';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('@common_image/LazyImage'), { ssr: false });
const Error = dynamic(() => import('@core_modules/error/pages/default'), { ssr: false });
const SkeletonView = dynamic(() => import('@core_modules/catalog/pages/category/components/Skeleton'), { ssr: false });

const CategoryPage = (props) => (
    <Core
        BannerView={Banner}
        BreadcrumbView={BreadcrumbView}
        TabView={TabView}
        SkeletonView={SkeletonView}
        Content={Content}
        ErrorView={Error}
        {...props}
    />
);

export default withTranslation()(CategoryPage);
