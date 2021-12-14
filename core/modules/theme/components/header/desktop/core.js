import Router from 'next/router';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import Cookies from 'js-cookie';
import { removeCookies } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import firebase from 'firebase/app';
import { custDataNameCookie, features, modules } from '@config';
import {
    getCategories, getCustomer, removeToken, getVesMenu,
} from '@core_modules/theme/services/graphql';

const CoreTopNavigation = (props) => {
    const {
        Content, storeConfig, t, app_cookies, isLogin, showGlobalPromo,
    } = props;
    const [value, setValue] = React.useState('');
    const [deleteTokenGql] = removeToken();
    const { data, loading } = features.vesMenu.enabled
        ? getVesMenu({
            variables: {
                alias: features.vesMenu.alias,
            },
        })
        : getCategories();
    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const client = useApolloClient();

    const handleLogout = () => {
        window.backdropLoader(true);
        deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                if (features.firebase.config.apiKey && features.firebase.config.apiKey !== '') {
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                    }).catch(() => {
                        // An error happened.
                        // console.log(error);
                    });
                }
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            })
            .catch((e) => {
                window.backdropLoader(false);
                console.log(e);
                //
            });
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    return (
        <Content
            t={t}
            isLogin={isLogin}
            data={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            customer={customerData}
            handleLogout={handleLogout}
            value={value}
            app_cookies={app_cookies}
            showGlobalPromo={showGlobalPromo}
            modules={modules}
        />
    );
};

export default CoreTopNavigation;
