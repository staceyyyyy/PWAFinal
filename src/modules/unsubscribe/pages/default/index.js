import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/unsubscribe/pages/default/core';
const Page = (props) => (<Core {...props} />);
Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['unsubscribe'],
    query: ctx.query,
});
export default withApollo({ ssr: true })(withTranslation()(Page));