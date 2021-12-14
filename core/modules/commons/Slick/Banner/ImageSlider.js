/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
import { features } from '@config';
import classNames from 'classnames';
import useStyles from '@common_slick/Banner/style';
import Thumbor from '@common_slick/Banner/Thumbor';
import ProductVideo from '@common_slick/Banner/productVideo';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    width, height, imageUrl = '', link = '#', isSlug = true, mobileImageUrl = '', noLink,
    contentWidth, customClass = '', videoUrl,
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;

    if (noLink) {
        return (
            imageUrl && videoUrl && videoUrl.video_url
                ? <ProductVideo videoUrl={videoUrl} />
                : (
                    <Thumbor
                        src={imageUrl}
                        srcMobile={mobileImageUrl}
                        width={width || features.imageSize.homeSlider.desktop.width}
                        height={height || features.imageSize.homeSlider.desktop.height}
                        widthMobile={width || features.imageSize.homeSlider.mobile.width}
                        heightMobile={height || features.imageSize.homeSlider.mobile.height}
                        alt={href}
                        quality={100}
                        className={
                            contentWidth === 'auto'
                                ? classNames(styles.imageSliderAuto, styles.imageSlider, customClass)
                                : classNames(styles.imageSlider, customClass)
                        }
                    />
                )
        );
    }
    return (
        <Link href={isSlug ? '/[...slug]' : href} {...(isSlug && { as: href })}>
            <a>
                <Thumbor
                    src={imageUrl}
                    srcMobile={mobileImageUrl}
                    width={features.imageSize.homeSlider.desktop.width}
                    height={features.imageSize.homeSlider.desktop.height}
                    widthMobile={features.imageSize.homeSlider.mobile.width}
                    heightMobile={features.imageSize.homeSlider.mobile.height}
                    alt={href}
                    quality={100}
                    className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider) : styles.imageSlider}
                    contentWidth={contentWidth}
                    customClass={customClass}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
