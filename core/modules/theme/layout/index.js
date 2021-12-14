/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {
    custDataNameCookie, features, modules, debuging,
} from '@config';
import { getHost } from '@helper_config';
import { breakPointsUp } from '@helper_theme';
import { setCookies, getCookies } from '@helper_cookies';
import { getAppEnv } from '@helpers/env';
import useStyles from '@core_modules/theme/layout/style';
import { createCompareList } from '@core_modules/product/services/graphql';

import PopupInstallAppMobile from '@core_modules/theme/components/custom-install-popup/mobile';
import Copyright from '@core_modules/theme/components/footer/desktop/components/copyright';

const GlobalPromoMessage = dynamic(() => import('@core_modules/theme/components/globalPromo'), { ssr: false });
const BottomNavigation = dynamic(() => import('@common_bottomnavigation'), { ssr: false });
const HeaderMobile = dynamic(() => import('@common_headermobile'), { ssr: false });
const HeaderDesktop = dynamic(() => import('@common_headerdesktop'), { ssr: true });
const Message = dynamic(() => import('@common_toast'), { ssr: false });
const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const ScrollToTop = dynamic(() => import('@common_scrolltotop'), { ssr: false });
const Footer = dynamic(() => import('@common_footer'), { ssr: false });
const RestrictionPopup = dynamic(() => import('@common_restrictionPopup'), { ssr: false });
const Newsletter = dynamic(() => import('@plugin_newsletter'), { ssr: false });
const NewsletterPopup = dynamic(() => import('@core_modules/theme/components/newsletterPopup'), { ssr: false });
const RecentlyViewed = dynamic(() => import('@core_modules/theme/components/recentlyViewed'), { ssr: false });

