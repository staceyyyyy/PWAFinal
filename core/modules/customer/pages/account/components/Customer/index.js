// Library
import React from 'react';
import { modules } from '@config';
import Layout from '@layout_customer';
import gqlService from '@core_modules/customer/services/graphql';

const Customer = (props) => {
    const {
        t, Skeleton, CustomerView, storeConfig, isLogin, reOrder, ...other
    } = props;
    let userData = {};
    let wishlist = [];
    const { data, loading, error } = gqlService.getCustomer();
    const { data: customerNotificationList } = gqlService.customerNotificationList();
    const { data: customerOrders } = gqlService.getCustomerOrder();
    const totalUnread = customerNotificationList
        && customerNotificationList.customerNotificationList
        && customerNotificationList.customerNotificationList.totalUnread;

    if (!data || loading || error) {
        return (
            <Layout {...props}>
                <Skeleton />
            </Layout>
        );
    }
    if (data) {
        userData = data;
        if (modules.wishlist.enabled) {
            wishlist = data.customer
                && data.customer.wishlist
                && data.customer.wishlist.items.map(({ product }) => ({
                    ...product,
                    name: product.name,
                    link: product.url_key,
                    imageSrc: product.small_image.url,
                    price: product.price_range.minimum_price.regular_price.value,
                    showWishlistAction: false,
                }));
        }
    }

    if (customerNotificationList && customerNotificationList.customerNotificationList) {
        userData = { ...userData, notificationList: customerNotificationList.customerNotificationList };
    }
    if (customerOrders && customerOrders.customerOrders) {
        userData = { ...userData, customerOrders: customerOrders.customerOrders };
    }

    const pushIf = (condition, ...elements) => (condition ? elements : []);

    const menu = [
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/customer/account/profile', title: t('customer:menu:myAccount') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        ...pushIf(wishlist.length && modules.wishlist.enabled <= 0, {
            href: '/wishlist',
            title: 'Wishlist',
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card',
            title: 'Gift Card',
        }),
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit',
            title: t('customer:menu:storeCredit'),
        }),
        ...pushIf(modules.notification.enabled, {
            href: '/inboxnotification/notification',
            title: t('notification:notification'),
        }),
        { href: '/customer/newsletter', title: t('customer:setting:newsletter') },
        ...pushIf(modules.rma.enabled, {
            href: '/rma/customer',
            title: t('customer:menu:return'),
        }),
    ];

    return (
        <Layout {...props}>
            <CustomerView
                {...other}
                t={t}
                modules={modules}
                menu={menu}
                userData={userData}
                totalUnread={totalUnread}
                wishlist={wishlist}
                storeConfig={storeConfig}
                isLogin={isLogin}
                reOrder={reOrder}
            />
        </Layout>
    );
};

export default Customer;
