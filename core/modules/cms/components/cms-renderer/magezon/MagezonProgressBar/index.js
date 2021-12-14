/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */

import { useEffect, useRef } from 'react';

const BarComponent = (props) => {
    // prettier-ignore
    const {
        background_color, border_color, color, label, unfilled_color, value,
        striped, text_position, units, speed, delay,
    } = props;

    const progressBarRef = useRef();
    const progressNumberRef = useRef();
    let timeout;

    useEffect(() => {
        const el = progressBarRef.current;
        const numberEl = progressNumberRef.current;
        const barDelay = delay ? delay * 1000 : 0;
        const interval = Number((speed * 1000) / value);

        if (el !== null) {
            el.style.transitionDuration = `${speed}s`;
            timeout = setTimeout(() => {
                el.style.width = `${el.getAttribute('data-progressvalue')}%`;
                if (numberEl !== null) {
                    let counter = 0;
                    const timer = setInterval(() => {
                        if (counter === Number(value)) {
                            clearInterval(timer);
                        }
                        numberEl.textContent = counter;
                        counter += 1;
                    }, interval);
                }
            }, barDelay);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <div className="progressbar-content">
                {text_position === 'above' && (
                    <div className="progressbar-label">
                        <span>{`${label}`}</span>
                        <span ref={progressNumberRef}>0</span>
                        {units}
                    </div>
                )}
                <div className="progressbar-container">
                    {text_position === 'inside' && (
                        <div className="progressbar-label">
                            <span>{`${label}`}</span>
                            <span ref={progressNumberRef}>0</span>
                            {units}
                        </div>
                    )}
                    <div className={`progressbar-progression ${striped ? 'bg-striped' : ''}`} ref={progressBarRef} data-progressvalue={value} />
                </div>
                {text_position === 'below' && (
                    <div className="progressbar-label">
                        <span>{`${label}`}</span>
                        <span ref={progressNumberRef}>0</span>
                        {units}
                    </div>
                )}
            </div>
            <style jsx>
                {`
                    .progressbar-container {
                        ${unfilled_color ? `background-color: ${unfilled_color} !important;` : ''}
                    }
                    .progressbar-progression {
                        ${background_color ? `background-color: ${background_color} !important;` : ''}
                        ${border_color ? `border-color: ${border_color};` : ''}
                    }
                    .progressbar-label {
                        ${color ? `color: ${color};` : ''}
                        ${text_position === 'above' ? 'margin-bottom: 5px;' : ''}
                        ${text_position === 'below' ? 'margin: 5px 0;' : ''}
                    }
                `}
            </style>
        </>
    );
};

const MagezonProgressBar = (props) => {
    // prettier-ignore
    const {
        bar_border_radius, bar_border_style, bar_border_width, bar_height,
        delay, items, label_font_size, label_font_weight,
        speed, striped, text_position, units,
    } = props;
    const barHeight = bar_height ? (text_position === 'inside' ? bar_height / 2 : bar_height) : 12.5;

    return (
        <>
            <div className="mgz-progress-bar">
                {items.map((item, index) => {
                    return (
                        <>
                            <BarComponent
                                key={index}
                                units={units}
                                striped={striped}
                                text_position={text_position}
                                delay={delay}
                                speed={speed}
                                {...item}
                            />
                        </>
                    );
                })}
            </div>
            <style jsx>
                {`
                    .mgz-progress-bar :global(.progressbar-container) {
                        position: relative;
                        background-color: #f7f7f7;
                        margin-bottom: ${text_position === 'below' ? '0' : '10px'};
                        overflow: hidden;
                        border-radius: ${bar_border_radius ? `${bar_border_radius}px` : '3px'};
                        min-height: ${barHeight}px;
                        line-height: ${barHeight}px;
                    }
                    .mgz-progress-bar :global(.progressbar-container) {
                        ${text_position === 'inside' ? 'padding: 0.6rem;' : ''}
                    }
                    .mgz-progress-bar :global(.progressbar-label) {
                        position: relative;
                        z-index: 2;
                    }
                    .mgz-progress-bar :global(.progressbar-label) {
                        ${label_font_size ? `font-size: ${label_font_size}px;` : ''}
                        ${label_font_weight ? `font-weight: ${label_font_weight};` : ''}
                    }
                    .mgz-progress-bar :global(.progressbar-label > span:nth-child(1)) {
                        ${text_position !== 'inside' ? 'margin-right: 5px;' : 'margin: 5px;'}
                    }
                    .mgz-progress-bar :global(.progressbar-progression) {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        background-color: #e0e0e0;
                        z-index: 0;
                        width: 0;
                        transition: width 0 linear;
                        border-radius: ${bar_border_radius ? `${bar_border_radius}px` : '3px'};
                        ${bar_border_style ? `border-style: ${bar_border_style};` : ''}
                        ${bar_border_width ? `border-width: ${bar_border_width}px;` : ''}
                    }
                    .mgz-progress-bar :global(.bg-striped) {
                        background-image: linear-gradient(
                          45deg,
                          rgba(255, 255, 255, 0.15) 25%,
                          transparent 25%,
                          transparent 50%,
                          rgba(255, 255, 255, 0.15) 50%,
                          rgba(255, 255, 255, 0.15) 75%,
                          transparent 75%,
                          transparent
                        );
                        background-size: 40px 40px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonProgressBar;
