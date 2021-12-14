import React from 'react';
import MagezonColumn from '@core_modules/cms/components/cms-renderer/magezon/MagezonColumn';
import MagezonRow from '@core_modules/cms/components/cms-renderer/magezon/MagezonRow';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';
import MagezonSingleImage from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage';
import MagezonText from '@core_modules/cms/components/cms-renderer/magezon/MagezonText';
import MagezonButton from '@core_modules/cms/components/cms-renderer/magezon/MagezonButton';
import MagezonRawHtml from '@core_modules/cms/components/cms-renderer/magezon/MagezonRawHtml';
import MagezonWidget from '@core_modules/cms/components/cms-renderer/magezon/MagezonWidget';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import MagezonIconList from '@core_modules/cms/components/cms-renderer/magezon/MagezonIconList';
import MagezonSeparator from '@core_modules/cms/components/cms-renderer/magezon/MagezonSeparator';
import MagezonEmpty from '@core_modules/cms/components/cms-renderer/magezon/MagezonEmpty';
import MagezonFanspage from '@core_modules/cms/components/cms-renderer/magezon/MagezonFanspage';
import MagezonToggle from '@core_modules/cms/components/cms-renderer/magezon/MagezonToggle';
import MagezonFlipBox from '@core_modules/cms/components/cms-renderer/magezon/MagezonFlipBox';
import MagezonCounter from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/index';
import MagezonMessageBox from '@core_modules/cms/components/cms-renderer/magezon/MagezonMessageBox';
import MagezonNewsletter from '@core_modules/cms/components/cms-renderer/magezon/MagezonNewsletter';
import MagezonContactForm from '@core_modules/cms/components/cms-renderer/magezon/MagezonContactForm';
import MagezonCta from '@core_modules/cms/components/cms-renderer/magezon/MagezonCta';
import generateCustomCssAnimation from '@core_modules/cms/helpers/magezonCustomCssAnimationGenerator';
import MagezonSearchForm from '@core_modules/cms/components/cms-renderer/magezon/MagezonSearchForm';
import MagezonStaticBlock from '@core_modules/cms/components/cms-renderer/magezon/MagezonStaticBlock';
import MagezonPagebuilderTemplate from '@core_modules/cms/components/cms-renderer/magezon/MagezonPageBuilderTemplate';
import MagezonVideoPlayer from '@core_modules/cms/components/cms-renderer/magezon/MagezonVideoPlayer';
import MagezonPricingTable from '@core_modules/cms/components/cms-renderer/magezon/MagezonPricingTable';
import MagezonImageGallery from '@core_modules/cms/components/cms-renderer/magezon/MagezonImageGallery';
import MagezonCategories from '@core_modules/cms/components/cms-renderer/magezon/MagezonCategories';
import MagezonContentSlider from '@core_modules/cms/components/cms-renderer/magezon/MagezonContentSlider';
import MagezonTestimonials from '@core_modules/cms/components/cms-renderer/magezon/MagezonTestimonials';
import MagezonRecentReviews from '@core_modules/cms/components/cms-renderer/magezon/MagezonRecentReviews';
import MagezonGoogleMaps from '@core_modules/cms/components/cms-renderer/magezon/MagezonGoogleMaps';
import MagezonProgressBar from '@core_modules/cms/components/cms-renderer/magezon/MagezonProgressBar';
import MagezonAccordion from '@core_modules/cms/components/cms-renderer/magezon/MagezonAccordion';
import MagezonSection from '@core_modules/cms/components/cms-renderer/magezon/MagezonSection';
import MagezonPageableContainer from '@core_modules/cms/components/cms-renderer/magezon/MagezonPageableContainer';
import dynamic from 'next/dynamic';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'animate.css';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct'));
const MagezonSlider = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSlider'));
const MagezonInstagram = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed'), { ssr: false });
const MagezonPinterest = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPinterest'), { ssr: false });
const MagezonTwitter = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTwitter'), { ssr: false });
const MagezonParallax = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonParallax'), { ssr: false });
const MagezonFlickr = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonFlickr'), { ssr: false });
const MagezonCountdown = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCountdown'), { ssr: false });
const MagezonCaraousel = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel'), { ssr: false });
const MagezonSocialIcons = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSocialIcons'), { ssr: false });

