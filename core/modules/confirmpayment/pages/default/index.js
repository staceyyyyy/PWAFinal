import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@core_modules/confirmpayment/pages/default/components';
import Core from '@core_modules/confirmpayment/pages/default/core';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'payment'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
