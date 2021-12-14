/* eslint-disable no-param-reassign */
import { PropTypes } from 'prop-types';
import Layout from '@layout';
import { getBrands } from '@core_modules/brands/services/graphql';
import allData from '@core_modules/brands/helpers/generateAllData';

const Base = (props) => {
    const {
        Content, Skeleton, generateAllData, pageConfig, t, desktop,
    } = props;
    const { data, loading } = getBrands({ pageSize: 100, currentPage: 1 });
    const config = {
        title: t('brands:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('brands:title'),
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'brands',
    };
    if (loading) {
        return (
            <Layout {...props} pageConfig={pageConfig || config}>
                <Skeleton {...props} />
            </Layout>
        );
    }
    const { getBrandList } = data;

    const allBrands = generateAllData ? generateAllData(getBrandList.items) : allData(getBrandList.items);
    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content {...props} all={allBrands} featured={getBrandList.featured} desktop={desktop} />
        </Layout>
    );
};

Base.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

Base.defaultProps = {
    Content: () => {},
    Skeleton: () => {},
};

export default Base;
