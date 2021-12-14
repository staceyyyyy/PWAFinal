import React from 'react';
import Link from 'next/link';
import { features } from '@config';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import Thumbor from '@common_image';
import useStyles from '@common_slider/Banner/style';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    imageUrl = '', link = '#', isSlug = true, width, height,
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;
    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <a>
                <Thumbor
                    src={setDefaultWhenEmpty(imageUrl)}
                    alt={href}
                    width={width || features.imageSize.homeSlider.width}
                    height={height || features.imageSize.homeSlider.height}
                    quality={100}
                    className={styles.imageSlider}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
