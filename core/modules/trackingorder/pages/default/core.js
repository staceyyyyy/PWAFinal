import PropTypes from 'prop-types';
import Layout from '@layout';
import { getCustomer, getTrackingOrder } from '@core_modules/trackingorder/services/graphql';
import Content from '@core_modules/trackingorder/pages/default/components/form';

const Tracking = (props) => {
    let customer = {};
    const {
        isLogin, Skeleton, pageConfig, t,
    } = props;
    const config = {
        title: t('trackingorder:trackingOrder'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('trackingorder:trackingOrder'),
        bottomNav: false,
    };

    const [orderField, setOrderField] = React.useState({
        email: '',
        order_id: '',
    });
    const [getTrackOrder, { loading, data, error }] = getTrackingOrder({ ...orderField });

    if (isLogin) {
        const { data: dataCustomer, loading: loadCustomer } = getCustomer();
        if (loadCustomer) {
            return (
                <Layout {...props} pageConfig={pageConfig || config}>
                    <Skeleton />
                </Layout>
            );
        }
        if (dataCustomer && dataCustomer.customer) {
            customer = dataCustomer.customer;
        }
    }
    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                {...props}
                email={customer.email || ''}
                getTrackOrder={getTrackOrder}
                loading={loading}
                data={data}
                error={error}
                orderField={orderField}
                setOrderField={setOrderField}
            />
        </Layout>
    );
};

Tracking.propTypes = {
    FormView: PropTypes.func,
    Skeleton: PropTypes.func,
    SkeletonResult: PropTypes.func,
    ResultView: PropTypes.func,
};

Tracking.defaultProps = {
    FormView: () => { },
    Skeleton: () => { },
    SkeletonResult: () => { },
    ResultView: () => { },
};

export default Tracking;
