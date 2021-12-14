import React from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { setLogin, removeIsLoginFlagging } from '@helpers/auth';
import {
    modules, expiredToken, expiredDefault, nameCheckoutState,
} from '@config';
import { setCartId, removeCartId } from '@helpers/cartId';
import { updatePwaCheckoutLog } from '@services/graphql/repository/log';
import { generateSession, deleteSession } from '@core_modules/authentication/services/graphql';
import Error from '@core_modules/authentication/components/Error';

// const counter = 3; // seconds

// const backToStore = (redirect_path = '/') => {
//     setTimeout(() => {
//         window.location.replace(redirect_path);
//     }, counter * 1000);
// };

const Authentication = (props) => {
    const router = useRouter();
    const { state } = router.query;
    const {
        Content, storeConfig, t,
    } = props;
    const [authFailed, setAuthFailed] = React.useState(false);
    const [load, setLoad] = React.useState(true);

    const [generateSessionGql] = generateSession();
    const [deleteSessionGql] = deleteSession();
    const [actUpdatePwaCheckoutLog] = updatePwaCheckoutLog();

    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    let objectProps = {
        cartId: '',
        isLogin: false,
        redirect_path: '',
    };

    React.useEffect(() => {
        if (state) {
            const variables = {
                state,
            };

            // reset login and cart id first
            removeCartId();
            removeIsLoginFlagging();

            deleteSessionGql().then(() => {
                generateSessionGql({ variables }).then(({ data }) => {
                    const {
                        result, cartId, isLogin,
                    } = data.internalGenerateSession;
                    if (result) {
                        if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                            Cookies.set(nameCheckoutState, state, { expires: expiredDefault });
                        }

                        objectProps = data.internalGenerateSession;
                        if (isLogin) {
                            // console.log('chekcout as logged-in customer');
                            setLogin(1, expired);
                        }
                        setCartId(cartId, expired);
                        setLoad(false);
                        if (objectProps && objectProps.redirect_path && objectProps.redirect_path !== '') {
                            router.replace(objectProps.redirect_path);
                        } else {
                            router.replace('/');
                        }
                    } else {
                        setAuthFailed(true);
                        setLoad(false);

                        if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                            actUpdatePwaCheckoutLog({
                                variables: {
                                    cart_id: cartId,
                                    state: encodeURIComponent(state),
                                    status: 0,
                                },
                            });
                        }
                        // backToStore(redirect_path || '/');
                    }
                }).catch(() => {
                    setAuthFailed(true);
                    setLoad(false);
                    if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                        actUpdatePwaCheckoutLog({
                            variables: {
                                cart_id: '',
                                state: encodeURIComponent(state),
                                status: 0,
                            },
                        });
                    }
                    // backToStore();
                });
            }).catch(() => {
                setAuthFailed(true);
                setLoad(false);
                if (modules.checkout.checkoutOnly && storeConfig.pwa_checkout_debug_enable === '1') {
                    actUpdatePwaCheckoutLog({
                        variables: {
                            cart_id: '',
                            state: encodeURIComponent(state),
                            status: 0,
                        },
                    });
                }
                // backToStore();
            });
        }
    }, [state]);

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

export default Authentication;
