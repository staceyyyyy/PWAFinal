import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { removeIsLoginFlagging, setEmailConfirmationFlag } from '@helpers/auth';
import { removeCartId } from '@helpers/cartId';
import { confirmEmail, deleteSession } from '@core_modules/emailconfirmation/services/graphql';
import Error from '@core_modules/emailconfirmation/components/Error';

const emailconfirmation = (props) => {
    const router = useRouter();
    const { id, token } = router.query;
    const { Content, t } = props;
    const [authFailed, setAuthFailed] = React.useState(false);
    const [load, setLoad] = React.useState(true);

    const [confirmEmailGql] = confirmEmail();
    const [deleteSessionGql] = deleteSession();

    React.useEffect(() => {
        if (id && token) {
            // eslint-disable-next-line radix
            const variables = { id: parseInt(id), token };
            // reset login and cart id first
            removeCartId();
            removeIsLoginFlagging();

            deleteSessionGql().then(() => {
                confirmEmailGql({ variables }).then(({ data: { confirmEmailRegistration } }) => {
                    if (confirmEmailRegistration.status === '00') {
                        setEmailConfirmationFlag({ status: '00', message: t('register:success'), variant: 'success' });
                        window.location.href = `/authentication?state=${confirmEmailRegistration.state}`;
                    } else {
                        setEmailConfirmationFlag({ status: '02', message: t('register:failed'), variant: 'error' });
                        window.location.href = '/';
                    }
                });
            }).catch(() => {
                setAuthFailed(true);
                setLoad(false);
                // backToStore();
            });
        }
    }, [id, token]);

    if (load) {
        return (
            <>
                <Head>
                    <title>Loading...</title>
                </Head>
                <Content />
            </>
        );
    }

    if (authFailed) {
        return (
            <>
                <Head>
                    <title>Loading...</title>
                </Head>
                <Error t={t} />
            </>
        );
    }

    return <Content />;
};

export default emailconfirmation;
