/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import Typography from '@common_typography';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import { useRef, useState } from 'react';
import Slider from 'react-slick';

const MagezonContentSlider = (props) => {
    // prettier-ignore
    const {
        description, items,
        line_color, line_position, line_width,
        owl_auto_height, owl_autoplay_timeout, owl_dots, owl_dots_speed,
        owl_item_xl, owl_item_lg, owl_item_md, owl_item_sm, owl_item_xs,
        owl_lazyload, owl_loop, owl_nav, owl_nav_position,
        owl_nav_size, owl_stage_padding, show_line,
        owl_active_background_color,
        owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_autoplay, owl_autoplay_hover_pause,
        title, title_align, title_tag,
    } = props;

    const showLineClass = show_line ? 'mgz-content-slider-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-content-slider-heading-line--bottom' : '';
    const navSize = owl_nav_size === 'mini' ? 10 : owl_nav_size === 'small' ? 15 : owl_nav_size === 'normal' ? 20 : 25;
    const [showNav, setShowNav] = useState(true);
    const isXl = useMediaQuery('(min-width:1200px)');
    const isLg = useMediaQuery('(min-width:992px) and (max-width:1199px)');
    const isMd = useMediaQuery('(min-width:768px) and (max-width:991px)');
    const isSm = useMediaQuery('(min-width:576px) and (max-width:767px)');
    const isXs = useMediaQuery('(max-width:576px)');
    let sliderRef = useRef();

    const getItemsToShow = () => {
        let itemsToShow;

        if (isXl) itemsToShow = owl_item_xl;
        if (isLg) itemsToShow = owl_item_lg;
        if (isMd) itemsToShow = owl_item_md;
        if (isSm) itemsToShow = owl_item_sm;
        if (isXs) itemsToShow = owl_item_xs;

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
        adaptiveHeight: owl_auto_height,
        customPaging: () => (
            <a>
                <div className="custom-slick-dots" />
            </a>
        ),
        slidesToShow: getItemsToShow(),
        slidesToScroll: getItemsToShow(),
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
            <div className="mgz-content-slider">
                <div className={`mgz-content-slider-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-content-slider-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div>{description}</div>
                </div>
                <div className="mgz-content-slider-content">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {items.map((item, index) => (
                            <WidgetRenderer key={index} content={item.content} />
                        ))}
                    </Slider>
                    {owl_nav && showNav && (
                        <div className="mgz-content-slider-nav">
                            <div className="mgz-content-slider-nav--btn" onClick={() => sliderRef.slickPrev()}>
                                <LeftArrowIcon />
                            </div>
                            <div className="mgz-content-slider-nav--btn" onClick={() => sliderRef.slickNext()}>
                                <RightArrowIcon />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-content-slider {
                        ${isSm ? 'min-height: 600px;' : isXs ? 'min-height: 700px;' : ''}
                    }
                    .mgz-content-slider :global(.slick-slider) {
                        padding: 0 ${owl_stage_padding}px;
                    }
                    .mgz-content-slider :global(.slick-list) {
                        // min-height: 180px !important;
                        position: relative;
                        overflow: hidden;
                    }
                    .mgz-content-slider :global(.slick-dots) {
                        position: relative;
                        bottom: -70px;
                    }
                    .mgz-content-slider :global(.slick-track) {
                    }
                    .mgz-content-slider :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                    }
                    .mgz-content-slider :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color};
                    }
                    .mgz-content-slider :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-content-slider-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-content-slider-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-content-slider-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-content-slider-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-content-slider-content {
                        text-align: center;
                        ${owl_nav_position.includes('bottom') && (isXs || isSm) ? 'position: relative;' : ''}
                    }
                    .mgz-content-slider-nav {
                        position: absolute;
                        top: ${owl_nav_position.includes('top') ? (isXs || isSm ? '2%' : '10%') : 'auto'};
                        bottom: ${owl_nav_position.includes('bottom') ? '-10%' : 'auto'};
                        display: flex;
                        width: 100%;
                        justify-content: ${owl_nav_position === 'top_left' || owl_nav_position === 'bottom_left'
                            ? 'flex-start'
                            : owl_nav_position === 'top_right' || owl_nav_position === 'bottom_right'
                            ? 'flex-end'
                            : 'space-between'};
                    }
                    .mgz-content-slider-nav--btn {
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
                    .mgz-content-slider:hover .mgz-content-slider-nav--btn {
                        ${owl_nav_position === 'center_split' ? 'opacity: 1;' : ''}
                    }
                    .mgz-content-slider-nav--btn:hover {
                        cursor: pointer;
                        border: 1px solid black;
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-content-slider-nav--btn :global(svg) {
                        font-size: 15px;
                        color: ${owl_color};
                    }
                    .mgz-content-slider-nav--btn:hover :global(svg) {
                        color: ${owl_hover_color};
                    }
                    .mgz-content-slider-dots {
                        display: flex;
                        justify-content: center;
                        margin: 5px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonContentSlider;
