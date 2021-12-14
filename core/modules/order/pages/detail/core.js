import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { features } from '@config';
import { setCartId } from '@helper_cartid';
import { getHost } from '@helpers/config';
import Alert from '@material-ui/lab/Alert';
import { getOrderDetail, reOrder as mutationReorder, getPaymentInformation } from '@core_modules/order/services/graphql';

const OrderDetail = (props) => {
    const {
        t, Content, Skeleton, ...other
    } = props;
    const { storeConfig } = other;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    let pageConfig = {
        title: `${t('order:order')}  `,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };
    const [params] = React.useState({
        order_id: id,
    });
    const { loading, data, error } = getOrderDetail(params);
    const { loading: loadingPaymentInfo, data: paymentInfo, error: errorPaymentInfo } = getPaymentInformation(params);
    const [actionReorder] = mutationReorder();
    if (error || errorPaymentInfo) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Alert className="m-15" severity="error">
                        {t('common:error:fetchError')}
                    </Alert>
                </CustomerLayout>
            </Layout>
        );
    }
    if (loading || !data || loadingPaymentInfo || !paymentInfo) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }
    if (!loading && data && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }
    const currency = detail.length > 0 ? detail[0].detail[0].global_currency_code : storeConfig.base_currency_code;

    pageConfig = {
        title: `${t('order:order')} # ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };

    const reOrder = () => {
        if (id && id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id: id,
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
                detail={detail}
                currency={currency}
                features={features}
                returnUrl={returnUrl}
                reOrder={reOrder}
                paymentInfo={paymentInfo.OrderPaymentInformation}
            />
        </Layout>
    );
};

OrderDetail.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

OrderDetail.defaultProps = {
    Content: () => { },
    Skeleton: () => { },
};

export default OrderDetail;
