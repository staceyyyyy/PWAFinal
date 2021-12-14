import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/register/pages/default/core';
import Content from '@core_modules/register/pages/default/components';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'register', 'validate'],
    query: ctx.query,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
