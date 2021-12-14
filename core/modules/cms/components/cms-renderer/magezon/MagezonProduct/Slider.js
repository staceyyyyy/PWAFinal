/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import useMediaQuery from '@material-ui/core/useMediaQuery';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import { useRef, useState } from 'react';
import Slider from 'react-slick';

const ProductSlider = (props) => {
    // prettier-ignore
    const {
        children,
        owl_active, owl_auto_height, owl_autoplay_timeout, owl_dots, owl_dots_speed,
        owl_item_xl, owl_item_lg, owl_item_md, owl_item_sm, owl_item_xs,
        owl_lazyload, owl_loop, owl_nav, owl_nav_position,
        owl_nav_size, owl_stage_padding,
        owl_active_background_color, owl_slide_by,
        owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_autoplay, owl_autoplay_hover_pause,
    } = props;

    const navSize = owl_nav_size === 'mini' ? 10 : owl_nav_size === 'small' ? 15 : owl_nav_size === 'normal' ? 20 : 25;
    const [showNav, setShowNav] = useState(true);
    const isXl = useMediaQuery('(min-width:1200px)');
    const isLg = useMediaQuery('(min-width:992px) and (max-width:1199px)');
    const isMd = useMediaQuery('(min-width:768px) and (max-width:991px)');
    const isSm = useMediaQuery('(min-width:576px) and (max-width:767px)');
    const isXs = useMediaQuery('(max-width:576px)');
    let sliderRef = useRef();

    const getItemsToShow = () => {
        let itemsToShow = 1;

        if (isXl && owl_item_xl) itemsToShow = owl_item_xl;
        if (isLg && owl_item_lg) itemsToShow = owl_item_lg;
        if (isMd && owl_item_md) itemsToShow = owl_item_md;
        if (isSm && owl_item_sm) itemsToShow = owl_item_sm;
        if (isXs && owl_item_xs) itemsToShow = owl_item_xs;

        return itemsToShow;
    };

    const settings = {
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout,
        speed: owl_dots_speed || 1000,
        dots: owl_dots,
        infinite: owl_loop,
        arrows: false,
        lazyload: owl_lazyload ? 'ondemand' : null,
        pauseOnHover: owl_autoplay_hover_pause,
        adaptiveHeight: owl_auto_height || false,
        customPaging: (i) => (
            <a key={i}>
                <div className="custom-slick-dots" />
            </a>
        ),
        slidesToShow: getItemsToShow(),
        slidesToScroll: owl_slide_by || 1,
        initialSlide: owl_active ? owl_active - 1 : 0,
        onReInit: () => {
            if (document.querySelector('.slick-dots')) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        },
    };

    return (
        <>
            <div className="mgz-product-slider">
                <div className="mgz-product-slider-content">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {children}
                    </Slider>
                    {owl_nav && showNav && (
                        <div className="mgz-product-slider-nav">
                            <div className="mgz-product-slider-nav--btn" onClick={() => sliderRef.slickPrev()}>
                                <LeftArrowIcon />
                            </div>
                            <div className="mgz-product-slider-nav--btn" onClick={() => sliderRef.slickNext()}>
                                <RightArrowIcon />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-product-slider :global(img) {
                        max-width: 100%;
                    }
                    .mgz-product-slider :global(.slick-slide) {
                        height: auto;
                    }
                    .mgz-product-slider :global(.slick-slider) {
                        padding: 0 ${owl_stage_padding}px;
                    }
                    .mgz-product-slider :global(.slick-list) {
                    }
                    .mgz-product-slider :global(.slick-dots) {
                        position: relative;
                    }
                    .mgz-product-slider :global(.slick-dots li) {
                        padding: 0 5px;
                    }
                    .mgz-product-slider :global(.slick-track) {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: stretch;
                    }
                    .mgz-product-slider :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                    }
                    .mgz-product-slider :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color || '#000000'};
                    }
                    .mgz-product-slider :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color || '#000000'};
                    }
                    .mgz-product-slider-content {
                        text-align: center;
                        ${owl_nav_position.includes('bottom') && (isXs || isSm) ? 'position: relative;' : ''}
                    }
                    .mgz-product-slider-nav {
                        position: absolute;
                        top: ${owl_nav_position.includes('top') ? (isXs || isSm ? '2%' : '10%') : '50%'};
                        bottom: ${owl_nav_position.includes('bottom') ? '-10%' : '50%'};
                        display: flex;
                        width: 100%;
                        justify-content: ${owl_nav_position === 'top_left' || owl_nav_position === 'bottom_left'
                            ? 'flex-start'
                            : owl_nav_position === 'top_right' || owl_nav_position === 'bottom_right'
                            ? 'flex-end'
                            : 'space-between'};
                    }
                    .mgz-product-slider-nav--btn {
                        display: flex;
                        z-index: 1;
                        margin: 0 2px;
                        ${owl_nav_position === 'center_split' ? 'opacity: 0;' : ''}
                        align-items: center;
                        justify-content: center;
                        width: ${navSize * 2}px;
                        height: ${navSize * 2}px;
                        background-color: ${owl_background_color || '#eee'};
                        transition: opacity 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
                    }
                    .mgz-product-slider:hover .mgz-product-slider-nav--btn {
                        ${owl_nav_position === 'center_split' ? 'opacity: 1;' : ''}
                    }
                    .mgz-product-slider-nav--btn:hover {
                        cursor: pointer;
                        border: 1px solid black;
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-product-slider-nav--btn :global(svg) {
                        font-size: 15px;
                        color: ${owl_color};
                    }
                    .mgz-product-slider-nav--btn:hover :global(svg) {
                        color: ${owl_hover_color};
                    }
                    .mgz-product-slider-dots {
                        display: flex;
                        justify-content: center;
                        margin: 5px;
                    }
                `}
            </style>
        </>
    );
};

export default ProductSlider;
