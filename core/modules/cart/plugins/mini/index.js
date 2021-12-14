import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@plugin_minicart/core';
import Content from '@plugin_minicart/components';

const DefaultMiniCart = (props) => <Core {...props} Content={Content} />;

DefaultMiniCart.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultMiniCart));
