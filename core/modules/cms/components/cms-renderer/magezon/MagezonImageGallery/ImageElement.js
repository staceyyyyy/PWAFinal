/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const ImageElement = (props) => {
    // prettier-ignore
    const {
        image, type, link,
        video_url, baseUrl,
        full_image, pauseSlick,
        height, fit, caption,
        captions,
    } = props;
    const videoCover = React.useRef();

    const videoUrl = video_url && video_url.split('=')[1];
    // prettier-ignore
    const imgUrl = type === 'link'
        ? link
        : type === 'media'
            ? full_image
                ? `${baseUrl}${full_image}`
                : `${baseUrl}${image}`
            : `${baseUrl}${image}`;
    const getImgUrl = generateThumborUrl(imgUrl, 0, 0);

    if (type === 'link' || type === 'media') {
        return (
            <>
                <div className="mgz-img-gallery-img-container" onClick={pauseSlick}>
                    {captions && caption && (
                        <div className="mgz-img-gallery-caption">
                            <WidgetRenderer content={caption} />
                        </div>
                    )}
                    <picture>
                        <source srcSet={getImgUrl} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(getImgUrl)} type="image/jpeg" />
                        <img
                            data-pagespeed-no-defer
                            src={getImgUrl}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/img/placeholder.png';
                            }}
                            alt="mediaimage"
                        />
                    </picture>
                </div>
                <style jsx>
                    {`
                        .mgz-img-gallery-img-container {
                            position: relative;
                            text-align: center;
                            overflow: hidden;
                        }
                        img {
                            display: block;
                            max-width: 100%;
                            height: ${height}px;
                            object-fit: ${fit === 'scaledown' ? 'scale-down' : fit};
                        }
                        .mgz-img-gallery-caption {
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            background-color: white;
                            transform: translate(-50%);
                            opacity: 0.9;
                        }
                        .mgz-img-gallery-caption :global(*) {
                            margin: 5px 8px;
                        }
                    `}
                </style>
                <style jsx global>
                    {`
                        .fullscreen .mgz-img-gallery-img-container img {
                            height: 100%;
                            max-height: 100vh;
                            margin: 20px;
                        }
                    `}
                </style>
            </>
        );
    }
    if (type === 'video') {
        return (
            <div className="mgz-img-slider-video-container">
                <div
                    ref={videoCover}
                    className="mgz-img-slider-video-cover"
                    onClick={(e) => {
                        e.stopPropagation();
                        videoCover.current.style.setProperty('display', 'none');
                    }}
                >
                    <PlayCircleOutlineIcon fontSize="large" />
                </div>
                <iframe
                    style={{ width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${videoUrl}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded Video"
                />
                <style jsx>
                    {`
                        .mgz-img-slider-video-container {
                            display: flex;
                            width: 100%;
                            position: relative;
                            overflow: hidden;
                            margin: 20px;
                        }
                        .mgz-img-slider-video-container iframe {
                            z-index: 1;
                        }
                        .mgz-img-slider-video-cover {
                            z-index: 2;
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            background-image: url(${imgUrl});
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-color: white;
                            background-position: center;
                        }
                        .mgz-img-slider-video-cover :global(svg) {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: white;
                            font-size: 60px;
                        }
                        .mgz-img-slider-video-cover:hover {
                            cursor: pointer;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default ImageElement;
