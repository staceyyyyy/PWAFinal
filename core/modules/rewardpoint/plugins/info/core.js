/* eslint-disable no-nested-ternary */
import { getRewardPoint } from '@core_modules/rewardpoint/services/graphql';

const RewardPointInfo = ({ Content, t }) => {
    const { data, loading, error } = getRewardPoint({
        pageSize: 1,
        currentPage: 1,
    });
    return <Content t={t} data={data} loading={loading} error={error} />;
};

export default RewardPointInfo;
