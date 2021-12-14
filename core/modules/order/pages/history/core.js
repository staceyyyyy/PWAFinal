import Layout from '@layout';
import { debuging } from '@config';
import { setCartId } from '@helper_cartid';
import PropTypes from 'prop-types';
import CustomerLayout from '@layout_customer';
import { useRouter } from 'next/router';
import { getHost } from '@helpers/config';
import { getOrder, reOrder as mutationReorder } from '@core_modules/order/services/graphql';

const HistoryOrder = (props) => {
    const {
        t, Content, Skeleton, ErrorView, size,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);

    const [actionReorder] = mutationReorder();

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(true);
        }
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setLoadMore(true);
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const {
        loading, data, error,
    } = getOrder({
        pageSize,
        currentPage: page + 1,
    });

    React.useEffect(() => {
        if (!loading && data && data.customer.orders && data.customer.orders.items.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    if (loading || (!data && !loadMore)) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <ErrorView
                    type="error"
                    message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                />
            </Layout>
        );
    }

    const reOrder = (order_id) => {
        if (order_id && order_id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id,
                },
            }).then(async (res) => {
                if (res.data && res.data.reorder && res.data.reorder.cart_id) {
                    await setCartId(res.data.reorder.cart_id);
                    setTimeout(() => {
                        router.push('/checkout/cart');
                    }, 1000);
                }
                window.backdropLoader(false);
            }).catch(() => {
                window.backdropLoader(false);
            });
        }
    };

    const returnUrl = (order_number) => {
        window.location.replace(`${getHost()}/rma/customer/new/order_id/${order_number}`);
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                loadMore={loadMore}
                data={data.customer.orders}
                page={page}
                pageSize={pageSize}
                loading={loading}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
                reOrder={reOrder}
                returnUrl={returnUrl}
            />
        </Layout>
    );
};

HistoryOrder.propTypes = {
    ErrorView: PropTypes.func,
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

HistoryOrder.defaultProps = {
    ErrorView: () => null,
    Content: () => null,
    Skeleton: () => null,
};

export default HistoryOrder;
