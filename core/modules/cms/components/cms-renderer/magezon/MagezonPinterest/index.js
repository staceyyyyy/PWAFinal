import { useEffect } from 'react';

const MagezonPinterest = (props) => {
    const {
        show_pin_counts, button_large, button_round, xs_hide, sm_hide, md_hide, lg_hide, storeConfig,
    } = props;
    const { base_url } = storeConfig;

    let className = 'magezon-pinterest';

    if (xs_hide) className += ' hidden-mobile ';
    if (sm_hide) className += ' hidden-sm ';
    if (md_hide) className += ' hidden-md ';
    if (lg_hide) className += ' hidden-lg ';

    const preloadScript = () => {
        const script = document.createElement('script');
        script.async = true;
        script.dataset.pinBuild = 'doBuild';
        script.src = '//assets.pinterest.com/js/pinit.js';
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.doBuild) {
            preloadScript();
        } else {
            window.doBuild();
        }
    }, []);

    return (
        <>
            <div className={className}>
                {/* eslint-disable */}
                <a
                    href={`https://pinterest.com/pin/create/button/?url=${base_url}test-pinterest`}
                    target="_blank"
                    rel="noreferrer"
                    data-pin-do="buttonPin"
                    data-pin-build="doBuild"
                    data-pin-count={show_pin_counts}
                    data-pin-tall={button_large}
                    data-pin-round={button_round}
                ></a>
            </div>

            <style jsx global>
                {`
                    .magezon-pinterest span:nth-of-type(1) {
                        min-width: ${button_large ? '57px' : '40px'};
                        ${button_large && 'background-position: center'};
                    }
                    .magezon-pinterest > span > span {
                        width: 100% !important;
                    }
                `}
            </style>
        </>
    );
};
export default MagezonPinterest;
