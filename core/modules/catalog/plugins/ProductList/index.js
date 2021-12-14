import TabView from '@common_tabs';
import CoreBase from '@plugin_productlist/core';
import ImageProductView from '@plugin_productitem/components/Image';
import DetailProductView from '@plugin_productitem/components/Detail';
import dynamic from 'next/dynamic';

const ErrorMessage = dynamic(() => import('@plugin_productlist/components/ErrorMessage'), { ssr: false });
const ProductListSkeleton = dynamic(() => import('@plugin_productlist/components/ProductListSkeleton'), { ssr: false });
const FilterView = dynamic(() => import('@plugin_productlist/components/Filter/view'), { ssr: false });
const FilterModalView = dynamic(() => import('@plugin_productlist/components/Filter/FilterDialog'), { ssr: false });

const Page = (props) => (
    <CoreBase
        ErrorMessage={ErrorMessage}
        ProductListSkeleton={ProductListSkeleton}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        TabView={TabView}
        FilterView={FilterView}
        FilterModalView={FilterModalView}
        {...props}
    />
);

export default Page;
