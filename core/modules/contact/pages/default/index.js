import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Skeleton from '@core_modules/contact/pages/default/components/skeleton';
import Content from '@core_modules/contact/pages/default/components';
import ErrorInfo from '@core_modules/contact/pages/default/components/ErrorInfo';
import Core from '@core_modules/contact/pages/default/core';

const Page = (props) => (<Core {...props} Content={Content} ErrorInfo={ErrorInfo} Skeleton={Skeleton} />);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'contact', 'validate'] });

export default withApollo({ ssr: true })(withTranslation()(Page));
