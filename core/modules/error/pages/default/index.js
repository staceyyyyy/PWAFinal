import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import * as Sentry from '@sentry/node';
import NextErrorComponent from 'next/error';
import { sentry } from '@config';
import graphRequest from '@graphql_request';
import Core from '@core_modules/error/pages/default/core';
import Content from '@core_modules/error/pages/default/components';

const ErrorPage = (props) => <Core {...props} Content={Content} />;

ErrorPage.getInitialProps = async ({ res, err, asPath }) => {
    const errorInitialProps = await NextErrorComponent.getInitialProps({
        res,
        err,
    });
    const storeConfig = await graphRequest(ConfigSchema);

    errorInitialProps.hasGetInitialPropsRun = true;
    errorInitialProps.namespacesRequired = ['common'];
    errorInitialProps.storeConfig = storeConfig;

    if (err) {
        if (sentry.enabled) {
            Sentry.captureException(err);
            await Sentry.flush(2000);
        }

        return errorInitialProps;
    }

    // If this point is reached, getInitialProps was called without any
    // information about what the error might be. This is unexpected and may
    // indicate a bug introduced in Next.js, so record it in Sentry
    if (sentry.enabled) {
        Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
        await Sentry.flush(2000);
    }

    return errorInitialProps;
};

export default ErrorPage;
