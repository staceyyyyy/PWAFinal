import dayjs from 'dayjs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const renderTime = (dimension, time) => (
    <>
        <div className={`mgz-countdown-number mgz-countdown-${dimension}`}>
            <div className="mgz-countdown-unit">
                <span className="mgz-countdown-unit-number">{`${time} `}</span>
                <div className="mgz-countdown-unit-label">{`${dimension[0].toUpperCase()}${dimension.slice(1)}`}</div>
            </div>
        </div>
        <style jsx>
            {`
                    .time-wrapper {
                        text-align: center;
                    }
                    .mgz-countdown-unit {
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                    }
                `}
        </style>
    </>
);

/* eslint-disable no-bitwise */
const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const CircleCountdown = (props) => {
    const {
        date: endTimer, circle_background_color, circle_color1, circle_color2, circle_dash_width, circle_size,
        show_separator, separator_type, separator_color, separator_size,
        number_spacing, number_background_color, number_border_radius, number_padding, number_color, number_size,
        text_inline, text_size, text_color,
    } = props;
    const timerProps = {
        isPlaying: true,
        size: circle_size.replace('px', ''),
        strokeWidth: 6,
        rotation: 'counterclockwise',
    };

    const remainingTime = endTimer.unix() - dayjs().unix();
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;
    let separatorClass = '';

    if (show_separator) {
        separatorClass = `mgz-countdown-separator-${separator_type}`;
    }

    return (
        <>
            <div className={`mgz-countdown-circle ${separatorClass}`}>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={daysDuration}
                        initialRemainingTime={remainingTime}
                    >
                        {({ elapsedTime }) => renderTime('days', getTimeDays(daysDuration - elapsedTime))}
                    </CountdownCircleTimer>
                </div>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={daySeconds}
                        initialRemainingTime={remainingTime % daySeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > hourSeconds]}
                    >
                        {({ elapsedTime }) => renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
                    </CountdownCircleTimer>
                </div>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={hourSeconds}
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > minuteSeconds]}
                    >
                        {({ elapsedTime }) => renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))}
                    </CountdownCircleTimer>
                </div>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={minuteSeconds}
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0]}
                    >
                        {({ elapsedTime }) => renderTime('seconds', getTimeSeconds(elapsedTime))}
                    </CountdownCircleTimer>
                </div>
            </div>
            <style jsx global>
                {`
                    .mgz-countdown-circle {
                        display: flex;
                    }
                    .mgz-countdown-circle-timer {
                        position: relative;
                        margin: 10px;
                        width: ${circle_size};
                        height: ${circle_size};
                        border-radius: 50%;
                        background-color: ${circle_background_color || '#ffffff'};
                    }
                    .mgz-countdown-separator-line .mgz-countdown-circle-timer:not(:last-child):after {
                        border-color: ${separator_color || '#ff9900'} !important;
                        right: -10px;
                        height: ${separator_size ? `${separator_size}px` : '50%'};
                    }
                    .mgz-countdown-separator-colon .mgz-countdown-circle-timer:not(:last-child):after {
                        color: ${separator_color || '#ff9900'} !important;
                        right: -10px;
                        height: 20px;
                        font-size: ${separator_size ? `${separator_size}px` : '20px'};
                    }
                    .mgz-countdown-separator-line .mgz-countdown-circle-timer:not(:last-child):after {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        border-right: 1px solid #cccccc;
                        transform: translate(-50%, -50%);
                        top: 50%;
                        bottom: 0;
                        left: auto;
                    }
                    .mgz-countdown-separator-colon .mgz-countdown-circle-timer:not(:last-child):after {
                        content: ":";
                        display: inline-block;
                        position: absolute;
                        transform: translateY(-50%);
                        top: 50%;
                        bottom: 0;
                    }
                    .mgz-countdown-circle .mgz-countdown-number {
                        display: inline-block;
                        margin: ${number_spacing ? `${number_spacing}px` : '10px'};
                    }
                    .mgz-countdown-circle .mgz-countdown-unit {
                        text-align: center;
                        background-color: ${number_background_color};
                        border-radius: ${number_border_radius}px;
                        padding: ${number_padding};
                    }
                    .mgz-countdown-circle .mgz-countdown-unit-number {
                        color: ${number_color};
                        font-size: ${number_size};
                    }
                    .mgz-countdown-circle .mgz-countdown-unit-label {
                        display: ${text_inline ? 'inline-block' : 'block'};
                        font-size: ${text_size}px;
                        color: ${text_color};
                    }
                `}
            </style>
        </>
    );
};

export default CircleCountdown;
