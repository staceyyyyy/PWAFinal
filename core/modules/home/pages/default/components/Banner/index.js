/* eslint-disable consistent-return */
import config from '@config';
import gqlService from '@core_modules/home/service/graphql';

const BannerSlider = (props) => {
    const { home } = config.modules;
    const {
        storeConfig, t, BannerSliderSkeleton, ErrorInfo, BannerView, slider_id,
    } = props;
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getSlider({
        variables: {
            input: slider_id === undefined ? { title: home.bannerSlider.title } : { id: slider_id },
        },
    });

    if (loading && !data) {
        return <BannerSliderSkeleton logoUrl={logoUrl} />;
    }
    if (error) {
        return <ErrorInfo variant="error" text={t('home:errorFetchData')} />;
    }
    if (!data || data.slider.images.length === 0) {
        return <ErrorInfo variant="warning" text={t('home:nullData')} />;
    }

    if (data && data.slider) {
        const bannerImages = data.slider.images.map((image) => ({
            imageUrl: image.image_url,
            mobileImageUrl: image.mobile_image_url || image.image_url,
            link: image.url_redirection,
        }));
        return (
            <>
                <BannerView logoUrl={logoUrl} images={bannerImages} />
            </>
        );
    }

    return null;
};

export default BannerSlider;
