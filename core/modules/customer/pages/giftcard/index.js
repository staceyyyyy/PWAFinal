import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/giftcard/core';
import Content from '@core_modules/customer/pages/giftcard/components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
    withAuth: true,
});

export default withApollo({ ssr: false })(withTranslation()(Page));
