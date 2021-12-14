/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel/components/style';

const Caraousel = (props) => {
    const {
        data = [], slideXs = 1, slideSm = 2, slideMd = 3, slideLg = 4, slideXl = 5,
        infinite = false, Item, autoplay = false, autoplaySpeed = 3000, pauseOnHover = false,
        rtl = false, centerMode = false, dots = false, slidesToScroll = 1, speed = 500,
        adaptiveHeight = false, arrows = true, lazyLoad = false, initialSlide = 0, centerPadding = '50px',
    } = props;
    const styles = useStyles();
    const [slickHeight, setSlickHeight] = React.useState(0);
    let sliderRef = React.createRef();

    const adjustSlickListHeight = () => {
        setTimeout(() => {
            let highestHeight = 0;
            if (sliderRef) {
                const activeSlides = sliderRef?.innerSlider?.track?.node?.querySelectorAll('.slick-slide.slick-active');
                activeSlides.forEach((slide) => {
                    highestHeight = slide.offsetHeight > highestHeight ? slide.offsetHeight : highestHeight;
                });
                setSlickHeight(highestHeight);
            }
        }, 250);
    };

    React.useEffect(() => {
        adjustSlickListHeight();
    }, [slickHeight]);

    const settings = {
        initialSlide,
        adaptiveHeight,
        arrows: false,
        dots,
        infinite,
        speed: autoplay ? speed : 500,
        rows: 1,
        slidesPerRow: 1,
        slidesToShow: slideXl,
        swipeToSlide: true,
        slidesToScroll,
        rtl,
        centerMode,
        autoplay,
        autoplaySpeed,
        pauseOnHover,
        lazyLoad: lazyLoad ? 'ondemand' : 'progressive',
        className: 'slider',
        beforeChange: () => {
            adjustSlickListHeight();
        },
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: slideLg,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: slideMd,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: slideSm,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: slideXs,
                    centerMode: centerPadding || centerMode,
                    centerPadding,
                },
            },
        ],
    };

    const [slideIndex] = React.useState(0);
    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickPrev(data.length - 1);
        } else {
            sliderRef.slickPrev(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickNext(0);
        } else {
            sliderRef.slickNext(slideIndex + 1);
        }
    };

    return (
        <div
            className={classNames('carousel', styles.caraousel)}
        >
            <Slider ref={(slider) => sliderRef = slider} {...settings}>
                {
                    data && data.length > 0 && data.map((item, key) => (
                        <Item key={key} item={item} />
                    ))
                }
            </Slider>
            {
                arrows ? (
                    <>
                        <div className={classNames('mgz-carousel-arrow mgz-carousel-arrow-left', styles.arrow)} onClick={handleLeftArrow}>
                            <LeftArrowIcon fontSize="inherit" />
                        </div>
                        <div className={classNames('mgz-carousel-arrow mgz-carousel-arrow-right', styles.arrow)} onClick={handleRightArrow}>
                            <RightArrowIcon fontSize="inherit" />
                        </div>
                    </>
                ) : null
            }
            <style jsx>
                {`
                    .carousel :global(.slick-list) {
                        height: ${slickHeight}px !important;
                        transition: all .25s ease;
                    }
                `}
            </style>
        </div>
    );
};

export default Caraousel;
