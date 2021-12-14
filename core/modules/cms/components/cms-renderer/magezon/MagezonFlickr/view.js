/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Typography from '@common_typography';
import PhotoSwipe from '../MagezonInstagramFeed/components/PhotoSwipe/index';

const ImageItem = ({ src, alt, onClick = () => {} }) => (
    <picture>
        <img
            onClick={onClick}
            className="magezon-flickr-img"
            data-pagespeed-no-defer
            src={src}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/img/placeholder.png';
            }}
            alt={alt}
        />

    </picture>
);

const MagezonFlickrView = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, title, title_tag, title_align, title_color,
        line_color, line_position, line_width, data, item_xs, item_sm, item_md, item_lg,
        hover_effect = 'zoomin',
    } = props;
    const photos = (data && data.photoset && data.photoset.photo);
    const images = photos && photos.length && photos.map((photo) => ({
        ...photo,
        caption: photo.title,
        media_url: `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
    }));

    const [open, setOpen] = React.useState(false);
    const [imagePosition, setImagePosition] = React.useState(null);

    let classFlickr = 'magezon-flickr ';
    if (xs_hide) classFlickr += 'hidden-mobile ';
    if (sm_hide) classFlickr += 'hidden-sm ';
    if (md_hide) classFlickr += 'hidden-md ';
    if (lg_hide) classFlickr += 'hidden-lg ';

    let classItem = 'magezon-item-flickr ';
    if (item_xs) classItem += `col-xs-${(12 / item_xs).toFixed(0)} `;
    if (item_sm) classItem += `col-sm-${(12 / item_sm).toFixed(0)} `;
    if (item_md) classItem += `col-md-${(12 / item_md).toFixed(0)} `;
    if (item_lg) classItem += `col-lg-${(12 / item_lg).toFixed(0)} `;

    const handleClick = (id) => {
        setImagePosition(id);
        setOpen(true);
    };

    let unhoverStyle = '';
    if (hover_effect === 'zoomin') unhoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform: scale(1.1);';
    if (hover_effect === 'zoomout') unhoverStyle = 'transform-origin: 0 0; transition: transform .25s, visibility .25s ease-in;';

    let hoverStyle = '';
    if (hover_effect === 'zoomin') hoverStyle = 'transform: scale(1);';
    if (hover_effect === 'zoomout') hoverStyle = 'transform: scale(1.1);';

    return (
        <>
            {open && images && images.length && (
                <PhotoSwipe
                    open={open}
                    setOpen={() => setOpen(false)}
                    data={images}
                    imagePosition={imagePosition}
                    max_items={images.length}
                />
            )}
            <div className={classFlickr}>
                <div className="magezon-title-flickr-box">
                    <Typography
                        variant={title_tag}
                        align={title_align}
                        className="magezon-title-flickr"
                    >
                        {title}
                    </Typography>
                </div>
                <div className="row">
                    {images && images.length && images.map((image, i) => (
                        <div key={i} className={classItem}>
                            <ImageItem
                                src={image.media_url}
                                onClick={() => handleClick(i)}
                                alt={image.caption}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style jsx global>
                {`
                .magezon-title-flickr-box {
                    width:100%;
                    text-align:${title_align}; 
                    position: relative;
                    margin-bottom: 10px;
                }
                .magezon-title-flickr {        
                    position:relative; 
                    padding:12px;
                    color: ${title_color};
                    background: #fff;
                    display: inline-block;
                    text-transform: uppercase;
                    z-index: 1
                }
                .magezon-title-flickr-box::after {
                    content:'';
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: ${line_position === 'center' ? '50%' : '100%'};
                    height: ${line_width}px;
                    background: ${line_color};
                    z-index:0;
                }
                .magezon-item-flickr img{
                    margin-bottom: 8px;
                    cursor: pointer;
                    max-width: 100%;
                    object-fit: cover;
                    width: 100%;
                    ${unhoverStyle}
                }
                .magezon-item-flickr img:hover{
                    ${hoverStyle}
                }
                `}
            </style>
        </>
    );
};

export default MagezonFlickrView;