const Layout = (props) => {
    const bodyStyles = useStyles();
    const {
        pageConfig,
        children,
        app_cookies,
        CustomHeader = false,
        i18n,
        storeConfig = {},
        isLogin,
        headerProps = {},
        t,
        onlyCms,
        withLayoutHeader = true,
        withLayoutFooter = true,
        showRecentlyBar = true,
    } = props;
    const {
        ogContent = {}, schemaOrg = null, headerDesktop = true, footer = true,
    } = pageConfig;
    const router = useRouter();
    const appEnv = getAppEnv();
    const [state, setState] = useState({
        toastMessage: {
            open: false,
            variant: 'success',
            text: '',
        },
        backdropLoader: false,
    });
    const [restrictionCookies, setRestrictionCookies] = useState(false);
    const [showGlobalPromo, setShowGlobalPromo] = React.useState(false);
    const [setCompareList] = createCompareList();
    // const [mainMinimumHeight, setMainMinimumHeight] = useState(0);
    const refFooter = useRef(null);
    const refHeader = useRef(null);

    const handleSetToast = (message) => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...message,
            },
        });
    };

    const handleLoader = (status = false) => {
        setState({
            ...state,
            backdropLoader: status,
        });
    };

    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };

    const handleRestrictionCookies = () => {
        setRestrictionCookies(true);
        setCookies('user_allowed_save_cookie', true);
    };

    const handleClosePromo = () => {
        setShowGlobalPromo(false);
    };

    const ogData = {
        'og:title': pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa',
        'og:image': storeConfig.header_logo_src
            ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
            : `${getHost()}/assets/img/swift-logo.png`,
        'og:image:type': 'image/png',
        'og:url': `${getHost()}${router.asPath}`,
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        'og:type': 'website',
        ...ogContent,
    };

    if (!ogData['og:description']) {
        ogData['og:description'] = storeConfig.default_description || '';
    }

    if (features.facebookMetaId.enabled) {
        ogData['fb:app_id'] = features.facebookMetaId.app_id;
    }

    React.useEffect(() => {
        if (!isLogin && modules.productcompare.enabled) {
            const uid_product = getCookies('uid_product_compare');
            if (!uid_product) {
                setCompareList({
                    variables: {
                        uid: [],
                    },
                })
                    .then(async (res) => {
                        setCookies('uid_product_compare', res.data.createCompareList.uid);
                    })
                    .catch((e) => {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                        });
                    });
            }
        }
    }, [isLogin]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.toastMessage = handleSetToast;
            window.backdropLoader = handleLoader;
            const custData = Cookies.getJSON(custDataNameCookie);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) tagManagerArgs.dataLayer.customerId = custData.email;
            TagManager.dataLayer(tagManagerArgs);
        }
        // setMainMinimumHeight(refFooter.current.clientHeight + refHeader.current.clientHeight);
    }, []);

    useEffect(() => {
        const isRestrictionMode = getCookies('user_allowed_save_cookie');
        if (isRestrictionMode) {
            setRestrictionCookies(isRestrictionMode);
        }
        if (typeof window !== 'undefined') {
            const enablePromo = getCookies(features.globalPromo.key_cookies);
            if (enablePromo !== '' && storeConfig.global_promo && storeConfig.global_promo.enable) {
                setShowGlobalPromo(enablePromo);
            } else if (storeConfig.global_promo && storeConfig.global_promo.enable) {
                setShowGlobalPromo(true);
            }
        }
    }, []);
    const desktop = breakPointsUp('sm');

    const styles = {
        marginBottom: pageConfig.bottomNav ? '60px' : 0,
    };

    if (!headerDesktop) {
        styles.marginTop = 0;
    }

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content={pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}
                />
                <meta name="robots" content={appEnv === 'production' ? 'INDEX,FOLLOW' : 'NOINDEX,NOFOLLOW'} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="description" content={ogData['og:description']} />
                {Object.keys(ogData).map((key, idx) => {
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        return <meta name={`${key}`} content={ogData[key].value} key={idx} />;
                    }
                    return <meta property={`${key}`} content={ogData[key]} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}</title>
                {schemaOrg
                    ? schemaOrg.map((val, idx) => (
                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} key={idx} />
                    ))
                    : null}
            </Head>
            {features.customInstallApp.enabled && !onlyCms ? <PopupInstallAppMobile /> : null}
            {withLayoutHeader && (
                <header ref={refHeader}>
                    { typeof window !== 'undefined'
                        && storeConfig.global_promo && storeConfig.global_promo.enable
                        && (
                            <GlobalPromoMessage
                                t={t}
                                storeConfig={storeConfig}
                                showGlobalPromo={showGlobalPromo}
                                handleClose={handleClosePromo}
                            />
                        )}
                    <div className="hidden-mobile">
                        {headerDesktop
                            ? (
                                <HeaderDesktop
                                    storeConfig={storeConfig}
                                    isLogin={isLogin}
                                    t={t}
                                    app_cookies={app_cookies}
                                    showGlobalPromo={showGlobalPromo}
                                />
                            )
                            : null}
                    </div>
                    <div className="hidden-desktop">
                        {React.isValidElement(CustomHeader) ? (
                            <>{React.cloneElement(CustomHeader, { pageConfig, ...headerProps })}</>
                        ) : (
                            <HeaderMobile {...headerProps} pageConfig={pageConfig} />
                        )}
                    </div>
                </header>
            )}

            <main style={{ ...styles }} className={!onlyCms ? 'main-app' : 'main-app main-app-cms'} id="maincontent">
                <Loading open={state.backdropLoader} />
                <Message
                    open={state.toastMessage.open}
                    variant={state.toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={state.toastMessage.text}
                />
                {storeConfig.weltpixel_newsletter_general_enable === '1' && (
                    <NewsletterPopup t={t} storeConfig={storeConfig} pageConfig={pageConfig} isLogin={isLogin} />
                )}
                {children}
                {desktop ? <ScrollToTop {...props} /> : null}
            </main>
            {withLayoutFooter && (
                <footer className={bodyStyles.footerContainer} ref={refFooter}>
                    <div className="hidden-mobile">
                        {modules.customer.plugin.newsletter.enabled && footer ? <Newsletter /> : null}

                        {footer ? <Footer storeConfig={storeConfig} /> : null}
                        <Copyright storeConfig={storeConfig} />
                    </div>
                    {desktop ? null : <BottomNavigation active={pageConfig.bottomNav} />}
                </footer>
            )}
            {
                storeConfig.cookie_restriction && !restrictionCookies
                && (
                    <RestrictionPopup
                        handleRestrictionCookies={handleRestrictionCookies}
                        restrictionStyle={bodyStyles.cookieRestriction}
                    />
                )
            }
            {
                showRecentlyBar && !onlyCms && (
                    <RecentlyViewed
                        isActive={storeConfig && storeConfig.weltpixel_RecentlyViewedBar_general_enable}
                        recentlyBtn={bodyStyles.recentView}
                        wrapperContent={bodyStyles.recentlyWrapperContent}
                        recentlyBtnContent={bodyStyles.recentlyBtnContent}
                        contentFeatured={bodyStyles.contentFeatured}
                        className={bodyStyles.itemProduct}
                    />
                )
            }
        </>
    );
};

export default Layout;
