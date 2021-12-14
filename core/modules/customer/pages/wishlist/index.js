import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import Core from '@core_modules/customer/pages/wishlist/core';

const Content = dynamic(() => import('./components'), { ssr: false });
const Skeleton = dynamic(() => import('./components/skeleton'), { ssr: false });

const Page = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
    withAuth: true,
});

export default withApollo({ ssr: false })(withTranslation()(Page));
