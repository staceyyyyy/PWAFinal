/* eslint-disable react/no-unescaped-entities */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@common_typography';
import Alert from '@material-ui/lab/Alert/Alert';
import Layout from '@layout_customer';
import Skeleton from '@core_modules/notification/pages/list/components/skeleton';

const NotificationList = (props) => {
    const {
        t, data, handleItemClick, localDateString, loading, error,
    } = props;

    if (loading) return <Layout {...props}><Skeleton /></Layout>;
    if (error) return <Layout {...props}><Alert severity="error">{`Error: ${error.message}`}</Alert></Layout>;
    if (!data) return <Layout {...props}><Alert severity="error">{t('notification:not_found')}</Alert></Layout>;

    if (data.customerNotificationList.items.length === 0) {
        return (
            <Layout {...props}>
                <Alert severity="error">
                    {t('notification:empty')}
                </Alert>
            </Layout>
        );
    }
    return (
        <Layout {...props}>
            <div className="container" style={{ paddingTop: 0 }}>
                <List>
                    {data.customerNotificationList.items.map((item, i) => (
                        <ListItem key={i} divider button onClick={() => handleItemClick(item)}>
                            <ListItemText
                                primary={(
                                    <Typography variant="label" type={item.unread ? 'bold' : 'regular'} size="14">
                                        {item.subject}
                                    </Typography>
                                )}
                                secondary={(
                                    <Typography variant="label" type={item.unread ? 'bold' : 'regular'}>
                                        {localDateString(item.createdAt)}
                                    </Typography>
                                )}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Layout>
    );
};

export default NotificationList;
