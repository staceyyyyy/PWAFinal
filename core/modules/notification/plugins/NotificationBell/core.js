import propTypes from 'prop-types';
import { getLoginInfo } from '@helper_auth';
import { customerNotificationList } from '@core_modules/notification/services/graphql';
import Content from '@plugin_notificationbell/components';

const NotificationsBell = ({ withLink }) => {
    let isLogin = 0;
    let totalUnread = 0;
    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        if (isLogin) {
            const { data } = customerNotificationList();
            totalUnread = data
                && data.customerNotificationList
                && data.customerNotificationList.totalUnread;
        }
    }
    return (
        <Content withLink={withLink} totalUnread={totalUnread} />
    );
};

NotificationsBell.propTypes = {
    withLink: propTypes.bool.isRequired,
};

export default NotificationsBell;