const MagezonElement = (props) => {
    const {
        type, content,
        animation_in, animation_duration, animation_delay, animation_infinite,
        parallax_type, parallax_speed,
        mouse_parallax, mouse_parallax_size, mouse_parallax_speed,
        background_image, background_color, full_height,
        xs_hide, sm_hide, md_hide, lg_hide, xl_hide,
        hidden_default, disable_element,
        storeConfig,
    } = props;
    const { base_media_url } = storeConfig;
    const customStyles = useStyles();
    let childrenContent;
    let classes = `${customStyles.wrapper} mgz-element `;
    const { className, styles } = generateCustomCssAnimation(animation_duration, animation_delay, animation_infinite);
    const enumCustomAnimation = {
        topToBottom: 'mgz_top-to-bottom',
        bottomToTop: 'mgz_bottom-to-top',
        leftToRight: 'mgz_left-to-right',
        rightToLeft: 'mgz_right-to-left',
        appear: 'mgz_appear',
        backSlideIn: 'owl-backSlide-in',
        fadeUpIn: 'owl-fadeUp-in',
        goDownIn: 'owl-goDown-in',
    };

    if (full_height) {
        classes += 'full_height ';
    }

    if (disable_element) return null;

    if (xs_hide) classes += 'xs-hide ';
    if (sm_hide) classes += 'sm-hide ';
    if (md_hide) classes += 'md-hide ';
    if (lg_hide) classes += 'lg-hide ';
    if (xl_hide) classes += 'xl-hide ';

    if (hidden_default) classes += 'hidden-default ';

    if (animation_in) {
        if (!Object.values(enumCustomAnimation).includes(animation_in)) {
            // base CSS animation using animate.css class and utility class
            classes += `animate__animated animate__${animation_in}`;
            if (animation_delay) {
                classes += ` animate__delay-${animation_delay}s`;
            }
            if (animation_infinite) {
                classes += ' animate__infinite';
            }
            if (animation_duration) {
                classes += ' animation_duration';
            }
        } else {
            // custom CSS animation
            classes += `${animation_in} ${className}`;
            if (animation_duration || animation_delay || animation_infinite) {
                classes += ' custom_animation';
            }
        }
    }

    React.useEffect(() => {
        if (type && type === 'raw_js' && content && content !== '' && content.includes('<script>')) {
            if (typeof window !== 'undefined') {
                let code = content.replace('<script>', '');
                code = code.replace('</script>', '');
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.innerHTML = code;
                document.body.appendChild(script);
            }
        }
    }, [props]);

    if (type) {
        switch (type) {
        case 'row':
            childrenContent = <MagezonRow {...props} />; break;
        case 'column':
            childrenContent = <MagezonColumn {...props} />; break;
        case 'heading':
            childrenContent = <MagezonHeading {...props} />; break;
        case 'single_image':
            childrenContent = <MagezonSingleImage {...props} />; break;
        case 'text':
            childrenContent = <MagezonText {...props} />; break;
        case 'button':
            childrenContent = <MagezonButton {...props} />; break;
        case 'raw_html':
            childrenContent = <MagezonRawHtml {...props} />; break;
        case 'magento_widget':
            childrenContent = <MagezonWidget {...props} />; break;
        case 'instagram':
            childrenContent = <MagezonInstagram {...props} />; break;
        case 'pinterest':
            childrenContent = <MagezonPinterest {...props} />; break;
        case 'twitter_button':
            childrenContent = <MagezonTwitter {...props} />; break;
        case 'twitter_timeline':
            childrenContent = <MagezonTwitter {...props} />; break;
        case 'icon':
            childrenContent = <MagezonIcon {...props} />; break;
        case 'icon_list':
            childrenContent = <MagezonIconList {...props} />; break;
        case 'separator':
            childrenContent = <MagezonSeparator {...props} />; break;
        case 'empty_space':
            childrenContent = <MagezonEmpty {...props} />; break;
        case 'facebook_page':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'facebook_comments':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'facebook_like':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'toggle':
            childrenContent = <MagezonToggle {...props} />; break;
        case 'number_counter':
            childrenContent = <MagezonCounter {...props} />; break;
        case 'message_box':
            childrenContent = <MagezonMessageBox {...props} />; break;
        case 'newsletter_form':
            childrenContent = <MagezonNewsletter {...props} />; break;
        case 'contact_form':
            childrenContent = <MagezonContactForm {...props} />; break;
        case 'flip_box':
            childrenContent = <MagezonFlipBox {...props} />; break;
        case 'static_block':
            childrenContent = <MagezonStaticBlock {...props} />; break;
        case 'flickr':
            childrenContent = <MagezonFlickr {...props} />; break;
        case 'call_to_action':
            childrenContent = <MagezonCta {...props} />; break;
        case 'countdown':
            childrenContent = <MagezonCountdown {...props} />; break;
        case 'slider':
            childrenContent = <MagezonSlider {...props} />; break;
        case 'image_carousel':
            childrenContent = <MagezonCaraousel {...props} />; break;
        case 'search_form':
            childrenContent = <MagezonSearchForm {...props} />; break;
        case 'social_icons':
            childrenContent = <MagezonSocialIcons {...props} />; break;
        case 'pagebuilder_template':
            childrenContent = <MagezonPagebuilderTemplate {...props} />; break;
        case 'video':
            childrenContent = <MagezonVideoPlayer {...props} />; break;
        case 'pricing_table':
            childrenContent = <MagezonPricingTable {...props} />; break;
        case 'image_gallery':
            childrenContent = <MagezonImageGallery {...props} />; break;
        case 'categories':
            childrenContent = <MagezonCategories {...props} />; break;
        case 'content_slider':
            childrenContent = <MagezonContentSlider {...props} />; break;
        case 'recent_reviews':
            childrenContent = <MagezonRecentReviews {...props} />; break;
        case 'single_product':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'product_list':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'product_grid':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'product_slider':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'testimonials':
            childrenContent = <MagezonTestimonials {...props} />; break;
        case 'gmaps':
            childrenContent = <MagezonGoogleMaps {...props} />; break;
        case 'progress_bar':
            childrenContent = <MagezonProgressBar {...props} />; break;
        case 'section':
            childrenContent = <MagezonSection {...props} />; break;
        case 'accordion':
            childrenContent = <MagezonAccordion {...props} />; break;
        case 'pageable_container':
            childrenContent = <MagezonPageableContainer {...props} />; break;
        default:
            childrenContent = null;
        }
    }

    return (
        <>
            <div className={classes}>
                {background_image && (
                    <>
                        <div className="parallax-wrapper mouse-parallax">
                            <MagezonParallax
                                src={`${base_media_url}${background_image}`}
                                speed={parallax_speed}
                                type={parallax_type}
                                mouseParallax={mouse_parallax}
                                mouseSize={mouse_parallax_size}
                            />
                        </div>
                    </>
                )}
                {childrenContent}
            </div>
            <style jsx>
                {`
                    .mgz-element {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        ${background_color ? `background-color: ${background_color};` : ''}
                    }
                    .full_height {
                        min-height: 433px;
                    }
                    .hidden-default {
                        display: none;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-column > * {
                        padding: 10px;
                    }
                    .animation_duration {
                        --animate-duration: ${animation_duration || 0.5}s;
                    }
                    .parallax-wrapper {
                        border-radius: inherit;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        overflow: hidden;
                        // pointer-events: none;
                    }
                    .parallax-wrapper * {
                        position: absolute;
                    }
                    .parallax-wrapper.mouse-parallax {
                        transform: translateX(0);
                    }
                    .jarallax {
                        inset: -${mouse_parallax_size}px;
                        transition: transform ${mouse_parallax_speed}ms cubic-bezier(0.22, 0.63, 0.6, 0.88) 0s;

                        background-image: none;
                        background-size: auto;
                        background-position: center top;
                        background-repeat: no-repeat;
                    }
                    .jarallax * {
                        background-size: inherit !important;
                        background-position: inherit !important;
                        background-repeat: inherit !important;
                    }
                `}
            </style>
            {styles}
        </>
    );
};

export default MagezonElement;
