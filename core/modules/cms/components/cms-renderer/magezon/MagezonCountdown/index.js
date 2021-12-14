import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import Countdown from 'react-countdown';

const CircleCountdown = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonCountdown/components/circle'));

const CustomCountdown = (props) => {
    const {
        custom_type, value,
        number_spacing, number_background_color, number_border_radius, number_padding, number_color, number_size,
        text_inline, text_size, text_color,
    } = props;
    return (
        <>
            <div className={`mgz-countdown-number mgz-countdown-${custom_type}`}>
                <div className="mgz-countdown-unit">
                    <span className="mgz-countdown-unit-number">{`${value} `}</span>
                    <div className="mgz-countdown-unit-label">{`${custom_type[0].toUpperCase()}${custom_type.slice(1)}`}</div>
                </div>
            </div>
            <style jsx>
                {
                    `
                        .mgz-countdown-number {
                            display: inline-block;
                            margin: ${number_spacing ? `${number_spacing}px` : '10px'};
                        }
                        .mgz-countdown-unit {
                            text-align: center;
                            background-color: ${number_background_color};
                            border-radius: ${number_border_radius}px;
                            padding: ${number_padding};
                        }
                        .mgz-countdown-unit-number {
                            color: ${number_color};
                            font-size: ${number_size};
                        }
                        .mgz-countdown-unit-label {
                            display: ${text_inline ? 'inline-block' : 'block'};
                            font-size: ${text_size}px;
                            color: ${text_color};
                        }
                    `
                }
            </style>
        </>
    );
};

const renderer = ({
    days, hours: rendererHours, minutes: rendererMinutes, seconds, props,
}) => {
    const {
        show_separator, separator_type, separator_color, separator_size,
    } = props;
    const separator = separator_type === 'line' ? '|' : ':';

    return (
        <>
            <div className="mgz-countdown-counter">
                <CustomCountdown custom_type="days" value={days} {...props} />
                {show_separator && <span className="mgz-countdown-separator">{separator}</span>}
                <CustomCountdown custom_type="hours" value={rendererHours} {...props} />
                {show_separator && <span className="mgz-countdown-separator">{separator}</span>}
                <CustomCountdown custom_type="minutes" value={rendererMinutes} {...props} />
                {show_separator && <span className="mgz-countdown-separator">{separator}</span>}
                <CustomCountdown custom_type="seconds" value={seconds} {...props} />
            </div>
            <style jsx>
                {`
                    .mgz-countdown-separator {
                        color: ${separator_color};
                        font-size: ${separator_size ? `${separator_size}px` : '14px'};
                    }
                `}
            </style>
        </>
    );
};

const MagezonCountdown = (props) => {
    // prettier-ignore
    const {
        layout,
        year, month, day,
        hours, minutes,
        heading_text, heading_font_size, heading_color,
        sub_heading_text, sub_heading_font_size, sub_heading_color,
        link_text, link_url, link_color,
    } = props;

    return (
        <>
            <div className="mgz-countdown">
                <div className="mgz-countdown-heading-wrapper">
                    <div className="mgz-countdown-subheading">{sub_heading_text}</div>
                    <div className="mgz-countdown-heading">{heading_text}</div>
                </div>
                {layout === 'numbers' ? (
                    <Countdown
                        date={dayjs(new Date(year, month - 1, day, hours, minutes)).toDate()}
                        renderer={renderer}
                        {...props}
                    />
                ) : (
                    <CircleCountdown
                        date={dayjs(new Date(year, month - 1, day, hours, minutes))}
                        {...props}
                    />
                )}
                <div className="mgz-countdown-link">
                    {link_url && (
                        <MagezonLink link={link_url}>
                            {link_text || ''}
                        </MagezonLink>
                    )}
                </div>
            </div>

            <style jsx>
                {`
                    .mgz-countdown {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 30px;
                    }
                    .mgz-countdown-heading {
                        font-size: ${heading_font_size ? `${heading_font_size}px` : '16px'};
                        font-weight: bold;
                        color: ${heading_color};
                    }
                    .mgz-countdown-subheading {
                        font-size: ${sub_heading_font_size ? `${sub_heading_font_size}px` : '14px'};
                        color: ${sub_heading_color};
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-countdown-link a {
                        color: ${link_color || '#000000'};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonCountdown;
