/* eslint-disable react/no-danger */
import React from 'react';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import Typography from '@common_typography';
import Link from 'next/link';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';

const PricingTable = (props) => {
    const {
        item,
        heading_background_color, heading_color,
        heading_font_size, heading_font_weight,
        heading_featured_background_color, heading_featured_color,
        heading_featured_font_size, heading_featured_font_weight,
        button_background_color, button_color, button_border_radius,
        button_hover_background_color, button_hover_color,
        button_font_size, button_font_weight,
        features_font_size, features_font_weight, features_text_align,
        price_box_background_color, price_box_featured_background_color,
        price_color, price_font_size, price_font_weight, price_text_color,
        price_featured_color, price_featured_font_size, price_featured_font_weight, price_featured_text_color,
    } = props;

    let pricingTableClass = 'mgz-pricing-table ';
    if (item.featured) {
        pricingTableClass += 'mgz-pricing-table-featured ';
    }

    return (
        <div className={pricingTableClass}>
            <div className="mgz-pricing-table-inner">
                <div className="mgz-pricing-table-heading">
                    <h2 className="mgz-pricing-table-title">
                        {item.title || ''}
                    </h2>
                    <span className="mgz-pricing-table-subtitle">
                        {item.sub_title || ''}
                    </span>
                </div>
                <div className="mgz-pricing-table-content-wrapper">
                    <div className="mgz-pricing-table-content-top">
                        <div className="mgz-pricing-table-meta">
                            <span className="mgz-pricing-table-currency">
                                {item.currency}
                            </span>
                            <span className="mgz-pricing-table-price">
                                {item.price}
                            </span>
                            <span className="mgz-pricing-table-period">
                                {item.period}
                            </span>
                        </div>
                    </div>
                    <div className="mgz-pricing-table-content">
                        <ul>
                            {item.features.map((feature, key) => (
                                <li key={key}>
                                    {feature.icon ? <MagezonIcon icon={feature.icon} icon_color={feature.icon_color} /> : ''}
                                    <Typography variant="span" align={features_text_align || 'center'}>{feature.title}</Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mgz-pricing-table-button">
                        <Link href={item.button_link}><a className="mgz-btn">{item.button_text}</a></Link>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-pricing-table.mgz-pricing-table-featured {
                        margin-top: 0;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-button,
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-content-top {
                        padding: 40px 0;
                    }
                    .mgz-pricing-table .mgz-pricing-table-heading {
                        position: relative;
                        background-color: ${heading_background_color || '#8c8c8c'};
                        color: ${heading_color || '#f0f0f0'};
                        padding: 20px 0;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-heading {
                        background-color: ${heading_featured_background_color || '#ff9900'};
                        color: ${heading_featured_color || '#f0f0f0'};
                        padding: 30px 0;
                    }
                    .mgz-pricing-table .mgz-pricing-table-heading .mgz-pricing-table-title {
                        text-transform: uppercase;
                        font-size: ${heading_font_size || '24px'};
                        font-weight: ${heading_font_weight || 400};
                        margin: 0px;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-heading .mgz-pricing-table-title {
                        font-size: ${heading_featured_font_size || '20px'};
                        font-weight: ${heading_featured_font_weight || 400};
                    }
                    .mgz-pricing-table .mgz-pricing-table-heading .mgz-pricing-table-subtitle {
                        display: block;
                        color: inherit;
                        font-size: 12px;
                        font-weight: inherit;
                        line-height: 20px;
                        margin-top: 3px;
                    }
                    .mgz-pricing-table .mgz-pricing-table-content-top {
                        position: relative;
                        color: ${price_text_color || '#999'};
                        background-color: ${price_box_background_color || 'transparent'};
                        padding: 25px 0;
                        text-align: center;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-content-top {
                        color: ${price_featured_text_color || '#999'};
                        background-color: ${price_box_featured_background_color || 'transparent'};
                    }
                    .mgz-pricing-table .mgz-pricing-table-meta {
                        font-size: ${features_font_size || '16px'};
                        font-weight: ${features_font_weight || '400'};
                        font-weight: 300;
                    }
                    .mgz-pricing-table .mgz-pricing-table-currency {
                        position: absolute;
                        font-size: ${features_font_size || '18px'};
                        font-weight: ${features_font_weight || '400'};
                        margin-left: -10px;
                    }
                    .mgz-pricing-table .mgz-pricing-table-price {
                        color: ${price_color || '#ff9900'};
                        font-size: ${price_font_size || '40px'};
                        font-weight: ${price_font_weight || '400'};
                        line-height: 1.03em;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-price {
                        color: ${price_featured_color || '#ff9900'};
                        font-size: ${price_featured_font_size || '40px'};
                        font-weight: ${price_featured_font_weight || '400'};
                    }
                    .mgz-pricing-table .mgz-pricing-table-content-wrapper {
                        background-color: #fcfcfc;
                        border: 1px solid #ededed;
                        border-top: 0;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-inner {
                        box-shadow: 0 0 12px rgb(0 0 0 / 10%);
                    }
                    .mgz-pricing-table .mgz-pricing-table-content {
                        position: relative;
                        border-left: 0;
                        border-right: 0;
                        font-size: ${features_font_size || '16px'};
                        font-weight: ${features_font_weight || '400'};
                        text-align: ${features_text_align || 'center'};
                        word-wrap: break-word;
                    }
                    .mgz-pricing-table .mgz-pricing-table-content ul {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                    }
                    .mgz-pricing-table .mgz-pricing-table-content ul li {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;

                        border-top: 1px solid #e5e4e3;
                        margin: 0;
                        padding: 15px;
                    }
                    .mgz-pricing-table.mgz-pricing-table-featured  .mgz-pricing-table-content ul li {
                        padding: 15px 30px;
                    }
                    .mgz-pricing-table .mgz-pricing-table-button {
                        padding: 30px 0;
                    }
                    .mgz-pricing-table .mgz-pricing-table-button .mgz-btn {
                        background-color: ${button_background_color || '#ff9900'};
                        color: ${button_color || '#fff'};
                        border-radius: ${button_border_radius || '2'}px;
                        font-size: ${button_font_size || '14px'};
                        font-weight: ${button_font_weight || '400'};
                        margin: 0px;
                        user-select: none;
                        display: inline-block;
                        cursor: pointer;
                        padding: 10px 20px;
                        text-decoration: none;
                        max-width: 100%;
                    }
                    .mgz-pricing-table .mgz-pricing-table-button .mgz-btn:hover {
                        background-color: ${button_hover_background_color || 'ff8800'};
                        color: ${button_hover_color || '#fff'};
                    }
                    @media only screen and (max-width: 768px) {
                        .mgz-pricing-table.mgz-pricing-table-featured .mgz-pricing-table-inner {
                            box-shadow: unset;
                        }
                    }
                `}
            </style>
        </div>
    );
};

const MagezonPricingTableView = (props) => {
    const {
        xs_hide, sm_hide, button_size, md_hide, lg_hide,
        table_type, items,
        content, ...other
    } = props;
    const classes = useStyles(other);

    let className = 'mgz-pricing-table-wrapper ';
    if (table_type === 'type1') {
        className += 'mgz-pricing-table-type1 ';
    } else {
        className += 'mgz-pricing-table-type2 ';
    }

    if (xs_hide) className += 'hidden-mobile ';
    if (sm_hide) className += 'hidden-sm ';
    if (md_hide) className += 'hidden-md ';
    if (lg_hide) className += 'hidden-lg ';

    return (
        <div className={`${classes.container}`}>
            <div className={className}>
                {items.map((item, key) => (<PricingTable item={item} key={key} classes={classes} {...props} />))}
            </div>
            <style jsx global>
                {`
                    .mgz-pricing-table-wrapper {
                        display: flex;
                    }
                    .mgz-pricing-table-type2 {
                        margin-left: -12px;
                        margin-right: -12px;
                    }
                    .mgz-pricing-table-type2 .mgz-pricing-table {
                        padding-left: 12px;
                        padding-right: 12px;
                    }
                    .mgz-pricing-table {
                        flex: 1 1 auto;
                        float: left;
                        position: relative;
                        margin: 30px -1px 0 0;
                        text-align: center;
                    }
                    @media only screen and (max-width: 767px) {
                        .mgz-pricing-table-wrapper {
                            display: block;
                            margin-bottom: 40px;
                        }
                        .mgz-pricing-table-wrapper .mgz-pricing-table {
                            width: 100%;
                            margin: 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonPricingTableView;
