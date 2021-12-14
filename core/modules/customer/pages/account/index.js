import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

import Core from '@core_modules/customer/pages/account/core';
import Skeleton from '@core_modules/customer/pages/account/components/Skeleton';
import CustomerView from '@core_modules/customer/pages/account/components/Customer/view';
import GuestView from '@core_modules/customer/pages/account/components/Guest';

const Page = (props) => (
    <Core
        {...props}
        CustomerView={CustomerView}
        Skeleton={Skeleton}
        GuestView={GuestView}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'rewardpoint', 'productreview'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
