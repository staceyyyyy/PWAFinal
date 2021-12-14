import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Router from 'next/router';
import Content from '@core_modules/customer/pages/newpassword/components';
import Core from '@core_modules/customer/pages/newpassword/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async ({ query, res }) => {
    if (query.token === '' || !query.token) {
        if (typeof window !== 'undefined') Router.push('/');
        else res.redirect('/');
    }
    return {
        query,
        namespacesRequired: ['common', 'customer', 'validate'],
    };
};

export default withApollo({ ssr: false })(withTranslation()(Page));
