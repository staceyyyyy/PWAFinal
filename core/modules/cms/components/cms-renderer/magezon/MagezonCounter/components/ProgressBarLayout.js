/* eslint-disable no-nested-ternary */

import Typography from '@common_typography';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';

const CounterBarText = (props) => {
    const {
        icon, icon_size,
        number_prefix, number_suffix, number_size,
        number_text, number_type, number_color,
        hasDecimals, progressNumberRef, number_position,
    } = props;

    return (
        <>
            <div className="mgz-counter-bar-text">
                {number_prefix && (
                    <Typography variant="p" style={{ fontSize: '12px' }}>
                        {number_prefix}
                    </Typography>
                )}
                {number_text || icon ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {number_text && <Typography variant="h1">{number_text}</Typography>}
                        {icon && <MagezonIcon icon={icon} icon_size={icon_size} />}
                    </div>
                ) : (
                    <div className="percent" ref={progressNumberRef}>
                        <span className="percent__int">0</span>
                        {hasDecimals && <span className="percent__dec">.00</span>}
                        {number_type === 'percent' && <span className="percent_symbol">%</span>}
                    </div>
                )}
                {number_suffix && (
                    <Typography variant="p" style={{ fontSize: '12px' }}>
                        {number_suffix}
                    </Typography>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-counter-bar-text {
                        display: flex;
                        flex-direction: row;
                        justify-content: ${number_position === 'inside' ? 'flex-end' : 'flex-start'};
                        align-items: center;
                        height: 100%;
                    }
                    .percent {
                        font-size: ${number_size ? `${number_size}px` : '32px'};
                        color: ${number_color || '#000000'};
                    }
                `}
            </style>
        </>
    );
};

const ProgressBarLayout = (props) => {
    // prettier-ignore
    const {
        delay, speed, bar_color,
        number, number_type, number_text,
        number_position, max, icon,
        after_number_text, after_text_color, after_text_size,
        before_number_text, before_text_color, before_text_size,
    } = props;
    let timeout;
    const numberProgress = parseFloat(Math.min(number, number_type !== 'percent' ? max || number : 100));
    const transitionDuration = speed * 1000;
    const animationDelay = delay * 1000 || 1000;
    let hasDecimals = numberProgress.toFixed(2).split('.');
    hasDecimals = hasDecimals.length > 1 && Number(hasDecimals[1]) !== 0;
    const progressNumberRef = React.useRef();
    const progressBarRef = React.useRef();

    const counterTextContent = (
        <CounterBarText
            progressNumberRef={progressNumberRef}
            hasDecimals={hasDecimals}
            {...props}
        />
    );

    const increaseNumber = (note, classname) => {
        let element;
        const [elementInt, elementDec] = progressNumberRef.current.children;
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

    const progressTransition = () => {
        progressBarRef.current.style.transitionDuration = `${transitionDuration}ms`;

        timeout = setTimeout(() => {
            progressBarRef.current.style.width = number_type !== 'percent' ? (max ? `${number}%` : '100%') : `${number}%`;
        }, animationDelay);
    };

    React.useEffect(() => {
        let [int, dec] = numberProgress.toFixed(2).split('.');
        [int, dec] = [Number(int), Number(dec)];

        progressTransition();
        if (!(number_text || icon)) {
            increaseNumber(int, 'int');
            if (hasDecimals) {
                increaseNumber(dec, 'dec');
            }
        }

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <div className="mgz-counter-bar-container">
                <div className="mgz-counter-bar-wrapper">
                    <Typography
                        variant="p"
                        style={{
                            fontSize: `${before_text_size ? `${before_text_size}px` : '14px'}`,
                            color: `${before_text_color || '#000000'}`,
                        }}
                    >
                        {before_number_text}
                    </Typography>
                    {number_position === 'above' && counterTextContent}
                    <div className="mgz-counter-bar-inner">
                        <div className="mgz-counter-bar-text-container" ref={progressBarRef}>
                            {number_position === 'inside' && counterTextContent}
                        </div>
                    </div>
                    {number_position === 'bellow' && counterTextContent}
                    <Typography
                        variant="p"
                        style={{
                            fontSize: `${after_text_size ? `${after_text_size}px` : '14px'}`,
                            color: `${after_text_color || '#000000'}`,
                        }}
                    >
                        {after_number_text}
                    </Typography>
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-counter-bar-container {
                        width: 100%;
                    }
                    .mgz-counter-bar-wrapper {
                        display: flex;
                        flex-direction: column;
                    }
                    .mgz-counter-bar-inner {
                        height: 60px;
                        width: 100%;
                        background-color: whitesmoke;
                        margin: 0;
                    }
                    .mgz-counter-bar-text-container {
                        position: relative;
                        height: 100%;
                        width: 0;
                        background-color: ${bar_color};
                        border-radius: 0;
                        text-align: right;
                        transition: width 0 linear;
                    }
                `}
            </style>
        </>
    );
};

export default ProgressBarLayout;
