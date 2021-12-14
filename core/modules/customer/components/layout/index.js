/* eslint-disable no-plusplus */
import { modules } from '@config';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Typography from '@common_typography';
import useStyles from '@layout_customer/style';

const Layout = (props) => {
    const {
        children, t, title, activeMenu,
    } = props;
    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const styles = useStyles();
    const router = useRouter();
    let titlePage = '';

    const menu = [
        { href: '/customer/account', title: t('customer:menu:myAccount') },
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/sales/downloadable/history', title: t('customer:menu:myDownload') },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        ...pushIf(modules.productreview.enabled, {
            href: '/review/customer',
            title: t('customer:menu:myProductReview'),
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
            title: t('customer:menu:notification'),
        }),
        { href: '/customer/newsletter', title: t('customer:setting:newsletter') },
        ...pushIf(modules.rma.enabled, {
            href: '/rma/customer',
            title: t('customer:menu:return'),
        }),
        ...pushIf(modules.rewardpoint.enabled, {
            href: '/aw_rewardpoints/info',
            title: t('customer:menu:rewardPoint'),
        }),
        ...pushIf(modules.wishlist.enabled, {
            href: '/wishlist',
            title: t('customer:wishlist:pageTitle'),
        }),
    ];
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        if (item.href === router.asPath) {
            titlePage = item.title;
        }
    }
    return (
        <div className="row">
            <div className="col-md-2 col-xs-12 hidden-mobile">
                <div className={styles.listMenuContainer}>
                    <ul className={styles.listMenu}>
                        {menu.map((val, idx) => (
                            <li
                                key={idx}
                                className={
                                    router.asPath === val.href || val.href === activeMenu
                                        ? classNames(styles.listMenuItem, styles.listMenuItemActive)
                                        : styles.listMenuItem
                                }
                            >
                                <Link href={val.href}>
                                    <a>{val.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-md-10 col-xs-12 col-sm-12">
                <Typography variant="h4" type="bold" letter="capitalize" className={classNames('hidden-mobile', styles.titleContent)}>
                    {title || titlePage}
                </Typography>
                {children}
            </div>
        </div>
    );
};

export default Layout;
