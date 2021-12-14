/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */
const useMagentoCommerce = false; // setup uses magento commerce or community
const storeCode = ''; // fill it with any store code when the magento is setup with multiple stores. leave it empty to use default store.
const assetsVersion = '1.0.6';
const iconAppleTouch = '/assets/img/swiftpwa_apple_touch.png';

const HOST = {
    local: 'http://localhost:3000',
    dev: 'https://swiftpwa.testingnow.me',
    stage: 'https://getswift-pwa.gcp-staging.testingnow.me/',
    prod: 'https://pwa.getswift.asia',
};

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    local: 'https://swift-sprint.testingnow.me/graphql',
    dev: 'https://swift-sprint.testingnow.me/graphql',
    stage: 'https://b2cdemonew.gcp-staging.testingnow.me/graphql',
    prod: 'https://b2cdemo.getswift.asia/graphql',
};

/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

const installMessage = 'Get our free app.';
const appName = 'Swift APP';

/* Social Sharing */
const shareIcon = {
    facebook: true,
    twitter: true,
    line: true,
    email: true,
    telegram: true,
    pinterest: false,
    linkedin: false,
};

/* Password Validator */
const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

/* Translation */
const translation = {
    defaultLanguage: 'en', // just change to your default language
    languages: ['en', 'id'], // array code language what you want
    // language label code
    languagesLabel: {
        en: 'English',
        id: 'Indonesia',
    },
};

/* Google Tag Manager
 * before enable this configuration, firstly you need to import the gtm tags json.
 * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
 * adjust the tag name if you want before import into GTM dashboard setting.
 * as reference you can find sample gtm tags in folder "sample/gtm" folder
 * NOTE: this GTM functionality includes connecting to GA via GTM tag.
 */
const GTM = {
    enable: false,
    gtmId: {
        local: '', // sample: GTM-N76V8KQ
        dev: '', // sample: GTM-N76V8KQ
        stage: '', // sample: GTM-N76V8KQ
        prod: '', // sample: GTM-N76V8KQ
    },
};

/* Recapthca Configuration */
const recaptcha = {
    enable: false,
    siteKey: {
        local: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        dev: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        stage: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        prod: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
    },
    serverKey: {
        local: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        dev: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        stage: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        prod: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
    },
};

// error management monitoring
const sentry = {
    enabled: false,
    enableMode: 'production',
    dsn: {
        local: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        dev: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        stage: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        prod: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
    },
};

const rollbar = {
    enabled: false,
    config: {
        accessToken: '76876f52664341b4a1981c4618723bda',
        captureUncaught: true,
        captureUnhandledRejections: true,
    },
};

/* Contact Us */
// identifiers for cmsBlocks in contact page
const cmsContactIdentifiers = 'weltpixel_contact_page';

/* Dashboard */
// identifiers for cmsBlocks in contact page
const cmsSocialMediaLinkIdentifiers = 'pwa_socmed_links';

/* Social media link */
// social media link in dashboard
const enableSocialMediaLink = true;

/* Loader */
const loaderImage = '/assets/img/loader.svg';

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCookies = 6;
const storeConfigNameCookie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';
const nameCheckoutCookie = 'ccdt';
const nameCheckoutState = 'ncs';
const nameGlobalCookie = 'spwa';
const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
const expiredDefault = 365;
const localResolverKey = 'resolver';

const features = {
    useCustomStyle: false,
    ssrCache: false,
    magezon: {
        instagramFeed: {
            // eslint-disable-next-line max-len
            urlGraph: 'https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=',
        },
        keyStorage: 'mgz_ig_token',
    },
    crm: {
        enabled: false,
        graphqlEndpoint: {
            local: 'http://swiftcrm.testingnow.me/graphql',
            dev: 'http://swiftcrm.testingnow.me/graphql',
            stage: 'http://swiftcrm.testingnow.me/graphql',
            prod: 'http://swiftcrm.testingnow.me/graphql',
        },
    },
    facebookMetaId: {
        enabled: false,
        app_id: '3080154482073095', // if enabled add fb app id here. e.g. 3080154482073095
    },
    // masuk module -> pindah jika module sudah siap
    productAvailableToCart: {
        SimpleProduct: true,
        ConfigurableProduct: true,
        VirtualProduct: true,
        GroupedProduct: true,
        BundleProduct: true,
        DownloadableProduct: false,
        AwGiftCardProduct: true,
    },
    imageSize: {
        product: {
            width: 240,
            height: 300,
        },
        homeSlider: {
            mobile: {
                width: 960,
                height: 1120,
            },
            desktop: {
                width: 1800,
                height: 750,
            },
        },
        magezonSlider: {
            mobile: {
                width: 1800,
                height: 750,
            },
            desktop: {
                width: 1800,
                height: 750,
            },
        },
        category: {
            width: 960,
            height: 577,
        },
        promoBannerLite: {
            top: {
                width: 1300,
            },
            label: {
                width: 350,
            },
            after: {
                width: 350,
            },
        },
    },
    vesMenu: {
        enabled: true,
        alias: 'top-menu',
    },
    customInstallApp: {
        enabled: true,
    },
    firebase: {
        config: {
            apiKey: '', // sample: AIzaSyCt9ks21BjiE9qirv-8xOEcUnUnH6viobw
            authDomain: '', // sample: swift-pwa-dev.firebaseapp.com
            databaseURL: '', // sample: https://swiftpwa-firebase.firebaseio.com
            projectId: '', // sample: swift-pwa-dev
            storageBucket: '', // sample: swift-pwa-dev.appspot.com
            messagingSenderId: '', // sample: 1083571104838
            appId: '', // sample: 1:1083571104838:web:4f06ca5a60b1c1a9efee47
            measurementId: '', // sample: G-HBHPY22H0H
        },
        pushNotification: {
            enabled: false,
            config: {
                // key from cloud messaging sertificat web push
                pairKey: '', // sample: BJ2IqpfQQGrckDUAI7TaX8r0_v6aykBSIIEpZUqhlkzZI2e7WVZk9ZB4xOiWBqTbVo6wk44gnpRLAJDemB66zAU
            },
        },
    },
    thumbor: {
        enable: true,
        useHttpsOrHttp: false,
        url: 'https://thumbor.sirclocdn.com/unsafe/widthxheight/filters:format(webp)/',
    },
    globalPromo: {
        key_cookies: 'global_promo_enable',
    },
    footer: {
        desktop: 'pwa_footer',
        mobile: 'pwa_footer',
    },
    removeDecimalPrice: {
        enabled: false,
    },
};

