/* eslint-disable react/no-unescaped-entities */
import Account from '@core_modules/customer/pages/account/components/Customer/view/desktop/account';
import Order from '@core_modules/customer/pages/account/components/Customer/view/desktop/order';
import Address from '@core_modules/customer/pages/account/components/Customer/view/desktop/address';
import Notification from '@core_modules/customer/pages/account/components/Customer/view/desktop/notification';
import useStyles from '@core_modules/customer/pages/account/components/Customer/style';

const ViewDesktop = (props) => {
    const { t, userData, reOrder } = props;
    const { customer, notificationList, customerOrders } = userData;
    const styles = useStyles();
    return (
        <div className="hidden-mobile">
            <div className={styles.desktopContainer}>
                <Account customer={customer} styles={styles} t={t} />
                <Address customer={customer} styles={styles} t={t} />
                <Order customerOrders={customerOrders || {}} styles={styles} t={t} reOrder={reOrder} />
                <Notification notification={notificationList || {}} styles={styles} t={t} />

            </div>
        </div>
    );
};

export default ViewDesktop;
