/* eslint-disable func-names */
const { getStoreHost } = require('../helpers/config');
const { getAppEnv } = require('../helpers/env');

const availableRoute = (path) => {
    const route = [
        '/checkout-load',
        '/customer/account/address',
        '/',
        '/authentication',
        '',
    ];

    let cleanPath = path.split('?');
    [cleanPath] = cleanPath;

    const found = route.indexOf(cleanPath) > -1;

    return found;
};

const routerServerMiddleware = function (req, res, next) {
    const pathname = req.originalUrl;
    const allow = availableRoute(pathname.trim().split('?')[0]);
    if (!allow) {
        if (typeof window !== 'undefined') {
            window.location.href = getStoreHost(window.APP_ENV);
        } else {
            res.redirect(getStoreHost(getAppEnv()));
        }
    } else {
        next();
    }
};

module.exports = { routerServerMiddleware, availableRoute };