const modules = {
    product: {
        customizableOptions: {
            enabled: true,
            availableOptions: {
                CustomizableAreaOption: true,
                CustomizableDateOption: true,
                CustomizableDropDownOption: true,
                CustomizableMultipleOption: true,
                CustomizableFieldOption: true,
                CustomizableFileOption: false,
                CustomizableRadioOption: true,
                CustomizableCheckboxOption: true,
            },
        },
    },
    authentication: {
        enabled: true,
        path: '/authentication',
    },
    about: {
        enabled: true,
        path: '/about-us',
    },
    blog: {
        enabled: true,
        path: '/blog',
        link: {
            detail: {
                href: '/blog/[id]',
                as: '/blog/',
            },
            category: {
                href: '/blog/category/[id]',
                as: '/blog/category/',
            },
            default: {
                href: '/blog',
            },
        },
        featuredImage: true,
    },
    brands: {
        enabled: true,
        path: '/brands',
    },
    catalog: {
        enabled: true,
        productListing: {
            pageSize: 10,
            drawerFilterOnDesktop: {
                enabled: false, // used if need to desktop view on large screen
            },
            label: {
                enabled: true,
                new: {
                    enabled: false,
                },
                sale: {
                    enabled: false,
                },
                weltpixel: {
                    enabled: true,
                },
            },
            configurableOptions: {
                enabled: false,
            },
            rating: {
                enabled: true,
            },
            addToCart: {
                enabled: false,
            },
            quickView: {
                enabled: true,
            },
            sort: {
                relevance: true,
                position: true,
                name: true,
                price: true,
                random: true,
                new_old: false,
                new: true,
                bestseller: true,
                onsale: true,
                mostviewed: true,
                wishlisttop: true,
                toprated: true,
                featured: true,
                free: true,
            },
        },
        pdp: {
            popupDetailImage: {
                enabled: true,
            },
        },
    },
    confirmpayment: {
        enabled: true,
        path: '/confirmpayment',
    },
    checkout: {
        enabled: true,
        checkoutOnly: false,
        path: '/checkout',
        ipayUrl: 'ipay88/ipayredirect/?orderId=',
        snapUrl: {
            dev: 'https://app.sandbox.midtrans.com/snap/snap.js',
            prod: 'https://app.midtrans.com/snap/snap.js',
        },
        pickupStore: {
            enabled: true,
        },
        inStorePickup: {
            enabled: false,
        },
        extraFee: {
            enabled: true,
        },
        cashback: {
            enabled: true,
        },
        orderComment: {
            enabled: false,
        },
        howtoPay: {
            enabled: true,
        },
        xendit: {
            paymentPrefixCodeOnSuccess: [
                'alfamart',
                'bcava',
                'briva',
                'bniva',
                'mandiriva',
                'permatava',
                'indomaret',
            ],
            paymentPrefixCode: [
                'cc',
                'cc_subscription',
                'dana',
                'ovo',
                'linkaja',
                'qr_codes',
                'dd_bri',
                'kredivo',
            ],
        },
    },
    paypal: {
        enabled: false,
        path: '/paypal',
        clientId: {
            local: 'AfcrKzLRhgwpdBWbK8owz2Vv_gYyPUbwzOuOAgz1BfBqvGle_omyRPX4jTZrDpOkfO-jRBc_2YyxEJM2',
            dev: '',
            prod: '',
            stage: '',
        },
        clientSecret: {
            local: 'EAwFhNBD5KKb8WLCK2xPxAD_L0Pb9wYUflFMXUfQYMKAbM5jGykvIbRHM-sJPoR8V3avAcEU3stvTJPd',
            dev: '',
            prod: '',
            stage: '',
        },
        defaultCurrency: 'USD',
        intent: 'authorize',
        returnUrl: 'paypal/express/review',
        cancelUrl: 'checkout/cart',
        keyData: 'paypal-data',
        keyToken: 'paypal-token',
        merchantId: 'M4TYHSS9A9Z8C',
        debug: true,
        disableFunding: 'venmo%2Cbancontact%2Ceps%2Cgiropay%2Cideal%2Cmybank%2Cp24%2Csofort',
    },
    cart: {
        enabled: true,
        path: '/checkout/cart',
    },
    customer: {
        enabled: true,
        path: '/customer',
        plugin: {
            address: {
                splitCity: true,
            },
            newsletter: {
                enabled: true,
            },
        },
    },
    contact: {
        enabled: true,
        path: '/contact',
        recaptcha: {
            enabled: true,
        },
    },
    forgotpassword: {
        enabled: true,
        path: '/customer/account/forgotpassword',
    },
    rewardpoint: {
        enabled: true,
        path: '/aw_rewardpoints/info',
    },
    rma: {
        enabled: true,
        path: '/rma/customer',
    },
    storecredit: {
        enabled: true,
        path: '/customer/account/storecredit',
        useCommerceModule: false,
    },
    storeLocator: {
        enabled: true,
        path: '/storelocator',
    },
    giftcard: {
        enabled: true,
        path: '/awgiftcard/card',
        useCommerceModule: false,
    },
    productreview: {
        enabled: true,
        path: '/review/customer',
    },
    login: {
        enabled: true,
        path: '/customer/account/login',
        recaptcha: {
            enabled: false,
        },
    },
    notification: {
        enabled: true,
        path: 'inboxnotification/notification',
    },
    register: {
        enabled: true,
        path: '/customer/account/create',
        recaptcha: {
            enabled: true,
        },
    },
    trackingorder: {
        enabled: true,
        path: '/sales/order/track',
        fieldDetail: {
            shipperid: ['name', 'description', 'updateDate'],
            gosend: [
                'bookingType',
                'buyerAddressName',
                'buyerAddressDetail',
                'driverId',
                'driverName',
                'insuranceDetails',
                'liveTrackingUrl',
                'receiverName',
                'sellerAddressDetail',
                'sellerAddressName',
                'status',
                'cancelDescription',
                'orderArrivalTime',
                'orderClosedTime',
                'orderCreatedTime',
            ],
        },
    },
    thanks: {
        enabled: true,
        path: '/checkout/onepage/success',
    },
    home: {
        enabled: true,
        useCmsPage: {
            enable: false,
            identifier: 'pwa-homepage',
        },
        featuresProduct: {
            enable: true,
            url_key: 'homepage-featured-products',
        },
        categoryList: {
            enable: true,
            url_key: 'homepage-featured-categories',
            imageSize: {
                mobile: {
                    width: 960,
                    height: 577,
                },
                desktop: {
                    width: 404,
                    height: 465,
                },
            },
        },
        bannerSlider: {
            enable: true,
            title: 'Client App Homepage Slider',
        },
    },
    promo: {
        enabled: true,
    },
    productcompare: {
        enabled: false,
    },
    order: {
        enabled: true,
        path: '/sales/order',
    },
    wishlist: {
        enabled: true,
        path: '/wishlist',
    },
    maintenance: {
        enabled: true,
        path: '/maintenance',
    },
    setting: {
        enabled: true,
        path: '/setting',
    },
    error: {
        enabled: true,
    },
};

