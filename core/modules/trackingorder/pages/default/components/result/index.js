/* eslint-disable prefer-destructuring */
import { getTrackingOrder } from '@core_modules/trackingorder/services/graphql';

const Result = ({
    t, orderField, ResultView, SkeletonResult, ...other
}) => {
    const { email, order_id } = orderField;
    const { loading, data } = getTrackingOrder({ email, order_id });
    return (
        <>
            {(loading || !data || (data && !data.ordersFilter)) ? <SkeletonResult /> : (
                <ResultView {...other} t={t} orders={data.ordersFilter} />
            )}
        </>
    );
};

export default Result;
