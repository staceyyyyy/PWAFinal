import Thumbor from '@common_image';
import { features } from '@config';
import { generateImageDimensions } from '@helpers/image';
import { useEffect } from 'react';

const PromoBannersLite = (props) => {
    const {
        src = '', imgSrc = '', alt = '', classes, type = 'top',
    } = props;
    let { width, height } = generateImageDimensions(imgSrc);

    const resizeImg = () => {
        const { top, label, after } = features.imageSize.promoBannerLite;
        let ratio = 1;

        if (type === 'top' && width > top.width) {
            ratio = (top.width / width);
        }
        if (type === 'label' && width > label.width) {
            ratio = (label.width / width);
        }
        if (type === 'after' && width > after.width) {
            ratio = (after.width / width);
        }
        width *= ratio;
        height = Math.floor(height * ratio);
    };

    useEffect(() => {
        resizeImg();
    }, [imgSrc]);

    return (
        <div className={classes}>
            {src !== '' ? (
                <a href={src}>
                    <Thumbor src={imgSrc} alt={alt} width={width} height={height} />
                </a>
            ) : (
                <Thumbor src={imgSrc} alt={alt} width={width} height={height} />
            )}
        </div>
    );
};

export default PromoBannersLite;
