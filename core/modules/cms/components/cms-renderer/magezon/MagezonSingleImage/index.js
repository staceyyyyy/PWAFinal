/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Thumbor from '@common_image';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import Link from '@material-ui/core/Link';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import SimpleReactLightbox, { SRLWrapper, useLightbox } from 'simple-react-lightbox';
import PopupMapVideo from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage/PopupMapVideo';

const ImageWithAction = ({
    withPopup, onClick, url, classContainer,
    classImage, image_width, image_height, title, ...other
}) => {
    const { openLightbox } = useLightbox();
    const handleClick = () => {
        onClick();
        if (withPopup) {
            setTimeout(() => {
                openLightbox();
            }, 100);
        }
    };
    return (
        <Link onClick={handleClick}>
            <Thumbor
                magezon
                // eslint-disable-next-line no-nested-ternary
                src={url || '/assets/img/placeholder.png'}
                className={classImage}
                quality={80}
                width={image_width ? image_width.replace('px', '') : ''}
                height={image_height ? image_height.replace('px', '') : ''}
                alt={title}
                classContainer={classContainer}
                {...other}
            />
        </Link>
    );
};

const MagezonSingleImage = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide,
        source, custom_src, image, image_width, image_height,
        onclick, custom_link, title, description, image_style,
        image_border_style, image_border_width, image_border_radius, image_border_color,
        title_font_size, image_hover_effect, display_on_hover, content_position,
        content_align, content_fullwidth, content_hover_background, content_hover_color, content_padding,
        popup_image, hover_image, hover_overlay_color, content_background, content_color,
        title_font_weight, description_font_weight, description_font_size, video_map,
        overlay_color,
    } = props;
    let classes = 'magezon-image';
    let classImage = 'mgz-single-image';
    let classContent = 'mgz-img-content';
    let classContainer = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';

    // image style
    if (image_style === 'mgz-box-outline') {
        classContainer += ' magezon-img-outline';
    }

    if (image_border_style !== '' || image_border_style !== '' || image_border_radius !== '') {
        classes += ' magezon-img-outline';
    }

    if (image_style === 'mgz-box-shadow') {
        classContainer += ' mgz-box-shadow';
    }

    if (image_style === 'mgz-box-shadow2') {
        classContainer += ' mgz-box-shadow2';
    }

    if (image_style === 'mgz-box-shadow-3d') {
        classContainer += ' mgz-box-shadow-3d';
    }

    // image hover style
    if (image_hover_effect === 'zoomin') {
        classImage += ' mgz-img-zoomin';
    }

    if (image_hover_effect === 'zoomout') {
        classImage += ' mgz-img-zoomout';
    }

    if (image_hover_effect === 'liftup') {
        classContainer += ' mgz-img-liftup';
    }

    // stle content
    if (display_on_hover) {
        classContent = 'mgz-img-content-hover';
    }
    if (content_position && content_position !== '') {
        classContent += ` ${content_position}`;
    } else if (content_position === '') {
        classContent += ' hide';
    }

    const url = custom_src || ((image && source === 'media_library')
        ? `${getStoreHost(getAppEnv())}media/${image}` : '/assets/img/placeholder.png');

    const popupImageUrl = custom_src || ((image && source === 'media_library')
        ? popup_image ? `${getStoreHost(getAppEnv())}media/${popup_image}`
            : `${getStoreHost(getAppEnv())}media/${image}`
        : '/assets/img/placeholder.png');

    const hoverImage = custom_src || ((image && source === 'media_library')
        ? hover_image ? `${getStoreHost(getAppEnv())}media/${hover_image}`
            : `${getStoreHost(getAppEnv())}media/${image}`
        : '/assets/img/placeholder.png');

    const [openPopupMap, setOpenPopupMap] = React.useState(false);

    const handleClick = () => {
        if (onclick === 'pdf') {
            window.location.href = url;
        }
        if (onclick === 'video_map') {
            setOpenPopupMap(true);
        }
    };

    const [openPopup, setOpenPopup] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const callbacks = {
        onLightboxClosed: () => { setIsHover(false); setOpenPopup(false); },
    };

    const ligtboxSetting = {
        buttons: {
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
            showNextButton: false,
            showPrevButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        },
        caption: {
            captionContainerPadding: '10px 25% 30px 25%',
        },
    };

    let imageCaption;
    if (title && description) imageCaption = `${title} - ${description}`;
    else if (title) imageCaption = title;
    else if (description) imageCaption = description;
    else imageCaption = 'Magezon Image';

    return (
        <div className={classes}>
            {
                openPopupMap && (
                    <PopupMapVideo
                        open={openPopupMap}
                        setOpen={() => setOpenPopupMap(false)}
                        url={video_map}
                        title={imageCaption}
                    />
                )
            }
            {(onclick && onclick === 'custom_link')
                ? (
                    <MagezonLink link={custom_link}>
                        <Thumbor
                            magezon
                            // eslint-disable-next-line no-nested-ternary
                            src={isHover ? hoverImage : url}
                            className={classImage}
                            quality={80}
                            width={image_width ? image_width.replace('px', '') : ''}
                            height={image_height ? image_height.replace('px', '') : ''}
                            alt={(`${title} - ${description}`) || 'magezon image'}
                            classContainer={classContainer}
                            onMouseOver={() => setIsHover(true)}
                            onMouseOut={() => setIsHover(false)}
                        />
                    </MagezonLink>
                )
                : (onclick && onclick === 'magnific')
                    ? (
                        <SimpleReactLightbox>
                            <div className={openPopup ? '' : 'hide'}>
                                <SRLWrapper options={ligtboxSetting} callbacks={callbacks}>
                                    <Thumbor
                                        magezon
                                        // eslint-disable-next-line no-nested-ternary
                                        src={popupImageUrl}
                                        className={classImage}
                                        quality={80}
                                        width={image_width ? image_width.replace('px', '') : ''}
                                        height={image_height ? image_height.replace('px', '') : ''}
                                        alt={imageCaption}
                                        classContainer={classContainer}
                                        onMouseOver={() => setIsHover(true)}
                                        onMouseOut={() => setIsHover(false)}
                                    />
                                </SRLWrapper>
                            </div>
                            {!openPopup && (
                                <ImageWithAction
                                    url={isHover ? hoverImage : url}
                                    image_width={image_width ? image_width.replace('px', '') : ''}
                                    image_height={image_height ? image_height.replace('px', '') : ''}
                                    classImage={classImage}
                                    title={imageCaption}
                                    classContainer={classContainer}
                                    withPopup
                                    onClick={() => setOpenPopup(!openPopup)}
                                    onMouseOver={() => setIsHover(true)}
                                    onMouseOut={() => setIsHover(false)}
                                />
                            )}
                        </SimpleReactLightbox>
                    )
                    : (
                        <ImageWithAction
                            url={isHover ? hoverImage : url}
                            image_width={image_width ? image_width.replace('px', '') : ''}
                            image_height={image_height ? image_height.replace('px', '') : ''}
                            classImage={classImage}
                            title={imageCaption}
                            classContainer={classContainer}
                            onClick={handleClick}
                            onMouseOver={() => setIsHover(true)}
                            onMouseOut={() => setIsHover(false)}
                        />
                    )}
            <div
                className={classContent}
                style={{
                    textAlign: content_align,
                }}
            >
                <div className="mgz-img-content-title">{title || ''}</div>
                <div className="mgz-img-content-desc">{description || ''}</div>
            </div>
            {overlay_color
                && <div className="mgz-img-over mgz-img-overlay" />}
            <style jsx>
                {`
                    .mgz-img-content {
                        text-align: ${content_align};
                        background-color: ${content_background};
                        color: ${content_color};
                        width: ${content_fullwidth || content_position === 'below' ? '100%' : 'fit-content'};
                        padding: ${content_padding || '10px 20px'};
                    }
                    .mgz-img-content-hover {
                        text-align: ${content_align};
                        color: ${content_hover_color || content_color};
                        background-color: ${content_hover_background || content_background};
                        width: ${content_fullwidth || content_position === 'below' ? '100%' : 'fit-content'};
                        padding: ${content_padding || '10px 20px'};
                    }
                    .mgz-img-content-title {
                        font-size: ${title_font_size};
                        font-weight: ${title_font_weight};
                    }
                    .mgz-img-content-desc {
                        font-weight: ${description_font_weight};
                        font-size: ${description_font_size};
                    }
                    .magezon-img-outline {
                        border: ${image_border_width} ${image_border_style} ${image_border_color};
                        border-radius: ${image_border_radius || '0px'};
                    }
                    .magezon-image :global(.mgz-single-image) {
                        border-radius: ${image_border_radius || '0px'};
                    }
                    .magezon-image :global(.mgz-box-shadow), .magezon-image :global(.mgz-box-shadow2) {
                        border-radius: ${image_border_radius || '0px'};
                    }
                    .mgz-img-overlay {
                        background-color: ${overlay_color};
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        pointer-events: none;
                    }
                    .magezon-image:hover .mgz-img-overlay {
                        background-color: ${hover_overlay_color};
                    }
                    .magezon-image:hover .mgz-img-content {
                        color: ${content_hover_color};
                        background-color: ${content_hover_background};
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .magezon-image {
                        position: relative;
                    }
                    .mgz-img-content {
                        position: relative;
                        pointer-events: none;
                    }
                    .mgz-img-content-hover {
                        display: none;
                        position: absolute;
                        pointer-events: none;
                    }

                    .top-left {
                        position: absolute;
                        left: 0px;
                        top: 0px;
                    }
                    .top-center {
                        position: absolute;
                        top: 0px,
                        left: 50%;
                        transform: translate(-50%);
                    }
                    .top-right {
                        position: absolute;
                        top:0px;
                        right: 0px;
                    }
                    .middle-left {
                        position: absolute;
                        top: 50%;
                        left: 0px;
                        transform: translate(0%, -50%);
                    }
                    .middle-center {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .middle-right {
                        position: absolute;
                        top: 50%;
                        right: 0px;
                        transform: translate(0%, -50%);
                    }
                    .bottom-left {
                        position: absolute;
                        bottom: 0px;
                        left:0px;
                    }
                    .bottom-center {
                        position: absolute;
                        bottom: 0px;
                        left: 50%;
                        transform: translate(-50%);
                    }

                    .bottom-right {
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                    }

                    .magezon-image:hover > .mgz-img-content-hover {
                        display: block;
                    }

                    .mgz-img-content-title {
                        font-size: ${title_font_size || '12px'};
                    }

                    .mgz-img-liftup {
                        transition: transform 1s, filter 2s ease-in-out;
                        transform: scale(1);
                    }

                    .mgz-img-liftup:hover {
                        transform: scale(1.05);
                    }

                    .mgz-img-zoomout {
                        transition: all 0.4s ease-in-out;
                        transform: scale(1.1);
                    }

                    .mgz-img-zoomout:hover {
                        transform: scale(1);
                    }

                    .mgz-img-zoomin {
                        transition: all 0.4s ease-in-out;
                        transform: scale(1);
                    }

                    .mgz-img-zoomin:hover {
                        transform: scale(1.1);
                    }

                    .mgz-box-shadow {
                        box-shadow: 0 0 10px rgb(0 0 0 / 50%);
                    }

                    .mgz-box-shadow2 {
                        box-shadow: 0 3px 10px rgb(0 0 0 / 15%);
                    }
                    .mgz-box-shadow-3d {
                    }
                    .mgz-box-shadow-3d:before {
                        box-shadow: 0 15px 10px rgb(0 0 0 / 60%);
                        transform: skewY(-6deg);                        
                        content: "";
                        position: absolute;
                        left: 5px;
                        height: 30%;
                        bottom: 8px;
                    }
                     .mgz-box-shadow-3d:after {
                        box-shadow: 0 15px 10px rgb(0 0 0 / 60%);
                        transform-origin: 0 0;
                        -o-transform: skewY(-6deg);
                        content: "";
                        position: absolute;
                        right: 50%;
                        bottom: 8px;
                        height: 30%;
                        z-index: -1;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonSingleImage;
