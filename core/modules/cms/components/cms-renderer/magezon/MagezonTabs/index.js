/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */

import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon';
import MobileAccordion from '@core_modules/cms/components/cms-renderer/magezon/MagezonTabs/MobileAccordion';
import { withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useState } from 'react';
import MagezonIcon from '../MagezoneIcon';

const TabPanel = (props) => {
    const { elements, value, index, storeConfig, hide_empty_tab } = props;
    const hideWhenEmpty = hide_empty_tab && elements.length === 0;

    return (
        <>
            {hideWhenEmpty ? null : (
                <div role="tabpanel" hidden={value !== index}>
                    {elements.map((element, k) => (
                        <MagezonElement key={k} {...element} storeConfig={storeConfig} />
                    ))}
                </div>
            )}
        </>
    );
};

const Tabs = withStyles(() => ({
    indicator: {
        backgroundColor: 'transparent',
    },
}))(MuiTabs);

const Tab = withStyles(() => ({
    root: (props) => {
        // prettier-ignore
        const {
            gap, no_fill_content_area, spacing,
            tab_background_color, tab_border_color, tab_color,
            tab_hover_background_color, tab_hover_border_color, tab_hover_color,
            tab_border_style,
            borderRadius, borderWidth, isVertical,
        } = props;

        return {
            backgroundColor: tab_background_color || '#ebebeb',
            color: tab_color || 'initial',
            textAlign: 'left',
            marginRight: spacing ? `${spacing}px` : 5,
            '&:last-child': {
                marginRight: isVertical ? (spacing ? `${spacing}px` : 5) : 0,
            },
            minWidth: 100,
            marginBottom: gap ? `${gap}px` : '0',
            border: `${borderWidth} ${tab_border_style || 'solid'} ${tab_border_color || '#e3e3e3'}`,
            borderBottom: no_fill_content_area || gap ? `${borderWidth} solid #e3e3e3` : 'none',
            borderRadius: no_fill_content_area || gap ? borderRadius : `${borderRadius} ${borderRadius} 0 0`,
            opacity: 1,
            '&.icon-left': {
                '& > .MuiTab-wrapper': {
                    flexDirection: 'row',
                },
            },
            '&.icon-right': {
                '& > .MuiTab-wrapper': {
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                },
            },
            '&:hover': {
                backgroundColor: tab_hover_background_color || '#f8f8f8',
                borderColor: tab_hover_border_color || '#e3e3e3',
                color: tab_hover_color || '#000000',
            },
        };
    },
    wrapper: {
        fontSize: (props) => (props.title_font_size ? `${props.title_font_size}px` : 14),
        textTransform: 'none',
        flexDirection: 'row',
        justifyContent: (props) => (props.tab_position === 'top' || props.tab_position === 'bottom' ? 'center' : 'flex-start'),
        '& > .magezon-icon': {
            margin: '0 5px',
            marginBottom: '0 !important',
        },
    },
    labelIcon: {
        minHeight: 50,
    },
    selected: (props) => {
        // prettier-ignore
        const {
            tab_active_background_color, tab_active_border_color, tab_active_color,
        } = props;

        return {
            backgroundColor: tab_active_background_color || '#f8f8f8',
            borderColor: tab_active_border_color || '#e3e3e3',
            color: tab_active_color || '#000000',
            '&:hover': {
                backgroundColor: tab_active_background_color || '#f8f8f8',
                borderColor: tab_active_border_color || '#e3e3e3',
                color: tab_active_color || '#000000',
            },
        };
    },
}))(MuiTab);

const MagezonTabs = (props) => {
    // prettier-ignore
    const {
        active_tab, elements, gap,
        hide_empty_tab, hover_active, mobile_accordion, no_fill_content_area, spacing,
        tab_active_background_color, tab_active_border_color, tab_active_color,
        tab_background_color, tab_border_color, tab_color, tab_content_background_color,
        tab_hover_background_color, tab_hover_border_color, tab_hover_color,
        tab_align, tab_border_radius, tab_border_style, tab_border_width, tab_position, title_font_size,
        storeConfig,
    } = props;
    const [activeTab, setActiveTab] = useState(active_tab - 1);
    const isVertical = tab_position === 'left' || tab_position === 'right';
    const borderRadius = tab_border_radius ? `${tab_border_radius}px` : '5px';
    const borderWidth = tab_border_width ? `${tab_border_width}px` : '1px';
    const contentBgColor = tab_content_background_color || '#f8f8f8';
    const tabAlign = tab_align === 'left' ? 'flex-start' : tab_align === 'right' ? 'flex-end' : 'center';
    const tabDirection = isVertical ? (tab_position === 'left' ? 'row' : 'row-reverse') : tab_position === 'top' ? 'column' : 'column-reverse';
    const isMobile = useMediaQuery('(max-width:576px)');
    const TabProps = {
        gap,
        hide_empty_tab,
        mobile_accordion,
        no_fill_content_area,
        spacing,
        tab_align,
        tab_active_background_color,
        tab_active_border_color,
        tab_active_color,
        tab_background_color,
        tab_border_color,
        tab_color,
        tab_hover_background_color,
        tab_hover_border_color,
        tab_hover_color,
        tab_border_radius,
        tab_border_style,
        tab_border_width,
        tab_position,
        title_font_size,
        borderRadius,
        borderWidth,
        isVertical,
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleHover = (index) => {
        if (hover_active) setActiveTab(index);
    };

    return (
        <>
            <div className="mgz-tabs">
                {!(isMobile && mobile_accordion) ? (
                    <>
                        <div className="tabs">
                            <Tabs value={activeTab} onChange={handleChange} orientation={isVertical ? 'vertical' : 'horizontal'}>
                                {elements.map((element, index) => {
                                    const { icon, icon_position } = element;
                                    const hideWhenEmpty = hide_empty_tab && element.elements.length === 0;
                                    const IconProps = icon ? { icon: <MagezonIcon icon={icon} /> } : {};

                                    if (!hideWhenEmpty) {
                                        return (
                                            <Tab
                                                key={index}
                                                label={element.title}
                                                onMouseEnter={() => handleHover(index)}
                                                disableRipple
                                                disableFocusRipple
                                                className={`${icon ? `icon-${icon_position}` : ''}`}
                                                {...IconProps}
                                                {...TabProps}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </Tabs>
                        </div>
                        <div className="tab-body">
                            {elements.map((element, index) => (
                                <TabPanel
                                    key={index}
                                    elements={typeof element.elements === 'object' ? element.elements : []}
                                    value={activeTab}
                                    index={index}
                                    storeConfig={storeConfig}
                                    hide_empty_tab={hide_empty_tab}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <MobileAccordion {...props} borderRadius={borderRadius} borderWidth={borderWidth} />
                    </>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-tabs {
                        display: flex;
                        flex-direction: ${tabDirection};
                    }
                    .tabs {
                        display: flex;
                        justify-content: ${tabAlign};
                    }
                    .tab-body {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        min-width: 0;
                        background-color: ${no_fill_content_area || activeTab < 0 ? 'transparent' : contentBgColor};
                        border: ${no_fill_content_area || activeTab < 0 ? 'none' : `${borderWidth} solid #e3e3e3`};
                        ${no_fill_content_area || gap || activeTab < 0 ? '' : 'border-top: none;'}
                        border-radius: ${no_fill_content_area || gap || activeTab < 0 ? borderRadius : `0 0 ${borderRadius} ${borderRadius}`};
                        ${activeTab >= 0 ? 'padding: 20px;' : ''}
                    }
                `}
            </style>
        </>
    );
};

export default MagezonTabs;
