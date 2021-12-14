/* eslint-disable indent */

import Image from '@common_image';
import Typography from '@common_typography';
import Carousel from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Slider';
import Link from 'next/link';

const TestimonialItem = (props) => {
    // prettier-ignore
    const {
        box_background_color, box_color, content,
        image, job, link, name, storeConfig,
        image_width, testimonial_type,
    } = props;

    const { secure_base_media_url } = storeConfig;

    return (
        <>
            {testimonial_type === 'type1' && (
                <div className="mgz-testimonial-item">
                    <div className="mgz-testimonial-img">
                        <Image src={`${secure_base_media_url}${image}`} width={image_width} height={image_width} lazy />
                    </div>
                    <div className="mgz-testimonial-content">{content}</div>
                    <div className="mgz-testimonial-meta">
                        {link ? (
                            <Link href={link}>
                                <a>
                                    <Typography type="bold">{`${name},`}</Typography>
                                </a>
                            </Link>
                        ) : (
                            <Typography type="bold">{`${name},`}</Typography>
                        )}
                        <Typography>{job}</Typography>
                    </div>
                </div>
            )}
            {testimonial_type === 'type2' && (
                <div className="mgz-testimonial-item">
                    <div className="mgz-testimonial-content">{content}</div>
                    <div className="mgz-testimonial-type2">
                        <div className="mgz-testimonial-img">
                            <Image src={`${secure_base_media_url}${image}`} width={image_width} height={image_width} lazy />
                        </div>
                        <div className="mgz-testimonial-meta">
                            {link ? (
                                <Link href={link}>
                                    <a>
                                        <Typography type="bold">{`${name},`}</Typography>
                                    </a>
                                </Link>
                            ) : (
                                <Typography type="bold">{`${name},`}</Typography>
                            )}
                            <Typography>{job}</Typography>
                        </div>
                    </div>
                </div>
            )}
            {testimonial_type === 'type3' && (
                <>
                    <div className="mgz-testimonial-item">
                        <div className="mgz-testimonial-content type3">{content}</div>
                    </div>
                    <div className="mgz-testimonial-type3">
                        <div className="mgz-testimonial-img">
                            <Image src={`${secure_base_media_url}${image}`} width={image_width} height={image_width} lazy />
                        </div>
                        <div className="mgz-testimonial-meta">
                            {link ? (
                                <Link href={link}>
                                    <a>
                                        <Typography type="bold">{`${name},`}</Typography>
                                    </a>
                                </Link>
                            ) : (
                                <Typography type="bold">{`${name},`}</Typography>
                            )}
                            <Typography>{job}</Typography>
                        </div>
                    </div>
                </>
            )}
            <style jsx>
                {`
                    .mgz-testimonial-item {
                        padding: 25px;
                        position: relative;
                        ${box_background_color ? `background-color: ${box_background_color};` : ''}
                        ${box_color ? `color: ${box_color};` : ''}
                    }
                    .mgz-testimonial-meta :global(> *[class*='Typography']) {
                        ${box_color ? `color: ${box_color};` : ''}
                    }
                    .mgz-testimonial-meta :global(a:hover) {
                        text-decoration: underline;
                    }
                    .mgz-testimonial-type2 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .mgz-testimonial-type2 .mgz-testimonial-img,
                    .mgz-testimonial-type3 .mgz-testimonial-img {
                        margin: 0;
                        margin-right: 12px;
                    }
                    .mgz-testimonial-type2 .mgz-testimonial-meta > :global(*) {
                        display: block;
                        text-align: center;
                    }
                    .mgz-testimonial-type2 .mgz-testimonial-meta > :global(span:nth-child(1)) {
                        margin: 0 5px;
                    }
                    .mgz-testimonial-type3 {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-top: 15px;
                    }
                `}
            </style>
        </>
    );
};

const MagezonTestimonials = (props) => {
    // prettier-ignore
    const {
        box_background_color, box_border_radius, box_color,
        content_align, content_color, content_font_size, content_font_weight,
        image_width, image_border_radius,
        items, testimonial_type, title, storeConfig,
        job_color, job_font_size, job_font_weight,
        name_color, name_font_size, name_font_weight,
        ...carouselProps
    } = props;

    return (
        <>
            <div className="mgz-testimonials">
                <Carousel {...carouselProps}>
                    {items.map((item, index) => (
                        <TestimonialItem
                            key={index}
                            storeConfig={storeConfig}
                            image_width={image_width}
                            testimonial_type={testimonial_type}
                            {...item}
                        />
                    ))}
                </Carousel>
            </div>
            <style jsx>
                {`
                    .mgz-testimonials :global(.mgz-testimonial-item) {
                        ${box_background_color ? `background-color: ${box_background_color} !important;` : ''}
                        ${box_color ? `color: ${box_color} !important;` : ''}
                        ${testimonial_type === 'type3' && !box_background_color ? 'background-color: #34495e;' : ''}
                        ${testimonial_type === 'type3' && !box_color ? 'color: #ffffff;' : ''}
                        ${box_border_radius ? `border-radius: ${box_border_radius}px` : ''}
                    }
                    .mgz-testimonials :global(.mgz-testimonial-item:before) {
                        ${
                            testimonial_type === 'type3'
                                ? `
                            position: absolute;
                            left: 35px;
                            bottom: -20px;
                            content: " ";
                            height: 0;
                            width: 0;
                            border: medium solid transparent;
                            ${box_background_color ? `border-top-color: ${box_background_color};` : ''}
                            ${testimonial_type === 'type3' && !box_background_color ? 'border-top-color: #34495e;' : ''}
                            border-width: 10px;
                        `
                                : ''
                        }
                    }
                    .mgz-testimonials :global(.mgz-testimonial-meta > *[class*='Typography']) {
                        ${box_color ? `color: ${box_color} !important;` : ''}
                    }
                    .mgz-testimonials :global(.mgz-testimonial-content) {
                        ${
                            testimonial_type !== 'type3'
                                ? `
                            margin: 20px 0;
                        `
                                : ''
                        }
                        ${content_align ? `text-align: ${content_align};` : ''}
                        ${testimonial_type === 'type3' && !content_align ? 'text-align: left' : ''}
                        ${content_color ? `color: ${content_color};` : ''}
                        ${content_font_weight ? `font-weight: ${content_font_weight};` : ''}
                        ${content_font_size ? `font-size: ${content_font_size}px;` : ''}
                    }
                    .mgz-testimonials :global(.mgz-testimonial-img) {
                        width: ${image_width ? `${image_width}px` : '90px'};
                        border-radius: ${image_border_radius ? `${image_border_radius}px` : '50px'}; ;
                        overflow: hidden;
                        margin: auto;
                    }
                    .mgz-testimonials :global(.mgz-testimonial-meta span:nth-child(1)) {
                        ${name_color ? `color: ${name_color} !important;` : ''}
                        ${name_font_size ? `font-size: ${name_font_size}px;` : ''}
                        ${name_font_weight ? `font-weight: ${name_font_weight};` : ''}
                    }
                    .mgz-testimonials :global(.mgz-testimonial-meta span:nth-child(2)) {
                        margin: 0;
                        ${job_color ? `color: ${job_color} !important;` : ''}
                        ${job_font_size ? `font-size: ${job_font_size}px;` : ''}
                        ${job_font_weight ? `font-weight: ${job_font_weight};` : ''}
                    }
                `}
            </style>
        </>
    );
};

export default MagezonTestimonials;
