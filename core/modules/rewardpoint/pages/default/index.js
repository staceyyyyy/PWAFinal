import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/rewardpoint/pages/default/core';
import Content from '@core_modules/rewardpoint/pages/default/components';
import Skeleton from '@core_modules/rewardpoint/pages/default/components/skeleton';
import ErrorView from '@core_modules/rewardpoint/pages/default/components/error';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'rewardpoint', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
