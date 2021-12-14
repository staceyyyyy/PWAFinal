import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';
import { localTotalCart } from '@services/graphql/schema/local';
import Cookies from 'js-cookie';
import {
    custDataNameCookie,
} from '@config';
import { removeToken as deleteToken } from '@core_modules/customer/services/graphql';

const Footer = ({
    t, isLogin, storeConfig, FooterView, modules, data,
}) => {
    const { aw_blog_general_enabled: blog } = storeConfig;
    const client = useApolloClient();
    const [deleteTokenGql] = deleteToken();
    const handleLogout = () => {
        deleteTokenGql().then(() => {
            Cookies.remove(custDataNameCookie);
            removeIsLoginFlagging();
            removeCartId();
            client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
            Router.push('/customer/account/login');
        }).catch(() => {
            //
        });
    };
    return <FooterView blog={blog} t={t} data={data} isLogin={isLogin} handleLogout={handleLogout} modules={modules} />;
};

export default Footer;
