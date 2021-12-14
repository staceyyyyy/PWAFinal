import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/detail/core';
import Content from '@core_modules/order/pages/detail/components';
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
