import CmsPage from '@core_modules/cms/pages/default';
import FeaturedSkeleton from '@core_modules/home/pages/default/components/Skeleton/FeaturedSkeleton';
import BannerSliderSkeleton from '@core_modules/home/pages/default/components/Skeleton/BannerSkeleton';
import ErrorInfo from '@core_modules/home/pages/default/components/ErrorInfo';
import BannerView from '@core_modules/home/pages/default/components/Banner/view';
import Content from '@core_modules/home/pages/default/components';
import CategoryListView from '@core_modules/home/pages/default/components/CategoryList/view';
import CategoryListSkeleton from '@core_modules/home/pages/default/components/Skeleton/CategoryListSkeleton';
import FeaturedView from '@core_modules/home/pages/default/components/FeaturedProducts/view';
import Core from '@core_modules/home/pages/default/core';

const Page = (props) => (
    <Core
        FeaturedSkeleton={FeaturedSkeleton}
        BannerSliderSkeleton={BannerSliderSkeleton}
        ErrorInfo={ErrorInfo}
        BannerView={BannerView}
        Content={Content}
        CategoryListSkeleton={CategoryListSkeleton}
        CategoryListView={CategoryListView}
        FeaturedView={FeaturedView}
        CmsPage={CmsPage}
        {...props}
    />
);

export default Page;
