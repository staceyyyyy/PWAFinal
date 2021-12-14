import { useTranslation } from '@i18n';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const MagezonTwitterButton = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTwitter/components/Button'), {
    ssr: false,
});
const MagezonTwitterTimeline = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTwitter/components/Timeline'), {
    ssr: false,
});

const MagezonTwitter = (props) => {
    const { type } = props;
    const { t } = useTranslation(['common']);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            /* eslint-disable */
            window.twttr = (function (d, s, id) {
                let js,
                    fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function (f) {
                    t._e.push(f);
                };

                return t;
            })(document, 'script', 'twitter-wjs');
        }
    }, []);

    if (type === 'twitter_button') return <MagezonTwitterButton {...props} t={t} />;
    if (type === 'twitter_timeline') return <MagezonTwitterTimeline {...props} t={t} />;

    return null;
};

export default MagezonTwitter;
