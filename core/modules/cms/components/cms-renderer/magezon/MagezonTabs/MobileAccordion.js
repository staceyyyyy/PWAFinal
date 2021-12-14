/* eslint-disable operator-linebreak */
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';

const Accordion = withStyles(() => ({
    root: {
        border: 'none',
        boxShadow: 'none !important',
        '&:before': {
            backgroundColor: 'transparent',
        },
    },
}))(MuiAccordion);

const AccordionSummary = withStyles(() => ({
    root: (props) => {
        // prettier-ignore
        const {
            gap, no_fill_content_area,
            tab_background_color, tab_border_color, tab_color,
            tab_border_style, title_font_size,
            borderRadius, borderWidth,
        } = props;

        return {
            backgroundColor: tab_background_color || '#ebebeb',
            color: tab_color || 'initial',
            fontSize: title_font_size ? `${title_font_size}px` : 14,
            minWidth: 100,
            height: 64,
            border: `${borderWidth} ${tab_border_style || 'solid'} ${tab_border_color || '#e3e3e3'}`,
            borderBottom: no_fill_content_area || gap ? `${borderWidth} ${tab_border_style || 'solid'} ${tab_border_color || '#e3e3e3'}` : 'none',
            borderRadius: no_fill_content_area || gap ? borderRadius : `${borderRadius} ${borderRadius} 0 0`,
        };
    },
}))(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
    root: {
        display: 'block',
        backgroundColor: (props) => (props.no_fill_content_area ? 'transparent' : props.tab_content_background_color || '#f8f8f8'),
    },
}))(MuiAccordionDetails);

const MobileAccordion = (props) => {
    // prettier-ignore
    const {
        active_tab, elements, gap,
        hide_empty_tab, no_fill_content_area,
        tab_active_background_color, tab_active_border_color, tab_active_color,
        tab_background_color, tab_border_color, tab_color, tab_content_background_color,
        tab_border_radius, tab_border_style, tab_border_width, title_font_size,
        borderRadius, borderWidth, storeConfig,
    } = props;
    const activeTab = active_tab - 1;
    const [expanded, setExpanded] = useState(activeTab);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const TabProps = {
        gap,
        hide_empty_tab,
        no_fill_content_area,
        tab_active_background_color,
        tab_active_border_color,
        tab_active_color,
        tab_background_color,
        tab_border_color,
        tab_color,
        tab_border_radius,
        tab_border_style,
        tab_border_width,
        title_font_size,
        borderRadius,
        borderWidth,
    };

    return (
        <>
            <div>
                {elements.length > 0 &&
                    elements.map((element, index) => (
                        <Accordion key={index} expanded={expanded === index} onChange={handleExpand(index)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} {...TabProps}>
                                {element.title}
                            </AccordionSummary>
                            <AccordionDetails tab_content_background_color={tab_content_background_color}>
                                {typeof element.elements === 'object' &&
                                    element.elements.map((ele, k) => <MagezonElement key={k} {...ele} storeConfig={storeConfig} />)}
                            </AccordionDetails>
                        </Accordion>
                    ))}
            </div>
        </>
    );
};

export default MobileAccordion;
