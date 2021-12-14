import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/country/pages/default/core';
const Page = (props) => (<Core {...props} />);
Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['country'],
    query: ctx.query,
});
export default withApollo({ ssr: true })(withTranslation()(Page));