/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { getBlog, getCategory } from '@core_modules/blog/services/graphql';
import * as Schema from '@core_modules/blog/services/graphql/schema';

const CoreLanding = (props) => {
    const {
        t, Skeleton, WarningInfo, Content, pageConfig = {}, storeConfig, ...other
    } = props;
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

    const {
        loading, data, error, fetchMore,
    } = getBlog({
        variables: {
            page_size: pageSize,
            current_page: 1,
            category_id: 0,
            id: 0,
        },
    });

    const loadCategory = getCategory({ category_id: 0 });
    if (loading || !data || loadCategory.loading) {
        return (
            <DefaultLayout pageConfig={{}} {...props}>
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

    if (!loading && data && data.getBlogByFilter.items.length > 0) {
        const handleLoadMore = () => {
            if (fetchMore && typeof fetchMore !== 'undefined') {
                setPage(page + 1);
                setLoadMore(true);
                fetchMore({
                    query: Schema.getAllPost,
                    variables: {
                        current_page: page + 1,
                        page_size: pageSize,
                        category_id: 0,
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
        const items = data.getBlogByFilter.items.map((item) => {
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

        const contentData = {
            ...data,
            getBlogByFilter: {
                ...data.getBlogByFilter,
                items,
            },
        };

        const contentprops = {
            t, handleLoadMore, loadMore, page, loading, loadCategory, storeConfig,
        };

        return (
            <DefaultLayout {...props} pageConfig={config}>
                <Content
                    data={contentData}
                    {...contentprops}
                    {...other}
                />
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout {...props} pageConfig={config}>
            <WarningInfo variant="error" text={t('blog:error:notFound')} />
        </DefaultLayout>
    );
};

CoreLanding.propTypes = {
    Content: propTypes.func.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
    Skeleton: propTypes.func,
    WarningInfo: propTypes.func,
    pageConfig: propTypes.object,
};

CoreLanding.defaultProps = {
    Skeleton: () => {},
    WarningInfo: () => {},
    pageConfig: {},
};

export default CoreLanding;
