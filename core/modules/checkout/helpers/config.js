import { getStoreHost, getHost } from '@helpers/config';
import { modules } from '@config';
import { getAppEnv } from '@root/core/helpers/env';

const { checkoutOnly, ipayUrl } = modules.checkout;

// URL config redirect
export const getCartCallbackUrl = () => (!checkoutOnly ? '/checkout/cart' : `${getStoreHost(getAppEnv())}checkout/cart`);

export const getSuccessCallbackUrl = () => {
    if (checkoutOnly) return `${getStoreHost(getAppEnv())}pwacheckout/onepage/success`;
    return `${getHost()}/checkout/onepage/success`;
};

export const getLoginCallbackUrl = ({ errorGuest = false }) => {
    const data = `${getStoreHost(getAppEnv())}checkout`;
    // eslint-disable-next-line no-buffer-constructor
    const buffer = Buffer.from(data);
    const urlBase64 = buffer.toString('base64');
    if (checkoutOnly) {
        return `${getStoreHost(getAppEnv())}customer/account/login/referer/${urlBase64}`;
    }
    if (errorGuest) {
        return 'customer/account/login?redirect=/checkout&error=guest';
    }
    return '/customer/account/login?redirect=/checkout';
};

/**
 * [GET] [URL] [IPAY88] redirect url
 * @return {string} [IPAY88] redirect url
 */
export const getIpayUrl = (orderNumber) => {
    const redirectIpay = `${getStoreHost(getAppEnv())}${ipayUrl + orderNumber}`;
    return redirectIpay;
};

export default { getCartCallbackUrl, getSuccessCallbackUrl, getLoginCallbackUrl };
