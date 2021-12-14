import css from 'styled-jsx/css';

/* eslint-disable */
const generateCustomCssAnimation = (duration, delay, infinite) => {
    return css.resolve`
        .mgz_top-to-bottom {
            animation: topToBottom 0.7s 1 cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .mgz_bottom-to-top {
            animation: bottomToTop 0.7s 1 cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .mgz_left-to-right {
            animation: leftToRight 0.7s 1 cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .mgz_right-to-left {
            animation: rightToLeft 0.7s 1 cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .mgz_appear {
            animation: appear 0.7s 1 cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .owl-backSlide-in {
            animation: backSlideIn 0.5s ease both;
        }
        .owl-fadeUp-in {
            animation: fadeUpIn 1s ease both;
        }
        .owl-goDown-in {
            animation: goDownIn 0.6s ease both;
        }
        @keyframes topToBottom {
            0% {
                transform: translate(0, -10%);
                opacity: 0;
            }
            100% {
                transform: translate(0, 0);
                opacity: 1;
            }
        }
        @keyframes bottomToTop {
            0% {
                transform: translate(0, 10%);
                opacity: 0;
            }
            100% {
                transform: translate(0, 0);
                opacity: 1;
            }
        }
        @keyframes leftToRight {
            0% {
                transform: translate(-10%, 0);
                opacity: 0;
            }
            100% {
                transform: translate(0, 0);
                opacity: 1;
            }
        }
        @keyframes rightToLeft {
            0% {
                transform: translate(10%, 0);
                opacity: 0;
            }
            100% {
                transform: translate(0, 0);
                opacity: 1;
            }
        }
        @keyframes appear {
            0% {
                transform: scale(0.5);
                opacity: 0.1;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes fadeUpIn {
            0% {
                opacity: 0;
                transform: scale(1.5);
            }
        }
        @keyframes backSlideIn {
            0%,
            25% {
                opacity: 0.5;
                transform: translateZ(-500px) translateX(200%);
            }
            75% {
                opacity: 0.5;
                transform: translateZ(-500px);
            }
            100% {
                opacity: 1;
                transform: translateZ(0) translateX(0);
            }
        }
        @keyframes goDownIn {
            0% {
                transform: translateY(-100%);
            }
        }
        .custom_animation {
            animation-duration: ${duration || 0.5}s;
            animation-delay: ${delay || 0}s;
            animation-iteration-count: ${infinite ? 'infinite' : 1};
        }
    `;
};

export default generateCustomCssAnimation;
