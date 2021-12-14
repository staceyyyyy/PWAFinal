/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */

import Typography from '@common_typography';
import Heading from '@core_modules/cms/components/cms-renderer/magezon/components/commons/heading';
import { Accordion, AccordionDetails, AccordionSummary } from '@core_modules/cms/components/cms-renderer/magezon/MagezonCategories/accordion';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import MagezonSection from '@core_modules/cms/components/cms-renderer/magezon/MagezonSection';
import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/Details';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import { useState } from 'react';

const MagezonAccordion = (props) => {
    // prettier-ignore
    const {
        active_icon, icon,
        accordion_icon, active_sections, at_least_one_open,
        collapsible_all, description, elements, gap,
        icon_position, no_fill_content_area,
        section_active_background_color, section_active_border_color, section_active_color,
        section_align, section_border_style,
        section_background_color, section_border_color, section_color,
        section_hover_background_color, section_hover_border_color, section_hover_color,
        spacing,
        line_color, line_position, line_width, show_line,
        title, title_align, title_tag, title_color, title_font_size,
        storeConfig,
    } = props;
    const accordionsState = {};
    let expandMoreIcon;
    let expandLessIcon;
    if (elements.length > 0) {
        elements.forEach((_, index) => {
            accordionsState[`accordion-${index}`] = false;
            if (active_sections) {
                const activeSections = active_sections
                    .replace(/\s+/g, '')
                    .split(',')
                    .map((active) => parseInt(active) - 1);
                if (activeSections.length > 0) {
                    activeSections.forEach((section) => {
                        accordionsState[`accordion-${section}`] = true;
                    });
                }
            }
        });
    }
    const [expandedList, setExpandedList] = useState(accordionsState);

    if (accordion_icon === 'chevron') {
        expandMoreIcon = <ExpandMoreIcon />;
        expandLessIcon = <ExpandMoreIcon />;
    } else if (accordion_icon === 'plus') {
        expandMoreIcon = <AddIcon />;
        expandLessIcon = <RemoveIcon />;
    } else if (accordion_icon === 'triangle') {
        expandMoreIcon = <DetailsIcon fontSize="small" />;
        expandLessIcon = <DetailsIcon fontSize="small" />;
    } else if (accordion_icon === 'dot') {
        expandMoreIcon = <FiberManualRecordOutlinedIcon fontSize="small" />;
        expandLessIcon = <FiberManualRecordIcon fontSize="small" />;
    } else if (accordion_icon === 'custom') {
        expandMoreIcon = <MagezonIcon icon={icon} />;
        expandLessIcon = <MagezonIcon icon={active_icon} />;
    }

    const headingProps = {
        description,
        title,
        title_align,
        title_tag,
        title_color,
        line_color,
        line_position,
        line_width,
        show_line,
    };

    const handleExpand = (panel) => (event, isExpanded) => {
        Object.keys(expandedList).forEach((list) => {
            if (list === panel) {
                const countOpen = Object.keys(expandedList).filter((item) => expandedList[item] === true).length;
                if (at_least_one_open && expandedList[list] && countOpen === 1) {
                    // one must stay opened
                    setExpandedList({ ...expandedList, [list]: true });
                } else if (collapsible_all) {
                    // can expand all accordion
                    setExpandedList({ ...expandedList, [list]: isExpanded });
                } else {
                    // default
                    Object.keys(expandedList).forEach((k) => (expandedList[k] = false));
                    setExpandedList({ ...expandedList, [list]: isExpanded });
                }
            }
        });
    };

    return (
        <>
            <div className="mgz-accordion">
                <Heading {...headingProps} />
                <div className="mgz-accordion-content">
                    {elements.length > 0 &&
                        elements.map((element, index) => {
                            const { icon: elementIcon, icon_position: elementIconPosition } = element;

                            return (
                                <Accordion
                                    key={index}
                                    expanded={expandedList[`accordion-${index}`]}
                                    onChange={handleExpand(`accordion-${index}`)}
                                    TransitionProps={{ unmountOnExit: true }}
                                >
                                    <AccordionSummary expandIcon={expandedList[`accordion-${index}`] ? expandLessIcon : expandMoreIcon}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: elementIconPosition === 'left' ? 'row' : 'row-reverse',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            {elementIcon && <MagezonIcon icon={elementIcon} />}
                                            <Typography variant="h4">{element.title}</Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <MagezonSection elements={element.elements} storeConfig={storeConfig} />
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-accordion :global(.MuiAccordion-root) {
                        color: #333;
                        border: none;
                        ${gap ? `margin-bottom: ${gap}px;` : ''}
                        transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;
                    }
                    .mgz-accordion :global(.MuiAccordion-root > div:first-child:not(.Mui-expanded)) {
                        background-color: ${section_background_color || '#f8f8f8'};
                        border: 1px ${section_border_style || 'solid'} ${section_border_color || '#eee'};
                    }
                    .mgz-accordion :global(.MuiAccordion-root > div.Mui-expanded) {
                        border: 1px ${section_border_style || 'solid'} ${section_active_border_color || '#eee'};
                        ${section_active_background_color ? `background-color: ${section_active_background_color}` : ''}
                    }
                    .mgz-accordion :global(.MuiAccordionSummary-content) {
                        justify-content: ${section_align === 'left' ? 'flex-start' : section_align === 'center' ? 'center' : 'flex-end'};
                    }
                    .mgz-accordion :global(*[class*='Typography']) {
                        color: ${section_color || '#000000'};
                        ${title_font_size ? `font-size: ${title_font_size}px` : ''}
                    }
                    .mgz-accordion :global(.Mui-expanded .MuiAccordionSummary-root *[class*='Typography']) {
                        color: ${section_active_color || '#000000'};
                    }
                    .mgz-accordion :global(.MuiAccordion-root div:not(.Mui-expanded):hover *[class*='Typography']) {
                        color: ${section_hover_color || '#000000'};
                    }
                    .mgz-accordion :global(.MuiAccordion-root > div:first-child:not(.Mui-expanded):hover) {
                        ${section_hover_background_color ? `background-color: ${section_hover_background_color};` : ''}
                        ${section_hover_border_color ? `border-color: ${section_hover_border_color};` : ''}
                    }
                    .mgz-accordion :global(.MuiCollapse-wrapper) {
                        background-color: ${no_fill_content_area ? '#ffffff' : '#ffffff'};
                        ${!no_fill_content_area ? `border: 1px solid ${section_active_border_color || '#eee'};` : ''}
                    }
                    .mgz-accordion :global(.MuiAccordionDetails-root) {
                        display: block;
                        padding: 14px 20px;
                    }
                    .mgz-accordion :global(.MuiCollapse-container) {
                        ${spacing ? `margin-top: ${spacing}px;` : ''}
                    }
                    .mgz-accordion :global(.MuiAccordionSummary-root) {
                        flex-direction: ${icon_position === 'left' ? 'row-reverse' : 'row'};
                    }
                    .mgz-accordion :global(.MuiIconButton-root) {
                        ${icon_position === 'left' ? 'margin-left: -6px; margin-right: 0;' : 'margin-right: -12px;'}
                    }
                    .mgz-accordion :global(.MuiSvgIcon-fontSizeSmall) {
                        font-size: 14px;
                        color: #000000;
                    }
                    .mgz-accordion :global(.magezon-icon) {
                        font-size: 14px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonAccordion;
