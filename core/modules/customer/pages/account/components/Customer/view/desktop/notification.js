/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Router from 'next/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import formatDate from '@helper_date';

const NotificationView = (props) => {
    const { notification, styles, t } = props;
    const handleItemClick = (item) => {
        Router.push({
            pathname: '/inboxnotification/notification/data',
            query: { notif: item.entityId },
        });
    };
    return (
        <>
            <h2 className={styles.infoTitle}>
                {t('customer:menu:notification')}
                <Link href="/inboxnotification/notification">
                    <a className={styles.desktopLinkHeader}>{t('customer:menu:viewall')}</a>
                </Link>
            </h2>
            <hr />
            <div className="row notification">
                <div className="col-sm-12 col-lg-12">
                    {
                        notification && notification.items && notification.totalUnread && notification.totalUnread && (
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                        {notification.items ? (
                                            notification.items.map((val, idx) => {
                                                if (val.unread) {
                                                    return (
                                                        <TableRow
                                                            className="notification-list"
                                                            key={idx}
                                                            onClick={() => handleItemClick(val)}
                                                        >
                                                            <TableCell>{val.subject}</TableCell>
                                                            <TableCell align="right">{formatDate(val.createdAt)}</TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                                return null;
                                            })

                                        ) : null }
                                        {!notification.totalUnread || notification.totalUnread === 0
                                            ? (
                                                <TableRow>
                                                    <TableCell align="center" colSpan="2">{t('customer:notHaveNotification')}</TableCell>
                                                </TableRow>
                                            )
                                            : null}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default NotificationView;
