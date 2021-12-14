/* eslint-disable no-nested-ternary */
import React from 'react';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';

const MagezonIconList = (props) => {
    const {
        spacing, layout, items, icon_size, icon_color, icon_hover_color, icon_background_color,
        icon_hover_background_color, text_size, text_font_weight, text_color, text_hover_color,
    } = props;
    const classIconList = 'mgz-icon-list';
    const classIconListItem = 'mgz-icon-list-item';
    const classIconListItemText = 'mgz-icon-list-item-text';
    let listLayout = '';
    let display = '';
    let iconSize = '';
    let textSize = '';
    let listSpacing = '';
    if (layout === 'vertical') listLayout += 'mgz-icon-list-vertical';
    if (layout === 'horizontal') listLayout += 'mgz-icon-list-horizontal';
    if (layout === 'vertical') display += 'block';
    if (layout === 'horizontal') display += 'inline-block';
    if (icon_size > 0) {
        iconSize = `${icon_size}px`;
    } else {
        iconSize = icon_size;
    }
    if (text_size > 0) {
        textSize = `${text_size}px`;
    } else {
        textSize = text_size;
    }
    if (spacing > 0) {
        listSpacing = `${spacing}px`;
    } else {
        listSpacing = spacing;
    }
    return (
        <div className={classIconList}>
            <div className="mgz-icon-list-inner">
                <div className={listLayout}>
                    {items.map((item, index) => (
                        <div className={classIconListItem}>
                            <MagezonLink key={index} link={item.link_url}>
                                <i className={
                                    item.icon.includes('fab') === true ? item.icon.replace('fab mgz-', 'fab ') : null
                                    || item.icon.includes('fas') === true ? item.icon.replace('fas mgz-', 'fas ') : null
                                    || item.icon.includes('mgz-oi') === true ? item.icon.replace('mgz-oi mgz-', 'oi ') : null
                                    || item.icon.includes('far') === true ? (item.icon.replace('far mgz-', 'far ')) : null
                                }
                                />
                                <span className={classIconListItemText}>
                                    {item.link_text}
                                </span>
                            </MagezonLink>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-icon-list :global(i) {
                        font-size: ${iconSize};
                        padding: 3px;
                        border-radius: 3px;
                        color: ${icon_color || '#333'};
                        background-color: ${icon_background_color || '#FFF'};
                    }
                    .mgz-icon-list :global(i:hover) {
                        color: ${icon_hover_color};
                        background-color: ${icon_hover_background_color};
                    }
                    .mgz-icon-list :global(.mgz-icon-list-item-text) {
                        font-size: ${textSize};
                        font-weight: ${text_font_weight};
                        color: ${text_color || '#333'};
                    }
                    .mgz-icon-list :global(.mgz-icon-list-item-text:hover) {
                        color: ${text_hover_color};
                    }
                    .mgz-icon-list-vertical :global(.mgz-icon-list-item) {
                        display: ${display};
                        margin-bottom: ${listSpacing};
                    }
                    .mgz-icon-list-horizontal :global(.mgz-icon-list-item) {
                        display: ${display};
                        margin-right: ${listSpacing};
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-icon-list {
                        position: relative;
                        text-align: left;
                    }
                    .mgz-icon-list-inner {
                        height: 100%;
                        position: relative;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonIconList;
