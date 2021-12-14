import Layout from '@layout';
import { useRouter } from 'next/router';
import { readNotification as gqlReadNotification } from '@core_modules/notification/services/graphql';

const DetailNotification = (props) => {
    const {
        t, Content, pageConfig,
    } = props;

    const config = {
        title: t('notification:notificationData:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('notification:notificationData:pageTitle'),
        bottomNav: false,
    };
    const router = useRouter();

    const [readNotification, readNotificationStatus] = gqlReadNotification();

    React.useEffect(() => {
        if (!router.query.notif) {
            router.push('/inboxnotification/notification');
        } else {
            readNotification({
                variables: { entityId: Number(router.query.notif) },
            });
        }
    }, []);

    const {
        called, loading, data, error,
    } = readNotificationStatus;
    if (!called) return null;

    const localDateString = (stringTime) => new Date(stringTime).toLocaleDateString(
        {},
        {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
        },
    );

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                loading={loading}
                error={error}
                data={data}
                localDateString={localDateString}
            />
        </Layout>
    );
};

export default DetailNotification;
