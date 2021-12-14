import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Skeleton from '@core_modules/rma/pages/history/components/Skeleton';
import CoreBase from '@core_modules/rma/pages/history/core';
import WarningInfo from '@core_modules/rma/pages/history/components/Info';
import Content from '@core_modules/rma/pages/history/components';

const Page = (props) => (
    <CoreBase
        Content={Content}
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
