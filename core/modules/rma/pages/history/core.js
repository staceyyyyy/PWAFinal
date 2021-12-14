/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { getHistoryRma } from '@core_modules/rma/services/graphql';
import * as Schema from '@core_modules/rma/services/graphql/schema';

const CoreLanding = (props) => {
    const {
        t, Loader, WarningInfo, Content, pageConfig = {}, ...other
    } = props;
    const config = {
        title: t('rma:history'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('rma:history'),
        bottomNav: false,
        ...pageConfig,
    };
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [loadMore, setLoadMore] = React.useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const {
        data, loading, error, fetchMore,
    } = getHistoryRma({
        page_size: pageSize,
        current_page: page + 1,
    });

    const handleLoadMore = () => {
        setPage(page + 1);
        setLoadMore(true);
        fetchMore({
            query: Schema.getHistoryRma,
            variables: {
                current_page: page + 1,
                page_size: pageSize,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setLoadMore(false);
                const prevItems = previousResult.getCustomerRequestAwRma;
                const newItems = fetchMoreResult.getCustomerRequestAwRma;
                return {
                    getCustomerRequestAwRma: {
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
    };

    const contentprops = {
        t,
        handleLoadMore,
        loadMore,
        page,
        pageSize,
        loading,
        data,
        error,
        handleChangePage,
        handleChangePageSize,
        Loader,
        WarningInfo,
    };

    return (
        <DefaultLayout {...props} pageConfig={config}>
            <Content
                {...contentprops}
                {...other}
            />
        </DefaultLayout>
    );
};

CoreLanding.propTypes = {
    Content: propTypes.func.isRequired,
    Loader: propTypes.func,
    WarningInfo: propTypes.func,
    pageConfig: propTypes.object,
};

CoreLanding.defaultProps = {
    Loader: () => {},
    WarningInfo: () => {},
    pageConfig: {},
};

export default CoreLanding;