const nossrCache = [
    '/aw_rewardpoints/info',
    '/sales/order/history',
    '/customer/account/profile',
    '/customer/account/address',
    '/awgiftcard/card',
    '/customer/account/storecredit',
    '/inboxnotification/notification',
    '/customer/newsletter',
    '/rma/customer',
    '/confirmpayment',
    '/checkout',
    '/checkout/cart',
    '/graphql',
    '/authentication',
    '/checkout/onepage/success',
];

const debuging = {
    originalError: false,
};

const general = {
    defaultCurrencyCode: 'IDR',
    defaultCurrencyLocale: 'id-ID',
};

module.exports = {
    assetsVersion,
    iconAppleTouch,
    general,
    sentry,
    storeCode,
    debuging,
    GTM,
    HOST,
    graphqlEndpoint,
    shareIcon,
    passwordStrength,
    expiredCookies,
    storeConfigNameCookie,
    nameCartId,
    nameToken,
    expiredToken,
    expiredDefault,
    loaderImage,
    cmsContactIdentifiers,
    cmsSocialMediaLinkIdentifiers,
    custDataNameCookie,
    nameCheckoutCookie,
    nameCheckoutState,
    nameGlobalCookie,
    enableSocialMediaLink,
    features,
    nossrCache,
    recaptcha,
    modules,
    installMessage,
    appName,
    localResolverKey,
    useMagentoCommerce,
    rollbar,
    translation,
};
