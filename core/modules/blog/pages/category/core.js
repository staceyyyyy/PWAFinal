import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { useRouter } from 'next/router';
import { getCategory, getBlog } from '@core_modules/blog/services/graphql';
import * as Schema from '@core_modules/blog/services/graphql/schema';

const Category = (props) => {
    const {
        t, Skeleton, WarningInfo, Content, pageConfig, storeConfig, ...other
    } = props;
    const router = useRouter();
    const { id } = router.query;
    const config = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
        ...pageConfig,
    };
    const [page, setPage] = React.useState(1);
    const [pageSize] = React.useState(5);
    const [loadMore, setLoadMore] = React.useState(false);

    const { loading, data, error } = getCategory({
        url_key: id,
    });
    const loadCategory = getCategory({ category_id: 0 });
    const loadBlog = getBlog({
        variables: {
            page_size: pageSize,
            current_page: 1,
            category_id: data ? data.getBlogCategory.data[0].id : 0,
            id: 0,
        },
    });
    if (loading || !data || loadBlog.loading) {
        return (
            <DefaultLayout {...props} pageConfig={{}}>
                <Skeleton />
            </DefaultLayout>
        );
    }
    if (error) {
        return (
            <DefaultLayout {...props} pageConfig={{}}>
                <WarningInfo variant="error" text={t('blog:error:fetch')} />
            </DefaultLayout>
        );
    }
    if (data && data.getBlogCategory.data.length > 0 && loadBlog.data) {
        config.title = data.getBlogCategory.data[0].name;
        config.headerTitle = data.getBlogCategory.data[0].name;

        const handleLoadMore = () => {
            if (loadBlog.fetchMore && typeof loadBlog.fetchMore !== 'undefined') {
                setPage(page + 1);
                setLoadMore(true);
                loadBlog.fetchMore({
                    query: Schema.getAllPost,
                    variables: {
                        current_page: page + 1,
                        page_size: pageSize,
                        category_id: data.getBlogCategory.data[0].id,
                        id: 0,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        setLoadMore(false);
                        const prevItems = previousResult.getBlogByFilter;
                        const newItems = fetchMoreResult.getBlogByFilter;
                        return {
                            getBlogByFilter: {
                                current_page: prevItems.current_page,
                                page_size: prevItems.page_size,
                                total_count: prevItems.total_count,
                                total_pages: prevItems.total_pages,
                                // eslint-disable-next-line no-underscore-dangle
                                __typename: prevItems.__typename,
                                items: [...prevItems.items, ...newItems.items],
                            },
                        };
                    },
                });
            }
        };

        const mediaUrl = storeConfig.base_media_url || '';
        let items = [];
        if (loadBlog.data.getBlogByFilter.items.length > 0) {
            items = loadBlog.data.getBlogByFilter.items.map((item) => {
                let { short_content, content } = item;
                if (content && content !== '') {
                    content = content.replace(/{{media url=&quot;/g, mediaUrl);
                    content = content.replace(/&quot;}}/g, '');
                }

                if (short_content && short_content !== '') {
                    short_content = short_content.replace(/{{media url=&quot;/g, mediaUrl);
                    short_content = short_content.replace(/&quot;}}/g, '');
                }

                return {
                    ...item,
                    short_content,
                    content,
                };
            });
        }

        const contentData = {
            ...loadBlog.data,
            getBlogByFilter: {
                ...loadBlog.data.getBlogByFilter,
                items,
            },
        };

        const contentprops = {
            t, handleLoadMore, loadMore, page, pageSize, loading: loadBlog.loading, data: contentData, loadCategory, storeConfig,
        };

        return (
            <DefaultLayout {...props} pageConfig={config} storeConfig={storeConfig}>
                <Content
                    {...contentprops}
                    {...other}
                />
            </DefaultLayout>
        );
    } return (
        <DefaultLayout pageConfig={config} storeConfig={storeConfig}>
            <WarningInfo variant="error" text={t('blog:error:notFound')} />
        </DefaultLayout>
    );
};

Category.propTypes = {
    Content: propTypes.func.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
    Skeleton: propTypes.func,
    WarningInfo: propTypes.func,
};

Category.defaultProps = {
    Skeleton: () => <p>loading</p>,
    WarningInfo: () => <p>Error</p>,
};

export default Category;
