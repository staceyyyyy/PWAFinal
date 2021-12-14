/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-return-assign */

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import { features } from '@config';
import { getStoreHost } from '@helpers/config';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';

const VideoContent = (props) => {
    const {
        background_type, youtube_id, vimeo_id, local_link,
    } = props;
    let videoUrl;

    if (background_type === 'youtube') videoUrl = `https://www.youtube.com/embed/${youtube_id}`;
    if (background_type === 'vimeo') videoUrl = `https://player.vimeo.com/video/${vimeo_id}`;
    if (background_type === 'local') {
        return (
            <video>
                <source src={local_link} />
                <track kind="captions" />
                Sorry, your browser does not support embedded videos.
            </video>
        );
    }

    return (
        <>
            <iframe
                style={{ width: '100%', height: '100%' }}
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded Video"
            />
        </>
    );
};

const MagezonSliderContent = (props) => {
    const {
        heading, heading_animation, heading_animation_delay, heading_bg_color,
        heading_color, heading_font_size, heading_line_height,
        heading_padding, heading_font_weight, heading_type,
        caption1, caption1_animation, caption1_animation_delay, caption1_bg_color,
        caption1_color, caption1_font_size, caption1_font_weight,
        caption1_line_height, caption1_padding, caption1_type,
        caption2, caption2_animation, caption2_animation_delay, caption2_bg_color,
        caption2_color, caption2_font_size, caption2_font_weight,
        caption2_line_height, caption2_padding, caption2_type,
        content_align, content_padding, content_position,
        content_width, content_wrapper_width,
        youtube_id, vimeo_id, local_link,
        image, background_type, slider_height,
    } = props;
    const mediaUrl = `${getStoreHost()}media`;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;
    const getImgThumbor = generateThumborUrl(`${mediaUrl}/${image}`, 0, 0);

    return (
        <>
            {background_type !== 'image' ? (
                <div style={{ height: `${slider_height}px` }}>
                    <VideoContent background_type={background_type} youtube_id={youtube_id} vimeo_id={vimeo_id} local_link={local_link} />
                </div>
            ) : (
                <div className="magezon-slide">
                    <div className={`magezon-slide-captions ${content_position}`}>
                        <div>
                            {heading && (
                                <div className="magezon-slide-heading" data-animate={heading_animation}>
                                    <MagezonHeading
                                        text={heading}
                                        heading_type={heading_type}
                                        font_size={heading_font_size}
                                        color={heading_color}
                                        font_weight={heading_font_weight}
                                    />
                                </div>
                            )}
                            {caption1 && (
                                <div className="magezon-slide-caption1" data-animate={caption1_animation}>
                                    <MagezonHeading
                                        text={caption1}
                                        heading_type={caption1_type}
                                        font_size={caption1_font_size}
                                        color={caption1_color}
                                        font_weight={caption1_font_weight}
                                    />
                                </div>
                            )}
                            {caption2 && (
                                <div className="magezon-slide-caption2" data-animate={caption2_animation}>
                                    <MagezonHeading
                                        text={caption2}
                                        heading_type={caption2_type}
                                        font_size={caption2_font_size}
                                        color={caption2_color}
                                        font_weight={caption2_font_weight}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="magezon-slide-image">
                        <picture>
                            <source srcSet={getImgThumbor} type="image/webp" />
                            <source srcSet={getImageFallbackUrl(getImgThumbor)} type="image/jpeg" />
                            <img
                                data-pagespeed-no-defer
                                className="img-bg"
                                src={getImgThumbor}
                                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                                alt="gambar"
                            />
                        </picture>
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    .magezon-slide {
                        height: ${slider_height}px;
                    }
                    .magezon-slide-image {
                        z-index: -1;
                        height: ${slider_height}px;
                        overflow: hidden;
                    }
                    .magezon-slide-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .magezon-slide-content-wrapper {
                        display: flex;
                        justify-content: flex-start;
                    }
                    .magezon-slide-captions {
                        max-width: ${content_wrapper_width}px;
                        display: flex;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        margin: 0 auto;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 100;
                    }
                    .magezon-slide-captions > div {
                        max-width: ${content_width}px;
                        text-align: ${content_align};
                        padding: ${content_padding}px;
                    }
                    .magezon-slide-heading {
                        background-color: ${heading_bg_color};
                    }
                    .magezon-slide-caption1 {
                        background-color: ${caption1_bg_color};
                    }
                    .magezon-slide-caption2 {
                        background-color: ${caption2_bg_color};
                    }
                    .magezon-slide-heading, .magezon-slide-caption1, .magezon-slide-caption2 {
                        margin-bottom: 5px;
                    }
                    .magezon-slide-heading :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${heading_line_height}px;
                        padding: ${heading_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-caption1 :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${caption1_line_height}px;
                        padding: ${caption1_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-caption2 :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${caption2_line_height}px;
                        padding: ${caption2_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-captions :global(.magezone-heading) {
                        justify-content: center;
                    }
                    .middle-center {
                        align-items: center;
                        justify-content: center;
                    }
                    .middle-left {
                        align-items: center;
                        justify-content: flex-start;
                    }
                    .middle-right {
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .top-left {
                        align-items: flex-start;
                        justify-content: flex-start;
                    }
                    .top-center {
                        align-items: flex-start;
                        justify-content: center;
                    }
                    .top-right {
                        align-items: flex-start;
                        justify-content: flex-end;
                    }
                    .bottom-left {
                        align-items: flex-end;
                        justify-content: flex-start;
                    }
                    .bottom-center {
                        align-items: flex-end;
                        justify-content: center;
                    }
                    .bottom-right {
                        align-items: flex-end;
                        justify-content: flex-end;
                    }
                `}
            </style>
        </>
    );
};

const useHoverStyle = (hoverEffect) => {
    let unhoverStyle = '';
    let hoverStyle = '';
    if (hoverEffect === 'zoomin' || hoverEffect === 'zoomout') {
        unhoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform-origin: center; transform: scale(1);';
        hoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform-origin: center;';
    }
    if (hoverEffect === 'zoomin') hoverStyle += 'transform: scale(1.02);';
    if (hoverEffect === 'zoomout') hoverStyle += 'transform: scale(0.98);';

    return { unhoverStyle, hoverStyle };
};

const MagezonSlider = (props) => {
    const {
        items, image_hover_effect, content_position,
        owl_nav, owl_dots, owl_lazyLoad, owl_loop, owl_autoplay, owl_autoplay_timeout, owl_rtl,
        owl_nav_size, owl_nav_position, owl_animate_in, owl_animate_out,
        owl_active_background_color, owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_dots_insie, slider_height,
    } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    const { unhoverStyle, hoverStyle } = useHoverStyle(image_hover_effect);
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;
    const navSize = owl_nav_size === 'mini' ? 10 : owl_nav_size === 'small' ? 15 : owl_nav_size === 'normal' ? 20 : 25;
    let sliderRef = useRef();

    const settings = {
        arrows: false,
        dots: true,
        infinite: owl_loop,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout || 2000,
        adaptiveHeight: true,
        pauseOnHover: true,
        lazyLoad: owl_lazyLoad,
        rtl: owl_rtl,
        customPaging: () => (
            <a>
                <div className="custom-slick-dots" />
            </a>
        ),
        beforeChange: (oldIdx, newIdx) => {
            const containerEl = sliderRef.innerSlider.list.querySelector(`[data-index="${newIdx}"] > div > div`);
            const prevContainerEl = sliderRef.innerSlider.list.querySelector(`[data-index="${oldIdx}"] > div > div`);

            if (owl_animate_out) {
                prevContainerEl.classList.add('animate__animated', `animate__${owl_animate_out}`);
                containerEl.classList.add('animate__animated', `animate__${owl_animate_in}`);

                if (prevContainerEl.classList.contains(`animate__${owl_animate_in}`)) {
                    prevContainerEl.classList.remove('animate__animated', `animate__${owl_animate_in}`);
                    prevContainerEl.classList.add('animate__animated', `animate__${owl_animate_out}`);
                }

                if (containerEl.classList.contains(`animate__${owl_animate_out}`)) {
                    containerEl.classList.remove('animate__animated', `animate__${owl_animate_out}`);
                    containerEl.classList.add('animate__animated', `animate__${owl_animate_in}`);
                }
            }

            const el = sliderRef.innerSlider.list.querySelectorAll(`
                [data-index="${newIdx}"] .magezon-slide-heading,
                [data-index="${newIdx}"] .magezon-slide-caption1,
                [data-index="${newIdx}"] .magezon-slide-caption2
            `);
            const prevEl = sliderRef.innerSlider.list.querySelectorAll(`
                [data-index="${oldIdx}"] .magezon-slide-heading,
                [data-index="${oldIdx}"] .magezon-slide-caption1,
                [data-index="${oldIdx}"] .magezon-slide-caption2
            `);

            prevEl.forEach((element) => {
                element.classList.remove('animate__animated', `animate__${element.dataset.animate}`);
            });

            setTimeout(() => {
                el.forEach((element) => {
                    const animValue = element.dataset.animate;
                    if (animValue) {
                        element.classList.add('animate__animated', `animate__${element.dataset.animate}`);
                    }
                });
            }, 1000);
            setSlideIndex(newIdx);
        },
    };

    return (
        <>
            <div className="magezon-slider">
                {owl_nav && owl_nav_position.includes('top') && (
                    <div className="magezon-slider-nav-top-arrow">
                        <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickPrev()}>
                            <LeftArrowIcon />
                        </div>
                        <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickNext()}>
                            <RightArrowIcon />
                        </div>
                    </div>
                )}
                {owl_nav && owl_nav_position === 'center_split' && (
                    <div className="magezon-slider-nav-center-arrow">
                        <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickPrev()}>
                            <LeftArrowIcon />
                        </div>
                        <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickNext()}>
                            <RightArrowIcon />
                        </div>
                    </div>
                )}
                <div className="magezon-slider-inner">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {items.map((item, i) => (
                            <MagezonSliderContent key={i} slider_height={slider_height} content_position={content_position} {...item} />
                        ))}
                    </Slider>
                </div>
                <div className="magezon-slider-nav-bottom">
                    {owl_nav && owl_nav_position.includes('bottom') && (
                        <div className="magezon-slider-nav-bottom-arrow">
                            <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickPrev()}>
                                <LeftArrowIcon />
                            </div>
                            <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickNext()}>
                                <RightArrowIcon />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .magezon-slider {
                        position: relative;
                    }
                    .magezon-slider-inner {
                        height: ${slider_height}px;
                    }
                    .magezon-slider-inner :global(.slick-slide) {
                        height: auto;
                    }
                    .magezon-slider-inner :global(.slick-track) {
                        height: ${slider_height}px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: center;
                    }
                    .magezon-slider-inner :global(.slick-arrow:before) {
                        font-size: 20px;
                    }
                    .magezon-slider-inner :global(.slick-arrow) {
                        z-index: 99;
                        ${owl_nav ? '' : 'display: none !important;'}
                    }
                    .magezon-slider-inner :global(.slick-arrow.slick-prev) {
                        left: 12px;
                    }
                    .magezon-slider-inner :global(.slick-arrow.slick-next) {
                        right: 12px;
                    }
                    .magezon-slider-inner :global(.magezon-slide) {
                        text-align: center;
                        position: relative;
                        // padding-bottom: ${100 * (slideHeight / slideWidth)}%;
                        background-color: #ddd;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        margin: 0 1px;
                        ${unhoverStyle}
                    }
                    .magezon-slider-inner :global(.magezon-slide:hover) {
                        ${hoverStyle}
                    }
                    @media screen and (min-width: 768px) {
                        .magezon-slider-inner :global(.slick-arrow:before) {
                            font-size: 24px;
                        }
                        .magezon-slider-inner :global(.slick-arrow.slick-prev) {
                            left: 16px;
                        }
                        .magezon-slider-inner :global(.slick-arrow.slick-next) {
                            right: 16px;
                        }
                    }
                    .magezon-slider-nav-top-arrow {
                        display: flex;
                        justify-content: ${owl_nav_position === 'top_left' ? 'flex-start' : owl_nav_position === 'top_right' ? 'flex-end' : 'space-between'};
                    }
                    .magezon-slider-nav-center-arrow {
                        opacity: 0;
                        position: absolute;
                        display: flex;
                        width: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                        justify-content: ${owl_nav_position === 'top_left' ? 'flex-start' : owl_nav_position === 'top_right' ? 'flex-end' : 'space-between'};
                        z-index: 1;
                    }
                    .magezon-slider:hover .magezon-slider-nav-center-arrow {
                        opacity: 1;
                    }
                    .magezon-slider-nav-bottom-arrow {
                        display: flex;
                        justify-content: ${owl_nav_position === 'bottom_left' ? 'flex-start' : owl_nav_position === 'bottom_right' ? 'flex-end' : owl_nav_position === 'bottom_center' ? 'center' : 'space-between'};
                    }
                    .magezon-slider-button-nav {
                        position: relative;
                        background-color: ${owl_background_color || '#eee'};
                        width: ${navSize * 2}px;
                        height: ${navSize * 2}px;
                        margin: ${navSize / 2}px 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: opacity 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
                    }
                    .magezon-slider-button-nav :global(svg) {
                        font-size: 15px;
                        color: ${owl_color};
                    }
                    .magezon-slider-button-nav:hover {
                        background-color: ${owl_hover_background_color || '#eee'};
                    }
                    .magezon-slider-button-nav:hover :global(svg) {
                        ${owl_hover_color && `color: ${owl_hover_color};`}
                    }
                    .magezon-slider-button-nav:hover {
                        cursor: pointer;
                        border: 1px solid black;
                    }
                    .magezon-slider-nav-bottom {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .magezon-slider-inner :global(.slick-dots) {
                        position: relative;
                        ${owl_dots_insie ? 'bottom: 50px;' : ''}
                    }
                    .magezon-slider-inner :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                        transition: transform 0.5s;
                    }
                    .magezon-slider-inner :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color || '#ffffff'};
                        ${owl_dots_insie ? 'transform: scale(1.5);' : ''}
                    }
                    .magezon-slider-inner :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSlider;
