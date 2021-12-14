import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/setting/pages/default/core';
import Content from '@core_modules/setting/pages/default/components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
