import React from 'react';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const NumberLayout = (props) => {
    const {
        icon, icon_size,
        speed, delay,
        number, number_text, number_type, max,
        number_prefix, number_suffix, number_size,
        after_number_text, after_text_color, after_text_size,
        before_number_text, before_text_color, before_text_size,
        number_color,
    } = props;
    const transitionDuration = speed * 1000;
    const animationDelay = delay * 1000 || 1000;
    const numberProgress = parseFloat(Math.min(number, number_type !== 'percent' ? max || number : 100));
    let hasDecimals = numberProgress.toFixed(2).split('.');
    hasDecimals = hasDecimals.length > 1 && Number(hasDecimals[1]) !== 0;
    const numberRef = React.useRef();
    let numberTimeout;

    const increaseNumber = (note, classname) => {
        let element;
        const [elementInt, elementDec] = numberRef.current.children;
        if (classname === 'int') element = elementInt;
        if (classname === 'dec') element = elementDec;
        const decPoint = classname === 'int' ? '.' : '';
        const interval = transitionDuration / Math.min(note, 100);
        let counter = 0;

        const timer = setInterval(() => {
            if (counter === note) {
                clearInterval(timer);
            }
            if (hasDecimals) {
                element.textContent = counter + decPoint;
            } else {
                element.textContent = counter;
            }
            counter += 1;
        }, interval);
    };

    React.useEffect(() => {
        let [int, dec] = numberProgress.toFixed(2).split('.');
        [int, dec] = [Number(int), Number(dec)];

        numberTimeout = setTimeout(() => {
            increaseNumber(int, 'int');
            if (hasDecimals) {
                increaseNumber(dec, 'dec');
            }
        }, animationDelay);

        return (() => {
            clearTimeout(numberTimeout);
        });
    }, []);

    return (
        <div className="number-container">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    align="center"
                    variant="p"
                    style={{
                        fontSize: `${before_text_size ? `${before_text_size}px` : '14px'}`,
                        color: `${before_text_color || '#000000'}`,
                    }}
                >
                    {before_number_text}
                </Typography>
                <div className="number-wrapper">
                    {number_prefix ? (
                        <Typography variant="p" style={{ fontSize: '12px' }}>
                            {number_prefix}
                        </Typography>
                    ) : null}
                    {number_text ? (
                        <Typography variant="h1" type="bold">
                            {number_text}
                        </Typography>
                    ) : null}
                    {icon ? (
                        <div className="icon-circle">
                            <MagezonIcon icon={icon} icon_size={icon_size} />
                        </div>
                    ) : null}
                    <div className="percent" ref={numberRef}>
                        <span className="percent__int">0</span>
                        {hasDecimals && <span className="percent__dec">.00</span>}
                        {number_type === 'percent' && <span className="percent_symbol">%</span>}
                    </div>
                    {number_suffix ? (
                        <Typography variant="p" style={{ fontSize: '12px' }}>
                            {number_suffix}
                        </Typography>
                    ) : null}
                </div>
                <Typography
                    align="center"
                    variant="p"
                    style={{
                        fontSize: `${after_text_size ? `${after_text_size}px` : '14px'}`,
                        color: `${after_text_color || '#000000'}`,
                    }}
                >
                    {after_number_text}
                </Typography>
            </div>

            <style jsx>
                {`
                    .icon-circle {
                        margin-top: -20px;
                    }
                    .mgz-counter-number {
                        font-size: ${number_size}px;
                    }
                    .number-container {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        width: 100%;
                    }
                    .number-wrapper {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }
                    .percent {
                        font-size: ${number_size ? `${number_size}px` : '32px'};
                        color: ${number_color || '#000000'};
                    }
                `}
            </style>
        </div>
    );
};

export default NumberLayout;
