import Layout from '@layout';

const SettingPage = (props) => {
    const {
        t, Content, pageConfig, app_cookies,
    } = props;

    const config = {
        title: t('common:setting:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('common:setting:title'),
        bottomNav: false,
    };

    /**
     * [PROPS] [CONTENT]
     */
    const propsContent = {
        t,
        app_cookies,
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content {...propsContent} />
        </Layout>
    );
};

export default SettingPage;
