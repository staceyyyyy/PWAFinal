import Layout from '@layout';
import { StripHtmlTags } from '@helper_text';
import { getCategory } from '@core_modules/catalog/services/graphql';
import generateSchemaOrg from '@core_modules/catalog/helpers/schema.org';

const Page = (props) => {
    const {
        Content, categoryId, storeConfig, SkeletonView, pageConfig = {}, ErrorView, ...other
    } = props;
    const { loading, data } = getCategory({
        productSize: 10,
        id: categoryId,
    });
    const ogContent = {};
    let config = {};
    let schemaOrg = null;
    if (data && data.categoryList[0]) {
        const category = data.categoryList[0];
        schemaOrg = generateSchemaOrg(category, storeConfig);
        if (data.categoryList[0].description) {
            ogContent.description = StripHtmlTags(data.categoryList[0].description);
        }
        config = {
            title: loading ? '' : data.categoryList[0].name,
            headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
            header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
            bottomNav: 'browse',
            pageType: 'category',
            ogContent,
            schemaOrg,
        };
    }
    if (loading && !data) {
        return (
            <Layout {...props} pageConfig={config}>
                <SkeletonView />
            </Layout>
        );
    }

    if (data && !data.categoryList[0]) {
        return <ErrorView statusCode={404} {...props} />;
    }
    return (
        <Layout {...props} pageConfig={config || pageConfig}>
            <Content categoryId={categoryId} storeConfig={storeConfig} data={data} {...other} />
        </Layout>
    );
};

export default Page;
