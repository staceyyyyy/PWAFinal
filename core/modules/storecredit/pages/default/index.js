import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

import Content from '@core_modules/storecredit/pages/default/components';
import Core from '@core_modules/storecredit/pages/default/core';

const StoreCredit = (props) => <Core {...props} Content={Content} />;

StoreCredit.getInitialProps = async () => ({
    namespacesRequired: ['common', 'storecredit', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(StoreCredit));
