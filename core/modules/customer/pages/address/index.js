import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import Core from '@core_modules/customer/pages/address/core';
import Content from '@core_modules/customer/pages/address/components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
