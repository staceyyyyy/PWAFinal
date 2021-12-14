/* eslint-disable no-return-assign */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */

import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import formatDate from '@core/helpers/date';
import { getProductReviews } from '@core_modules/cms/services/graphql';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import Thumbor from '@common_image';
import { features } from '@config';

const MagezonRecentReviews = (props) => {
    // prettier-ignore
    const {
        description,
        line_color, line_position, line_width, show_line,
        title, title_align, title_tag,
        product_sku, max_items,
        review_color, review_content,
        review_customer, review_date, review_product_image,
        review_product_name, review_rating_star, review_title,
        review_star_color, review_link_color, review_background_color,
        owl_auto_height, owl_autoplay_timeout, owl_dots, owl_dots_speed,
        owl_item_xl, owl_item_lg, owl_item_md, owl_item_sm, owl_item_xs,
        owl_lazyload, owl_loop, owl_nav, owl_nav_position,
        owl_nav_size, owl_stage_padding,
        owl_active_background_color, owl_slide_by,
        owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_autoplay, owl_autoplay_hover_pause,
    } = props;
    const { data, loading } = getProductReviews({ sku: product_sku, pageSize: max_items });
    const reviewData = data?.products?.items[0] || [];

    const showLineClass = show_line ? 'mgz-recent-reviews-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-recent-reviews-heading-line--bottom' : '';
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
        slidesToScroll: owl_slide_by,
        onReInit: () => {
            if (document.querySelector('.slick-dots')) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        },
    };

    if (loading) return null;

    return (
        <>
            <div className="mgz-recent-reviews">
                <div className={`mgz-recent-reviews-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-recent-reviews-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div>{description}</div>
                </div>
                <div className="mgz-recent-reviews-content">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {reviewData.reviews.items.map((review, index) => (
                            <div key={index} className="mgz-recent-reviews-content-container">
                                {review_customer && (
                                    <Typography variant="h3" type="bold" className="review-nickname">
                                        {review.nickname}
                                    </Typography>
                                )}
                                <div className="rating-star" style={{ display: 'flex' }}>
                                    {review_rating_star && <RatingStar value={review.ratings_breakdown[0].value} />}
                                    {review_title && (
                                        <Link href={reviewData.url_key}>
                                            <a className="review-link">
                                                <Typography type="bold">{review.summary}</Typography>
                                            </a>
                                        </Link>
                                    )}
                                </div>
                                {review_date && <div className="review-date">{formatDate(review.created_at, 'M/DD/YY')}</div>}
                                {review_product_name && (
                                    <Link href={reviewData.url_key}>
                                        <a className="review-link">
                                            <Typography variant="h4" type="bold">
                                                {reviewData.name}
                                            </Typography>
                                        </a>
                                    </Link>
                                )}
                                <div style={{ display: 'flex' }}>
                                    {review_product_image && (
                                        <div style={{ width: features.imageSize.product.width, maxWidth: '20%', display: 'flex' }}>
                                            <Thumbor
                                                src={reviewData.small_image.url}
                                                width={features.imageSize.product.width}
                                                height={features.imageSize.product.height}
                                            />
                                        </div>
                                    )}
                                    {review_content && <div className="review-text">{review.text}</div>}
                                </div>
                            </div>
                        ))}
                    </Slider>
                    {owl_nav && showNav && (
                        <div className="mgz-recent-reviews-nav">
                            <div className="mgz-recent-reviews-nav--btn" onClick={() => sliderRef.slickPrev()}>
                                <LeftArrowIcon />
                            </div>
                            <div className="mgz-recent-reviews-nav--btn" onClick={() => sliderRef.slickNext()}>
                                <RightArrowIcon />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-recent-reviews-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-recent-reviews-heading-line:before {
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
                    .mgz-recent-reviews-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-recent-reviews-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-recent-reviews-content .rating-star :global(> div svg) {
                        color: ${review_star_color || '#ff5501'};
                    }
                    .mgz-recent-reviews-content-container > :global(*[class*='Typography']) {
                        margin: 5px 0;
                    }
                    .mgz-recent-reviews-content-container {
                        padding: 10px;
                        background-color: ${review_background_color || '#f5f5f5'};
                    }
                    .mgz-recent-reviews-content-container :global(.review-nickname),
                    .review-date,
                    .review-text {
                        color: ${review_color || '#000000'};
                    }
                    .review-text {
                        margin-left: 5px;
                    }
                    .review-link > :global(*) {
                        margin: 5px 0;
                        color: ${review_link_color || '#007bdb'};
                    }
                `}
            </style>
            <style jsx>
                {`
                    .mgz-recent-reviews {
                        ${isSm ? 'min-height: 600px;' : isXs ? 'min-height: 700px;' : ''}
                    }
                    .mgz-recent-reviews :global(.slick-slide > div) {
                        margin: 0 5px;
                    }
                    .mgz-recent-reviews :global(.slick-slider) {
                        padding: 0 ${owl_stage_padding}px;
                    }
                    .mgz-recent-reviews :global(.slick-list) {
                    }
                    .mgz-recent-reviews :global(.slick-dots) {
                        position: relative;
                        bottom: -70px;
                    }
                    .mgz-recent-reviews :global(.slick-track) {
                    }
                    .mgz-recent-reviews :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                    }
                    .mgz-recent-reviews :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color || '#000000'};
                    }
                    .mgz-recent-reviews :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color || '#000000'};
                    }
                    .mgz-recent-reviews-nav {
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
                    .mgz-recent-reviews-nav--btn {
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
                    .mgz-recent-reviews:hover .mgz-recent-reviews-nav--btn {
                        ${owl_nav_position === 'center_split' ? 'opacity: 1;' : ''}
                    }
                    .mgz-recent-reviews-nav--btn:hover {
                        cursor: pointer;
                        border: 1px solid black;
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-recent-reviews-nav--btn :global(svg) {
                        font-size: 15px;
                        color: ${owl_color};
                    }
                    .mgz-recent-reviews-nav--btn:hover :global(svg) {
                        color: ${owl_hover_color};
                    }
                    .mgz-recent-reviews-dots {
                        display: flex;
                        justify-content: center;
                        margin: 5px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonRecentReviews;
