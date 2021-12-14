/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React from 'react';
import Typography from '@common_typography';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import dynamic from 'next/dynamic';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import SimpleReactLightbox, { SRLWrapper, useLightbox } from 'simple-react-lightbox';
import Link from '@material-ui/core/Link';
import PopupMapVideo from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage/PopupMapVideo';

const Carousel = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel/components'));

const ImageWithAction = ({
    withPopup, onClick = null, url, alt_tag, position,
}) => {
    const { openLightbox } = useLightbox();
    const handleClick = () => {
        // eslint-disable-next-line no-unused-expressions
        onClick ? onClick() : null;
        if (withPopup) {
            setTimeout(() => {
                openLightbox(position - 1);
            }, 100);
        }
    };
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link onClick={handleClick}>
            <img
                className="mgz-carousel-content-image"
                src={url || '/assets/img/placeholder.png'}
                alt={alt_tag || 'magezon image'}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/img/placeholder.png';
                }}
            />
        </Link>
    );
};

const MagezonText = (props) => {
    const {
        content_background, content_color, content_fullwidth, content_padding, content_position,
        display_on_hover, hover_effect, overlay_color, onclick, show_line, items,
        description, description_font_size, description_font_weight,
        title, title_tag, title_color, title_align, title_font_size, title_font_weight,
        image_border_color, image_border_radius, image_border_style, image_border_width, image_size,
        line_color, line_position, line_width,
        owl_color, owl_hover_color, owl_active_color,
        owl_background_color, owl_hover_background_color, owl_active_background_color,
        owl_item_xs, owl_item_sm, owl_item_md, owl_item_lg, owl_item_xl, owl_margin,
        owl_nav, owl_nav_size, owl_nav_position,
        owl_rtl, owl_autoplay, owl_autoplay_speed, owl_autoplay_timeout, owl_autoplay_hover_pause,
        owl_auto_height, owl_center, owl_dots, owl_loop, owl_slide_by, owl_lazyload, owl_stage_padding,
    } = props;

    const [openPopup, setOpenPoup] = React.useState(false);
    const [openPopupMap, setOpenPopupMap] = React.useState(false);
    const [videoMap, setVideoMap] = React.useState('');

    const mapList = (list) => {
        if (owl_loop) {
            if (list && list.length && list.length < 3) {
                return [...list, ...list, ...list];
            }
            if (list && list.length && list.length < 5) {
                return [...list, ...list];
            }
        }
        return list;
    };

    const validatePx = (prop) => {
        if (prop) {
            const tail = typeof prop !== 'string' ? String(prop).slice(-2) : prop.slice(-2);
            if (tail.toLowerCase() !== 'px') {
                return `${prop}px`;
            }
            return prop;
        }
        return 0;
    };

    let navSize = 0;
    if (owl_nav) {
        switch (owl_nav_size) {
        case ('mini'):
            navSize = 20;
            break;
        case ('small'):
            navSize = 30;
            break;
        case ('normal'):
            navSize = 40;
            break;
        case ('large'):
            navSize = 50;
            break;
        default:
            break;
        }
    }

    // eslint-disable-next-line consistent-return
    const positionSwitch = (s) => {
        switch (s) {
        case ('top'):
            return 'top:0; ';
        case ('bottom'):
            return 'bottom:0; ';
        case ('left'):
            return `right:${validatePx(owl_margin / 2)}; `;
        case ('right'):
            return `left:${validatePx(owl_margin / 2)}; `;
        case ('middle'):
            return 'top:0; bottom:0; height:50%; min-height:70px; ';
        case ('center'):
            return `left:${validatePx(owl_margin / 2)}; right:${validatePx(owl_margin / 2)}; `;
        default:
        }
    };

    let contentPositionClass = '';
    if (content_position !== 'none') {
        if (content_position !== 'below') {
            contentPositionClass += 'position: absolute; ';
            const listStyle = content_position.split('-');
            contentPositionClass += positionSwitch(listStyle[0]);
            contentPositionClass += positionSwitch(listStyle[1]);
        } else {
            contentPositionClass += `width: calc(100% - ${validatePx(owl_margin)}); `;
        }
    } else {
        contentPositionClass += 'display: none; ';
    }

    let arrowNav = '';
    let arrowNavMobile = '';
    let rightNav = '';
    let leftNav = '';
    const navList = owl_nav_position.split('_');
    if (owl_nav) {
        switch (navList[0]) {
        case ('top'):
            arrowNav = 'top: -80px; ';
            break;
        case ('bottom'):
            // arrowNav = 'bottom: -30%; ';
            arrowNav = `bottom: ${navList[1] === 'center' ? '-60px' : '-100px'}`;
            arrowNavMobile = `bottom: ${navList[1] === 'center' ? '30px' : '-30px'} !important`;
            break;
        case ('center'):
            arrowNav = 'top: calc(60% - 1rem); ';
            break;
        default:
        }
    }
    if (owl_nav) {
        switch (navList[1]) {
        case ('left'):
            rightNav = `left: calc(${validatePx(navSize)} + 10px) `;
            leftNav = 'left: 0; ';
            break;
        case ('right'):
            leftNav = `right: calc(${validatePx(navSize)} + 10px) `;
            rightNav = 'right: 0; ';
            break;
        case ('center'):
            leftNav = `left: calc(50% - ${validatePx(navSize)} - 5px) `;
            rightNav = `right: calc(50% - ${validatePx(navSize)} - 5px); `;
            break;
        case ('split'):
            leftNav = 'left: 0; ';
            rightNav = 'right: 0; ';
            break;
        default:
        }
    }
    // image hover style
    let hoverClass = '';
    if (hover_effect === 'zoomin') {
        hoverClass += ' mgz-carousel-zoomin';
    }

    if (hover_effect === 'zoomout') {
        hoverClass += ' mgz-carousel-zoomout';
    }

    const imageUrl = (item) => (`${getStoreHost(getAppEnv())}media/${item.image}` || '/assets/img/placeholder.png');
    const popupImageUrl = (item) => (`${getStoreHost(getAppEnv())}media/${item.popup_image || item.image}` || '/assets/img/placeholder.png');

    const ligthboxSetting = {
        buttons: {
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        },
        caption: {
            captionContainerPadding: '10px 25% 30px 25%',
        },
    };

    const callbacks = {
        onLightboxClosed: () => { setOpenPoup(false); },
    };

    const ImageWrapper = ({ item, children }) => (
        <div
            className="mgz-carousel-item-container"
        >
            <div className={hoverClass}>
                {children}

                {item.title || item.description
                    ? (
                        <div className="mgz-carousel-content-wrapper">
                            {item.title
                                && (
                                    <div className="mgz-carousel-content-title">
                                        {item.title}
                                    </div>
                                )}
                            {item.description
                                && (
                                    <div className="mgz-carousel-content-desc" style={{ marginTop: item.title ? 5 : 0 }}>
                                        {item.description}
                                    </div>
                                )}
                        </div>
                    )
                    : null}
                {overlay_color
                    && <div className="mgz-carousel-overlay" />}
            </div>
        </div>
    );

    const renderItemCarousel = (itemProp) => {
        const { item } = itemProp;
        return (
            onclick === 'custom_link'
                ? (
                    <MagezonLink link={item.custom_link}>
                        <ImageWrapper item={item}>
                            <ImageWithAction
                                url={imageUrl(item)}
                                alt_tag={item.title || '' || 'magezon image'}
                                onClick={null}
                                position={item.position}
                            />
                        </ImageWrapper>
                    </MagezonLink>
                )
                : (
                    <ImageWrapper item={item}>
                        <ImageWithAction
                            url={imageUrl(item)}
                            alt_tag={item.title || '' || 'magezon image'}
                            // eslint-disable-next-line no-nested-ternary
                            onClick={onclick === 'magnific'
                                ? item.video_map ? () => {
                                    setVideoMap(item.video_map);
                                    setTimeout(() => {
                                        setOpenPopupMap(!openPopup);
                                    }, 100);
                                }
                                    : () => setOpenPoup(!openPopup)
                                : null}
                            withPopup={onclick === 'magnific' && !item.video_map}
                            position={item.position}
                        />
                    </ImageWrapper>
                )
        );
    };

    return (
        <div className="mgz-carousel">
            {title || description
                ? title && (
                    <div className="mgz-carousel-heading">
                        <Typography className="mgz-carousel-heading-title" variant={title_tag} align={title_align} letter="uppercase">
                            {title}
                        </Typography>
                        {description
                            && (
                                <Typography className="mgz-carousel-heading-desc" align={title_align} variant="h6">
                                    {description}
                                </Typography>
                            )}
                    </div>
                )
                : null}
            {
                openPopupMap && (
                    <PopupMapVideo
                        open={openPopupMap}
                        setOpen={() => setOpenPopupMap(false)}
                        url={videoMap}
                        title={title}
                    />
                )
            }
            {onclick === 'magnific'
                ? (
                    <SimpleReactLightbox>

                        <Carousel
                            data={mapList(items)}
                            slideXs={owl_item_xs}
                            slideSm={owl_item_sm}
                            slideMd={owl_item_md}
                            slideLg={owl_item_lg}
                            slideXl={owl_item_xl}
                            infinite={owl_loop}
                            rtl={owl_rtl}
                            centerMode={owl_center}
                            pauseOnHover={owl_autoplay_hover_pause}
                            autoplay={owl_autoplay}
                            autoplaySpeed={owl_autoplay_speed}
                            dots={owl_dots}
                            slidesToScroll={owl_slide_by}
                            speed={owl_autoplay_timeout}
                            adaptiveHeight={owl_auto_height}
                            arrows={owl_nav}
                            lazyLoad={owl_lazyload}
                            Item={renderItemCarousel}
                            centerPadding={validatePx(owl_stage_padding)}
                        />
                        <div style={{
                            display: openPopup ? 'hidden' : 'none',
                        }}
                        >
                            <SRLWrapper options={ligthboxSetting} callbacks={callbacks}>
                                <Carousel
                                    data={items}
                                    infinite={false}
                                    rtl={owl_rtl}
                                    Item={(itemProp) => {
                                        const { item } = itemProp;
                                        return (
                                            <ImageWrapper item={item}>
                                                <img
                                                    className="mgz-carousel-content-image"
                                                    src={popupImageUrl(item)}
                                                    alt={item.popup_title || item.title || ''}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/assets/img/placeholder.png';
                                                    }}
                                                />
                                            </ImageWrapper>
                                        );
                                    }}
                                />
                            </SRLWrapper>
                        </div>
                    </SimpleReactLightbox>
                )
                : (
                    <Carousel
                        data={mapList(items)}
                        slideXs={owl_item_xs}
                        slideSm={owl_item_sm}
                        slideMd={owl_item_md}
                        slideLg={owl_item_lg}
                        slideXl={owl_item_xl}
                        infinite={owl_loop}
                        rtl={owl_rtl}
                        centerMode={owl_center}
                        pauseOnHover={owl_autoplay_hover_pause}
                        autoplay={owl_autoplay}
                        autoplaySpeed={owl_autoplay_speed}
                        dots={owl_dots}
                        slidesToScroll={owl_slide_by}
                        speed={owl_autoplay_timeout}
                        adaptiveHeight={owl_auto_height}
                        arrows={owl_nav}
                        lazyLoad={owl_lazyload}
                        Item={renderItemCarousel}
                        centerPadding={validatePx(owl_stage_padding)}
                    />
                )}
            <style jsx>
                {`
                    .mgz-carousel {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }
                    .mgz-carousel :global(a) {
                        color : transparent !important;
                    }
                    .mgz-carousel :global(.slick-track) {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .mgz-carousel :global(.slick-list) {
                        padding: 0 ${validatePx(owl_stage_padding)};
                    }
                    .mgz-carousel :global(.slick-dots) {
                        bottom: ${navList === 'bottom_center' ? '-85px' : '-45px'};
                    }
                    .mgz-carousel :global(.slick-dots li button:before) {
                        opacity: 1;
                        color: ${owl_background_color};
                        font-size: 10px;
                        transition: 0.3s;
                    }
                    .mgz-carousel :global(.slick-dots li:hover button:before) {
                        color: ${owl_hover_background_color};
                    }
                    .mgz-carousel :global(.slick-dots li.slick-active button:before) {
                        color: ${owl_active_background_color};
                    }
                    @media (min-width: 768px) {
                        .mgz-carousel {
                            height: auto;
                        }
                    }
                    @media (max-width: 767px) {
                        .mgz-carousel {
                            max-width: 100vw;
                        }
                    }
                    .mgz-carousel :global(.mgz-carousel-heading) {
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        position: relative;
                        text-align: ${title_align};
                        ${title_color ? `color: ${title_color}` : ''}
                    }
                    .mgz-carousel :global(.mgz-carousel-heading:before) {
                        content: '';
                        display: block;
                        height: ${show_line ? validatePx(line_width) : 0};
                        width: 100%;
                        background: ${line_color};
                        position: absolute;
                        top: ${line_position ? '40%' : '90%'};
                        bottom: 0;
                        z-index: 0;
                    }
                    .mgz-carousel :global(.mgz-carousel-heading-title) {
                        display: inline-block;
                        background: #FFF;
                        padding: 0 10px;
                        position: relative;
                        font-size: 1.5rem;
                        line-height: 1.2;
                    }
                    .mgz-carousel-heading-desc {
                        font-size: .75rem;
                    }
                    .mgz-carousel :global(.mgz-carousel-item-container) {
                        overflow: hidden;
                        position: relative;
                        margin: 0 ${validatePx(owl_margin / 2)};
                        cursor: pointer;
                    }
                    .mgz-carousel-item-container:hover .mgz-carousel-content-wrapper{
                        display: grid;
                    }
                    .mgz-carousel :global(.mgz-carousel-content-wrapper) {
                        background-color: ${content_background || 'transparent'};
                        color: ${content_color};
                        width: ${content_fullwidth ? '100%' : 'fit-content'};
                        padding: ${content_padding};
                        text-align: center;
                        margin: auto;
                        display: ${display_on_hover ? 'none' : 'grid'};
                        align-content: center;
                        ${contentPositionClass}
                        pointer-events: none;
                        left: 0;
                        right: 0;
                        z-index: 2;
                    }
                    .mgz-carousel :global(.mgz-carousel-content-title) {
                        font-size: ${validatePx(title_font_size)};
                        font-weight: ${title_font_weight};
                    }
                    .mgz-carousel :global(.mgz-carousel-content-desc) {
                        font-size: ${validatePx(description_font_size)};
                        font-weight: ${description_font_weight};
                    }
                    .mgz-carousel :global(.mgz-carousel-content-image) {
                        width: 100%;
                        width: ${image_size ? validatePx(image_size.split(' ')[0]) : ''};
                        height: ${image_size ? validatePx(image_size.split(' ')[1]) : ''};
                        border-width: ${validatePx(image_border_width)};
                        border-style: ${image_border_width ? image_border_style : null};
                        border-radius: ${validatePx(image_border_radius)};
                        border-color: ${image_border_color};
                    }
                    .mgz-carousel :global(.mgz-carousel-overlay) {
                        background-color: ${overlay_color || 'transparent'};
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        pointer-events: none;
                    }
                    .mgz-carousel-zoomout {
                        transition: transform 0.5s, filter 1s ease-in-out;
                        transform: scale(1.2);
                    }
                    .mgz-carousel-zoomout:hover {
                        transform: scale(1);
                    }
                    .mgz-carousel-zoomin {
                        transition: transform 0.5s, filter 1s ease-in-out;
                        transform: scale(1);
                    }
                    .mgz-carousel-zoomin:hover {
                        transform: scale(1.2);
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-carousel-arrow {
                        color: ${owl_color};
                        background-color: ${owl_background_color || 'transparent'};
                        width: ${navSize}px;
                        height: ${navSize}px;
                        font-size: 12px;
                        transition: 0.3s;
                        ${arrowNav}
                    }
                    .mgz-carousel-arrow:hover {
                        color: ${owl_hover_color};
                        background-color: ${owl_hover_background_color || 'transparent'}
                    }
                    .mgz-carousel-arrow:active {
                        color: ${owl_active_color};
                        background-color: ${owl_active_background_color || 'transparent'}
                    }
                    .mgz-carousel-arrow-left {
                        ${leftNav}
                    }
                    .mgz-carousel-arrow-right {
                        ${rightNav}
                    }
                    @media (max-width: 767px) {
                        .mgz-carousel-arrow {
                            ${arrowNavMobile}
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonText;
