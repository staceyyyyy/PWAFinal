import { getCategory } from '@core_modules/blog/services/graphql';

const CoreCategory = ({
    ErrorInfo, Content, t,
}) => {
    const { loading, data, error } = getCategory({ category_id: 0 });
    if (loading) return null;
    if (error) {
        return <ErrorInfo variant="error" text={t('blog:error:fetchError')} />;
    }

    if (!data || data.getBlogCategory.data.length === 0) {
        return <ErrorInfo variant="warning" text={t('blog:error:notFound')} />;
    }

    return (
        <Content
            t={t}
            data={data.getBlogCategory.data}
        />
    );
};

export default CoreCategory;
