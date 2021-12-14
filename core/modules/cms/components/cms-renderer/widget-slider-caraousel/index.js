/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import parse, { domToReact } from 'html-react-parser';
import Slider from 'react-slick';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import classNames from 'classnames';
import { features } from '@config';
import { setCookies } from '@helpers/cookies';
import propTypes from 'prop-types';
import useStyles from '@core_modules/cms/components/cms-renderer/widget-slider-caraousel/style';

const WidetSliderCarousel = (props) => {
    const {
        storeConfig, showArrow, content, className,
        showClose, key_cookies, backgroundColor, textColor,
        handleClose: customHandleClose,
    } = props;
    const styles = useStyles();
    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);

    const color = textColor && textColor !== '' ? textColor : storeConfig.global_promo.text_color;
    const background = backgroundColor && backgroundColor !== '' ? backgroundColor : storeConfig.global_promo.background_color;

    let sliderRef = React.createRef();
    const settingSlider = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        rtl: true,
        arrows: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
    };
    const optionSlider = {
        replace: ({ name, children }) => {
            if (name === 'ul') {
                return (
                    // eslint-disable-next-line no-return-assign
                    <Slider ref={(slider) => sliderRef = slider} {...settingSlider}>
                        {domToReact(children, optionSlider)}
                    </Slider>
                );
            }
            if (name === 'li') {
                return <div className="slide">{domToReact(children, optionSlider)}</div>;
            }
        },
    };

    const options = {
        replace: ({ attribs, children }) => {
            if (attribs) {
                if (attribs.id === 'slides') {
                    return <div className="slide-container">{domToReact(children, optionSlider)}</div>;
                }

                if (attribs.class === 'prettify') {
                    return (
                        <span style={{ color: 'hotpink' }}>
                            {domToReact(children, options)}
                        </span>
                    );
                }

                if (attribs.class === 'btn-bar') {
                    return <></>;
                }
            }
        },
    };

    const handleLeftArrow = () => {
        let item = document.getElementsByClassName('slide');
        if (!item) item = [1];
        if (slideIndex === 0) {
            sliderRef.slickGoTo(item.length - 1);
        } else {
            sliderRef.slickGoTo(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        let item = document.getElementsByClassName('slide');
        if (!item) item = [1];
        if (slideIndex === item.length - 1) {
            sliderRef.slickGoTo(0);
        } else {
            sliderRef.slickGoTo(slideIndex + 1);
        }
    };

    const handleClose = () => {
        setCookies(key_cookies, false);
        const div = document.getElementsByClassName('slider-container');
        if (div && div.length > 0) {
            div[0].style.display = 'none';
            div[0].style.height = '0px';
        }
        const leftArrow = document.getElementById('arrow-left');
        if (leftArrow) {
            leftArrow.style.display = 'none';
        }

        const rightArrow = document.getElementById('arrow-right');
        if (rightArrow) {
            rightArrow.style.display = 'none';
        }
        customHandleClose(false);
    };

    if (content && content !== '') {
        return (
            <div className={(className && className !== '') ? className : styles.container}>
                <div className="slider-container">
                    {parse(content, options)}
                    {
                        showClose ? (
                            <button className={styles.btnClose} onClick={handleClose} type="button">
                                X
                            </button>
                        ) : null
                    }
                </div>
                {showArrow ? (
                    <>
                        <div id="arrow-left" className={classNames(styles.arrow, styles.leftArrow)} onClick={handleLeftArrow}>
                            <LeftArrowIcon fontSize="inherit" style={{ color: storeConfig.global_promo.text_color }} />
                        </div>
                        <div id="arrow-right" className={classNames(styles.arrow, styles.rightArrow)} onClick={handleRightArrow}>
                            <RightArrowIcon fontSize="inherit" style={{ color: storeConfig.global_promo.text_color }} />
                        </div>
                    </>
                ) : null}
                <style jsx>
                    {`
                        .slider-container {
                            height: 45px;
                            overflow: hidden;
                            text-align: center;
                            padding: 10px 25%;
                            font-size: 14px;
                            color: ${color};
                            justify-content:center;
                            background-color: ${background};
                        }

                        @media (max-width: 768px) {
                            .slider-container {
                               height: auto;
                               padding: 5px 10px;
                               font-size: 12px;
                            }
                        }
                        
                        .btn-bar {
                            display: none;
                        }

                        
                    `}
                </style>
            </div>
        );
    }
    return null;
};

WidetSliderCarousel.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    storeConfig: propTypes.object.isRequired,
    showArrow: propTypes.bool,
    content: propTypes.string.isRequired,
    className: propTypes.string,
    showClose: propTypes.bool,
    key_cookies: propTypes.string,
    backgroundColor: propTypes.string,
    textColor: propTypes.string,
};

WidetSliderCarousel.defaultProps = {
    showArrow: true,
    className: '',
    showClose: true,
    key_cookies: features.globalPromo.key_cookies,
    backgroundColor: '',
    textColor: '',
};

export default WidetSliderCarousel;
