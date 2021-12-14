import { withApollo } from '@lib_apollo';
import Loader from '@common_loaders/Backdrop';
import { withTranslation } from '@i18n';
import Core from '@core_modules/emailconfirmation/pages/default/core';

const Content = () => <Loader open />;

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => {
    const { req } = ctx;
    if (!req.query.id || !req.query.token) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', '/');
        return { props: {}, namespacesRequired: ['common', 'customer', 'validate', 'register'] };
    }
    return {
        query: req.query,
        namespacesRequired: ['common', 'customer', 'validate', 'register'],
    };
};

export default withApollo({ ssr: false })(withTranslation()(Page));
