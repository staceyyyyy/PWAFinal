/* eslint-disable consistent-return */
import { modules } from '@config';
import gqlService from '@core_modules/home/service/graphql';

const CategoryList = ({
    storeConfig, t, CategoryListSkeleton, ErrorInfo, CategoryListView,
}) => {
    const { home } = modules;
    const { loading, data, error } = gqlService.getCategoryList({
        url_key: home.categoryList.url_key,
    });

    if (loading) return <CategoryListSkeleton />;
    if (error) {
        return (
            <ErrorInfo variant="error" text={t('home:errorFetchData')} />
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <ErrorInfo variant="warning" text={t('home:nullData')} />
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <>
                <CategoryListView
                    storeConfig={storeConfig}
                    data={data.categoryList[0].children}
                />
            </>
        );
    }
};

export default CategoryList;
