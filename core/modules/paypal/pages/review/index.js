/* eslint-disable react/destructuring-assignment */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import Core from '@core_modules/paypal/pages/review/core';

const Page = (props) => (
    <Core
        {...props}
        pageConfig={{
            title: props.t('checkout:paypal:reviewPage'),
            header: 'relative', // available values: "absolute", "relative", false (default)
            headerTitle: props.t('checkout:paypal:reviewPage'),
            pageType: 'checkout',
        }}
    />
);

Page.getInitialProps = async (ctx) => {
    const {
        req,
    } = ctx;

    const { checkoutOnly } = modules.checkout;
    const data = typeof window === 'undefined' ? req.cookies : Cookies.getJSON();
    const cartId = data.nci || null;

    let urlRedirect = '/checkout/cart';
    if (checkoutOnly) {
        urlRedirect = getStoreHost(getAppEnv());
    }

    if (!cartId) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', urlRedirect);
            return { props: {}, namespacesRequired: ['common', 'checkout'] };
        }
        if (typeof window !== 'undefined') Router.push(urlRedirect);
    }

    return {
        namespacesRequired: ['common', 'checkout'],
        cartId,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
