/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from '@i18n';
import { translation } from '@config';
import cookies from 'js-cookie';
import ViewLanguage from '@core_modules/setting/components/language/view';
import { getStoreName } from '@core_modules/setting/services/graphql';

const COOKIES_APP_LANG = 'app_lang';
const COOKIES_STORE_CODE = 'store_code_storage';

const SwitcherLanguage = (props) => {
    const { i18n, onCallbackLanguage } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const { data: remoteLang } = getStoreName();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const mount = useRef();
    const [lang, setLang] = useState({});

    const dataLang = [];
    /**
     * [useEffect] life cycle react
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            const getLangFromStorage = () => {
                // prettier-ignore
                let defaultLangFromDatabase = translation.defaultLanguage;
                let defaultLabel = translation.languagesLabel[translation.defaultLanguage];
                if (remoteLang) {
                    remoteLang.availableStores.map((item) => {
                        if (item.is_default_store) {
                            defaultLangFromDatabase = item.locale.slice(0, 2);
                            defaultLabel = item.store_name;
                        }
                        return null;
                    });
                }
                const getDataCookies = cookies.get(COOKIES_APP_LANG) !== undefined
                    ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                    : {
                        label: defaultLabel,
                        value: defaultLangFromDatabase,
                    };

                i18n.changeLanguage(getDataCookies.value);
                cookies.set(COOKIES_APP_LANG, getDataCookies);
                setLang(getDataCookies);
            };
            getLangFromStorage();
        }
        return () => (mount.current = false);
    }, []);

    /**
     * [METHOD] handle click popover
     * @param {*} event
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * [METHOD] handle close popover
     */
    const handleClose = () => setAnchorEl(null);

    /**
     * [METHOD] on click language
     */
    const onClickLanguage = ({ item }) => {
        i18n.changeLanguage(item.value);
        cookies.set(COOKIES_STORE_CODE, item.storeCode);
        cookies.set(COOKIES_APP_LANG, item);
        setLang(item);
        handleClose();
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    if (remoteLang) {
        remoteLang.availableStores.map((item) => {
            dataLang.push({
                label: item.store_name,
                value: item.locale.slice(0, 2),
                storeCode: item.store_code,
            });
            return null;
        });
        const propsOther = {
            id,
            open,
            anchorEl,
            dataLang,
            lang,
            onCallbackLanguage,
            handleClick,
            handleClose,
            onClickLanguage,
        };
        return <ViewLanguage {...props} {...propsOther} remoteLang={remoteLang} />;
    }
    return null;
};

export default withTranslation()(SwitcherLanguage);
