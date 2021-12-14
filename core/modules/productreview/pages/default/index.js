import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

import Content from '@core_modules/productreview/pages/default/components';
import Core from '@core_modules/productreview/pages/default/core';

const MyProductReview = (props) => <Core {...props} Content={Content} />;

MyProductReview.getInitialProps = async () => ({
    namespacesRequired: ['common', 'productreview', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(MyProductReview));
