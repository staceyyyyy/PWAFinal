/* eslint-disable object-curly-newline */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */

import Image from '@common_image';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';

const ImageElement = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonImageGallery/ImageElement'), { ssr: false });

const ArrowRight = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowRightIcon />
        </div>
    );
};

const ArrowLeft = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowLeftIcon />
        </div>
    );
};

const MagezonImageGallery = (props) => {
    // prettier-ignore
    const {
        autoplay, fit,
        items, loop, arrows,
        maxwidth, minwidth, minheight, nav, navposition, rtl,
        startindex, stopautoplayontouch, swipe, thumbheight,
        thumbmargin, thumbwidth, width, keyboard,
        shuffle, transition, captions,
        click, allowfullscreen,
        storeConfig,
    } = props;
    const { secure_base_media_url } = storeConfig;
    const [slideIndex, setIndex] = useState(startindex || 0);
    const [zoom, setZoom] = useState(false);
    const [itemsArr, setItemsArr] = useState(items);
    const [hasSetPosition, setHasSetPosition] = useState(false);
    const maxHeight = 750;
    let focusSlider;
    let sliderRef = useRef();
    const navRef = useRef();
    const elementRef = useRef();

    const calculateHeight = () => {
        let newHeight = maxHeight;
        let newWidth = width;

        if (width || minwidth || maxwidth) {
            if (maxwidth && (Number(width.split('%')[0]) > Number(maxwidth.split('%')[0]))) {
                newWidth = maxwidth;
            }

            if (
                minwidth
                && (Number(minwidth.split('%')[0]) > Number(width.split('%')[0]) || Number(minwidth.split('%')[0]) > Number(maxwidth.split('%')[0]))
            ) {
                newWidth = minwidth;
            }

            if (width.includes('%')) {
                newHeight = (newWidth.split('%')[0] / 100) * maxHeight;
            }
        }

        if (minheight) {
            newHeight *= minheight.split('%')[0] / 100;
        }

        return newHeight;
    };

    const setAutoplay = () => {
        let autoPlayValue = false;
        let autoPlaySpeed = 3000;

        if (autoplay) {
            if (autoplay === 'true' || autoplay === 'false') {
                if (autoplay === 'true') autoPlayValue = true;
                if (autoplay === 'false') autoPlayValue = false;
            }

            if (!isNaN(Number(autoplay))) {
                if (Number(autoplay) > 0) {
                    autoPlayValue = true;
                    autoPlaySpeed = Number(autoplay);
                }
            }
        }

        return {
            autoplay: autoPlayValue,
            autoplaySpeed: autoPlaySpeed,
        };
    };

    const pauseSlick = () => {
        if (stopautoplayontouch) {
            sliderRef.slickPause();
        }
    };

    const shuffleSlick = () => items
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const adjustItems = () => {
        let adjustedItems = items;

        if (rtl) {
            adjustedItems = items.reverse();
        }

        if (shuffle) {
            adjustedItems = shuffleSlick();
        }

        return adjustedItems;
    };

    const settings = {
        arrows,
        fade: transition !== 'slide',
        infinite: loop,
        initialSlide: startindex || 0,
        autoplay: setAutoplay().autoplay,
        autoplaySpeed: setAutoplay().autoplaySpeed,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: 600,
        swipe,
        beforeChange: (old, next) => setIndex(next),
        pauseOnHover: false,
        nextArrow: <ArrowRight />,
        prevArrow: <ArrowLeft />,
    };

    const updatedItems = useMemo(() => adjustItems(), [items]);
    useEffect(() => {
        if (keyboard) {
            const track = sliderRef.innerSlider.list.querySelector('.slick-track');
            focusSlider = setTimeout(() => {
                const slide = track.querySelector('.slick-slide');
                slide.focus();
            }, 0);
        }

        setItemsArr(updatedItems);

        return () => clearTimeout(focusSlider);
    }, []);

    const clickNavigate = (e) => {
        e.stopPropagation();
        if (click) {
            const rect = e.target.getBoundingClientRect();
            const elementRect = elementRef.current.offsetWidth;
            const mouseX = e.clientX - rect.left;

            if (mouseX < elementRect / 2) sliderRef.slickPrev();
            if (mouseX > elementRect / 2) sliderRef.slickNext();
        }
    };

    const zoomHandler = (e) => {
        e.stopPropagation();
        setZoom(!zoom);
    };

    useEffect(() => {
        if (sliderRef && !hasSetPosition) {
            sliderRef.slickGoTo(startindex || 0);
            setHasSetPosition(true);
        }
    }, [hasSetPosition]);

    return (
        <>
            <div className={`mgz-img-gallery ${zoom ? 'fullscreen' : ''}`}>
                {/* <Dialog open={true} fullScreen>
                </Dialog> */}
                <div className="mgz-img-gallery-container" ref={elementRef} onClick={clickNavigate}>
                    {allowfullscreen && (
                        <div className="mgz-img-gallery-zoom-btn" onClick={zoomHandler}>
                            <ZoomOutMapIcon />
                        </div>
                    )}
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {itemsArr.map((item, index) => (
                            <ImageElement
                                key={index}
                                {...item}
                                baseUrl={secure_base_media_url}
                                pauseSlick={pauseSlick}
                                height={calculateHeight()}
                                fit={fit}
                                captions={captions}
                            />
                        ))}
                    </Slider>
                </div>
                {nav && nav !== 'false' && (
                    <div className="mgz-img-gallery-nav">
                        {itemsArr.map((item, index) => {
                            const { type, image, link } = item;
                            const imgUrl = type === 'link' ? link : `${secure_base_media_url}${image}`;

                            return (
                                <div
                                    key={index}
                                    ref={navRef}
                                    tabIndex={index}
                                    className={
                                        nav === 'thumbs'
                                            ? slideIndex === index && 'mgz-active'
                                            : nav === 'dots'
                                                && `mgz-img-gallery-nav-dots-item ${slideIndex === index && 'mgz-img-gallery-nav-dots-item-active'}`
                                    }
                                    onClick={() => {
                                        sliderRef.slickGoTo(index);
                                    }}
                                    onKeyDown={({ key }) => {
                                        if (key === 'ArrowLeft') {
                                            sliderRef.slickPrev();
                                        }
                                        if (key === 'ArrowRight') {
                                            sliderRef.slickNext();
                                        }
                                    }}
                                >
                                    {nav === 'thumbs'
                                        ? <Image src={imgUrl} />
                                        : <span />}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-img-gallery {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: ${navposition === 'bottom' ? 'column' : 'column-reverse'};
                    }
                    .mgz-img-gallery.fullscreen {
                        position: fixed;
                        height: 100vh;
                        inset: 0;
                        background-color: white;
                        z-index: 1500;
                        display: block;
                    }
                    .fullscreen .mgz-img-gallery-container {
                        max-height: 100%;
                        max-width: 100%;
                    }
                    .mgz-img-gallery-container {
                        position: relative;
                        width: ${width};
                        min-width: ${minwidth};
                        max-width: ${maxwidth};
                        width: 100%;
                        max-height: ${calculateHeight()}px;
                        overflow: hidden;
                    }
                    .mgz-img-gallery-nav > div:focus {
                        outline: none;
                    }
                    .mgz-active {
                        border: 2px solid #00afea;
                        outline: none;
                    }
                    .mgz-img-gallery-nav-dots-item {
                        width: 6px;
                        height: 6px;
                        border: 1px solid #7f7f7f;
                        border-radius: 6px;
                        margin: 10px;
                    }
                    .mgz-img-gallery-nav-dots-item-active {
                        background-color: #7f7f7f; 
                    }
                    .mgz-img-gallery-zoom-btn {
                        color: grey;
                        opacity: 0;
                        position: absolute;
                        right: 0;
                        z-index: 1;
                    }
                    .mgz-img-gallery-container:hover .mgz-img-gallery-zoom-btn {
                        opacity: 0.5;
                        transition: opacity 0.3s;
                    }
                    .fullscreen .mgz-img-gallery-zoom-btn {
                        position: fixed;
                        top: 0;
                        opacity: 0.5;
                    }
                    .mgz-img-gallery-zoom-btn:hover {
                        cursor: pointer;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-img-gallery-container .slick-slide {
                        height: 100%;
                    }
                    .mgz-img-gallery-container .slick-track {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        height: ${calculateHeight()}px;
                        align-items: center;
                        justify-content: center;
                    }
                    .mgz-img-gallery.fullscreen .slick-track {
                        height: 100%;
                    }
                    .mgz-img-gallery-container .slick-prev {
                        left: 0;
                    }
                    .mgz-img-gallery-container .slick-next {
                        right: 0;
                    }
                    .mgz-img-gallery.fullscreen .mgz-img-gallery-container .slick-arrow {
                        z-index: 1500;
                    }
                    .mgz-img-gallery-container .slick-arrow {
                        transition: opacity 0.3s;
                        opacity: 0;
                        z-index: 1;
                        background: rgba(0,0,0,0.1);
                    }
                    .mgz-img-gallery-container:hover .slick-arrow {
                        opacity: 1;
                    }
                    .mgz-img-gallery.fullscreen .slick-arrow {
                        opacity: 1;
                    }
                    .mgz-img-gallery-container .slick-prev svg, .mgz-img-gallery-container .slick-next svg {
                        font-size: 20px !important;
                        color: white;
                    }
                    .mgz-img-gallery-container .slick-prev:before, .mgz-img-gallery-container .slick-next:before {
                        content: '' !important
                    }
                    .slick-slide > div {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        position: relative;
                    }
                    .mgz-img-gallery.fullscreen .slick-slide > div {
                        height: 100vh;
                    }
                    .mgz-img-gallery-nav {
                        display: flex;
                    }
                    .mgz-img-gallery.fullscreen .mgz-img-gallery-nav {
                        position: fixed;
                        top: 0;
                        left: 50%;
                        transform: translate(-50%);
                    }
                    .mgz-img-gallery-nav div {
                        margin: ${thumbmargin ? `${thumbmargin}px` : '2px'};
                        width: ${thumbwidth ? `${thumbwidth}px` : '2px'};
                        height: ${thumbheight ? `${thumbheight}px` : '2px'};
                        overflow: hidden;
                    }
                    .mgz-img-gallery-nav div:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonImageGallery;
