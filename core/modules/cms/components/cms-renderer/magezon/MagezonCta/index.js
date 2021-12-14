// import Typography from '@common_typography';
import Typography from '@material-ui/core/Typography';
import MagezonButton from '@core_modules/cms/components/cms-renderer/magezon/MagezonButton';

const MagezonCta = (props) => {
    // prettier-ignore
    const {
        storeConfig,
        title, title_type, description,
        content_position, align: content_alignment, content_padding,
        content_hover_animation, content_animation_duration, sequenced_animation,
        image, image_position, image_animation_duration, image_hover_animation,
        label, label_distance, label_position,
        enable_button, button_size, button_title, button_link,
        button_style, button_color, button_hover_color,
        button_border_color, button_hover_border_color,
        button_background_color, button_hover_background_color,
        button_border_width, button_border_style, button_border_radius,
    } = props;
    const { base_media_url } = storeConfig;

    let classes = `mgz-cta mgz-cta-image-${image_position}`;
    let contentAnimationClass;
    let buttonClass = '';

    if (image_hover_animation) {
        classes += ` mgz-cta-bg-${image_hover_animation}`;
    }

    if (sequenced_animation) {
        classes += ' mgz-cta-sequenced-animation';
    }

    if (content_hover_animation) {
        contentAnimationClass = `mgz-animated-item--${content_hover_animation}`;
    }

    if (enable_button) {
        buttonClass += `mgz-cta-button-style--${button_style}`;

        if (button_size) {
            buttonClass += ` mgz-btn-size-${button_size}`;
        }
    }

    return (
        <>
            <div className={classes}>
                <div className="mgz-cta-bg">
                    <div className="mgz-cta-bg-image" />
                    <div className="mgz-cta-bg-overlay" />
                </div>
                <div className={`mgz-cta-content ${content_position}`}>
                    <div>
                        <Typography className={`mgz-cta-content-item ${contentAnimationClass} mgz-cta-title`} variant={title_type}>
                            {title}
                        </Typography>
                        {/* eslint-disable-next-line react/no-danger */}
                        <div className={`mgz-cta-content-item ${contentAnimationClass}`} dangerouslySetInnerHTML={{ __html: description }} />
                        {enable_button && (
                            <div className={`mgz-cta-content-item mgz-cta-button ${contentAnimationClass} ${buttonClass}`}>
                                <MagezonButton
                                    link={button_link}
                                    title={button_title}
                                    button_color={`${button_color || '#333'}`}
                                    button_border_color={`${button_border_color || '#000000'}`}
                                    button_background_color={`${button_background_color || '#e3e3e3'}`}
                                    button_border_style={button_border_style}
                                    button_border_width={`${button_border_width}px`}
                                    button_border_radius={`${button_border_radius ? `${button_border_radius}px` : '5px'}`}
                                    button_align="center"
                                />
                            </div>
                        )}
                    </div>
                </div>
                {label !== '' && (
                    <div className="mgz-cta-label">
                        <div className="mgz-cta-label-inner">{label}</div>
                    </div>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-cta {
                        position: relative;
                        overflow: hidden;
                        display: flex;
                    }
                    .mgz-cta-image-cover .mgz-cta-bg {
                        transition: all 0.4s;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                    }
                    .mgz-cta-bg-zoom-in.mgz-cta:hover .mgz-cta-bg-image {
                        transform: scale(1.2);
                    }
                    .mgz-cta-bg-zoom-out.mgz-cta .mgz-cta-bg-image {
                        transform: scale(1.2);
                    }
                    .mgz-cta-bg-zoom-out.mgz-cta:hover .mgz-cta-bg-image {
                        transform: scale(1);
                    }
                    .mgz-cta-bg-move-left.mgz-cta .mgz-cta-bg-image {
                        transform: scale(1.2) translateX(8%);
                    }
                    .mgz-cta-bg-move-left.mgz-cta:hover .mgz-cta-bg-image {
                        transform: scale(1.2) translateX(-8%);
                    }
                    .mgz-cta-bg-move-right.mgz-cta .mgz-cta-bg-image {
                        transform: scale(1.2) translateX(-8%);
                    }
                    .mgz-cta-bg-move-right.mgz-cta:hover .mgz-cta-bg-image {
                        transform: scale(1.2) translateX(8%);
                    }
                    .mgz-cta-bg-move-up.mgz-cta .mgz-cta-bg-image {
                        transform: scale(1.2) translateY(8%);
                    }
                    .mgz-cta-bg-move-up.mgz-cta:hover .mgz-cta-bg-image {
                        transform: scale(1.2) translateY(-8%);
                    }
                    .mgz-cta-bg-move-down.mgz-cta .mgz-cta-bg-image {
                        transform: scale(1.2) translateY(-8%);
                    }
                    .mgz-cta-bg-move-down.mgz-cta:hover .mgz-cta-bg-image {
                        transform: scale(1.2) translateY(8%);
                    }
                    .mgz-cta-image-top {
                        flex-wrap: wrap;
                    }
                    .mgz-cta-image-left {
                        flex-direction: row;
                    }
                    .mgz-cta-image-right {
                        flex-direction: row-reverse;
                    }
                    .mgz-cta-bg {
                        position: relative;
                        min-height: 200px;
                        width: 100%;
                    }
                    .mgz-cta-bg-image {
                        background-image: url(${base_media_url}${image});
                    }
                    .mgz-cta:not(.mgz-cta-image-cover) .mgz-cta-content {
                        background-color: #f7f7f7;
                    }
                    .mgz-cta-content {
                        transition: all 0.5s;
                        position: relative;
                        width: 100%;
                        z-index: 1;
                        min-height: 200px;
                        display: flex;
                        margin: 0 auto;
                        padding: ${content_padding}px;
                        text-align: ${content_alignment};
                    }
                    .middle-center {
                        align-items: center;
                        justify-content: center;
                    }
                    .middle-left {
                        align-items: center;
                        justify-content: flex-start;
                    }
                    .middle-right {
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .top-left {
                        align-items: flex-start;
                        justify-content: flex-start;
                    }
                    .top-center {
                        align-items: flex-start;
                        justify-content: center;
                    }
                    .top-right {
                        align-items: flex-start;
                        justify-content: flex-end;
                    }
                    .bottom-left {
                        align-items: flex-end;
                        justify-content: flex-start;
                    }
                    .bottom-center {
                        align-items: flex-end;
                        justify-content: center;
                    }
                    .bottom-right {
                        align-items: flex-end;
                        justify-content: flex-end;
                    }
                    .mgz-cta-content > div {
                        max-width: 100%;
                    }
                    .mgz-cta-bg-image,
                    .mgz-cta-bg-overlay {
                        transition: all 0.4s;
                        background-size: cover;
                        background-position: 50%;
                        z-index: 1;
                        position: absolute;
                        inset: 0;
                    }
                    .mgz-cta .mgz-cta-bg-image,
                    .mgz-cta .mgz-cta-bg-overlay {
                        transition-duration: ${image_animation_duration}ms;
                    }
                    .mgz-cta-button-style--modern .mgz-link {
                        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, 0.01) 100%);
                        background-repeat: repeat-x;
                    }
                    .mgz-link {
                        border-style: ${button_border_style};
                        border-radius: ${button_border_radius ? `${button_border_radius}px` : '5px'};
                        border-width: ${button_border_width ? `${button_border_width}px` : '1px'};
                    }
                    .mgz-link {
                        background-color: ${button_background_color || '#e3e3e3'};
                        padding: 10px 14px;
                        transition: all 0.2s;
                        margin: 0;
                        display: inline-block;
                        text-align: center;
                        cursor: pointer;
                        vertical-align: middle;
                        word-wrap: break-word;
                        text-decoration: none;
                        position: relative;
                        line-height: normal;
                        max-width: 100%;
                        height: auto;
                    }
                    .mgz-cta-label {
                        transform: ${label_position === 'right' ? 'rotate(90deg)' : 'rotate(0)'};
                        position: absolute;
                        z-index: 1;
                        top: 0;
                        right: ${label_position === 'right' ? 0 : 'auto'};
                        left: ${label_position === 'right' ? 'auto' : 0};
                        overflow: hidden;
                        width: 150px;
                        height: 150px;
                    }
                    .mgz-cta-label-inner {
                        transform: translateY(-50%) translateX(-50%) translateX(${label_distance ? `${label_distance}px` : '35px'}) rotate(-45deg);
                        text-align: center;
                        left: 0;
                        width: 200%;
                        margin-top: ${label_distance ? `${label_distance}px` : '35px'};
                        font-size: 13px;
                        line-height: 2;
                        font-weight: 800;
                        text-transform: uppercase;
                        background: #6eaf38;
                        color: white;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-cta-content > div > .mgz-cta-content-item {
                        margin-bottom: 15px;
                    }
                    *.mgz-cta-title {
                        font-weight: bolder !important;
                    }
                    h1.mgz-cta-title {
                        font-size: 2em;
                    }
                    h2.mgz-cta-title {
                        font-size: 1.5em;
                    }
                    h3.mgz-cta-title {
                        font-size: 1.17em;
                    }
                    h4.mgz-cta-title {
                        font-size: 1em;
                    }
                    h5.mgz-cta-title {
                        font-size: 0.83em;
                    }
                    h6.mgz-cta-title {
                        font-size: 0.67em;
                    }
                    .mgz-cta:hover .mgz-animated-item--grow {
                        transform: scale(1.1);
                    }
                    .mgz-cta:hover .mgz-animated-item--shrink {
                        transform: scale(0.85);
                    }
                    .mgz-cta .mgz-animated-item--enter-from-right,
                    .mgz-cta .mgz-animated-item--enter-from-left,
                    .mgz-cta .mgz-animated-item--enter-from-up,
                    .mgz-cta .mgz-animated-item--enter-from-bottom,
                    .mgz-cta .mgz-animated-item--enter-zoom-in,
                    .mgz-cta .mgz-animated-item--enter-zoom-out {
                        opacity: 0;
                    }
                    .mgz-cta:hover *[class*='mgz-animated-item--enter'] {
                        opacity: 1;
                    }
                    .mgz-cta *[class*='mgz-animated-item--exit-to-'] {
                        opacity: 1;
                        transform: translateX(0) translateY(0);
                    }
                    .mgz-cta:hover *[class*='mgz-animated-item--exit-to-'] {
                        opacity: 0;
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-to-right {
                        transform: translateX(1000px);
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-to-left {
                        transform: translateX(-1000px);
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-to-up {
                        transform: translateY(-600px);
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-to-bottom {
                        transform: translateY(600px);
                    }
                    .mgz-cta .mgz-animated-item--enter-from-right {
                        transform: translateX(1000px);
                    }
                    .mgz-cta:hover .mgz-animated-item--enter-from-right {
                        transform: translateX(0);
                    }
                    .mgz-cta .mgz-animated-item--enter-from-left {
                        transform: translateX(-1000px);
                    }
                    .mgz-cta:hover .mgz-animated-item--enter-from-left {
                        transform: translateX(0);
                    }
                    .mgz-cta .mgz-animated-item--enter-from-top {
                        transform: translateY(-600px);
                    }
                    .mgz-cta:hover .mgz-animated-item--enter-from-top {
                        transform: translateY(0);
                    }
                    .mgz-cta .mgz-animated-item--enter-from-bottom {
                        transform: translateY(600px);
                    }
                    .mgz-cta:hover .mgz-animated-item--enter-from-bottom {
                        transform: translateY(0);
                    }
                    .mgz-cta .mgz-animated-item--enter-zoom-in {
                        transform: scale(0.2);
                    }
                    .mgz-cta:hover .mgz-animated-item--enter-zoom-in {
                        transform: scale(1);
                    }
                    .mgz-cta .mgz-animated-item--enter-zoom-out {
                        transform: scale(2);
                    }
                    .mgz-cta:hover .mgz-animated-item--enter-zoom-out {
                        transform: scale(1);
                    }
                    .mgz-cta:hover .mgz-animated-item--move-right {
                        transform: translateX(30px);
                    }
                    .mgz-cta:hover .mgz-animated-item--move-left {
                        transform: translateX(-30px);
                    }
                    .mgz-cta:hover .mgz-animated-item--move-up {
                        transform: translateY(-30px);
                    }
                    .mgz-cta:hover .mgz-animated-item--move-down {
                        transform: translateY(30px);
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-zoom-in,
                    .mgz-cta:hover .mgz-animated-item--exit-zoom-out,
                    .mgz-cta:hover .mgz-animated-item--fade-out {
                        opacity: 0;
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-zoom-in {
                        transform: scale(2);
                    }
                    .mgz-cta:hover .mgz-animated-item--exit-zoom-out {
                        transform: scale(0.2);
                    }
                    .mgz-cta-content *[class*='mgz-animated-item--'] {
                        transition: ${content_animation_duration}ms;
                        width: 100%;
                    }
                    .mgz-cta-sequenced-animation .mgz-cta-content .mgz-cta-content-item:nth-child(2) {
                        transition-delay: calc(1000ms / 3);
                    }
                    .mgz-cta-sequenced-animation .mgz-cta-content .mgz-cta-content-item:nth-child(3) {
                        transition-delay: calc((1000ms / 3) * 2);
                    }
                    .mgz-cta-button-style--modern button {
                        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, 0.01) 100%);
                        background-repeat: repeat-x;
                    }
                    .mgz-cta-button.mgz-btn-size-xs button {
                        font-size: 11px;
                        padding: 8px 12px;
                    }
                    .mgz-cta-button.mgz-btn-size-sm button {
                        font-size: 12px;
                        padding: 11px 16px;
                    }
                    .mgz-cta-button.mgz-btn-size-md button {
                        font-size: 14px;
                        padding: 14px 20px;
                    }
                    .mgz-cta-button.mgz-btn-size-lg button {
                        font-size: 18px;
                        padding: 18px 30px;
                    }
                    .mgz-cta-button.mgz-btn-size-xl button {
                        font-size: 22px;
                        padding: 22px 35px;
                    }
                    .mgz-cta-button button:hover {
                        color: ${button_hover_color || '#5e5e5e'};
                        background-color: ${button_hover_background_color || '#dcdcdc'};
                        border-color: ${button_hover_border_color || '#000000'};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonCta;
