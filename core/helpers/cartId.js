import Cookies from 'js-cookie';
import { nameCartId, expiredDefault } from '@config';

export const getCartId = () => {
    const cartId = Cookies.get(nameCartId);
    return cartId;
};

export const setCartId = (token, expired) => {
    Cookies.set(nameCartId, token, { expires: expired || expiredDefault });
    return true;
};

export const removeCartId = () => {
    Cookies.remove(nameCartId);
    return true;
};

export default {

};
