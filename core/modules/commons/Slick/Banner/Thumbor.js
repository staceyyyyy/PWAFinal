import classNames from 'classnames';
import { BREAKPOINTS } from '@theme_vars';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import useStyles from '@common_slick/Banner/style';

const Image = ({
    className = '', alt = 'Image', lazy = false, src, srcMobile, width, height, widthMobile, heightMobile,
}) => {
    const styles = useStyles();
    const imageUrl = generateThumborUrl(src, width, height);
    const mobileImageUrl = srcMobile ? generateThumborUrl(srcMobile, widthMobile, heightMobile) : null;

    return (
        <div className={styles.thumborContainer}>
            {!lazy ? (
                <>
                    <picture>
                        {srcMobile ? (
                            <>
                                <source srcSet={mobileImageUrl} media={`(max-width: ${BREAKPOINTS.sm}px)`} type="image/webp" />
                                <source srcSet={getImageFallbackUrl(mobileImageUrl)} media={`(max-width: ${BREAKPOINTS.sm}px)`} type="image/jpeg" />
                            </>
                        ) : null}
                        <source srcSet={imageUrl} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imageUrl)} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/jpeg" />
                        <img
                            data-pagespeed-no-defer
                            className={classNames(styles.thumborImage, className)}
                            src={imageUrl}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/img/placeholder.png';
                            }}
                            alt={alt}
                        />

                    </picture>
                </>
            ) : null}
        </div>
    );
};

export default Image;
