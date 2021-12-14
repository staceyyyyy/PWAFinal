import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/trackingorder/pages/default/core';
import Skeleton from '@core_modules/trackingorder/pages/default/components/skeletonform';
import FormView from '@core_modules/trackingorder/pages/default/components/form/view';
import ResultView from '@core_modules/trackingorder/pages/default/components/result/view';
import SkeletonResult from '@core_modules/trackingorder/pages/default/components/skeletonresult';
import DetailView from '@core_modules/trackingorder/pages/default/components/modal';

const DefaultTracking = (props) => (
    <Core
        {...props}
        FormView={FormView}
        ResultView={ResultView}
        Skeleton={Skeleton}
        SkeletonResult={SkeletonResult}
        DetailView={DetailView}
    />
);

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));
