/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
import Typography from '@common_typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@core_modules/cms/components/cms-renderer/magezon/MagezonCategories/accordion';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { getCategories } from '@core_modules/cms/services/graphql';
import { useMemo, useState } from 'react';

const MagezonCategories = (props) => {
    // prettier-ignore
    const {
        categories, description,
        line_color, line_position, line_width,
        link_border_color, link_border_width, link_color,
        link_font_size, link_font_weight, link_hover_color,
        show_count, show_hierarchical, show_line,
        title, title_align, title_tag,
    } = props;

    const [expanded, setExpanded] = useState(false);
    const showLineClass = show_line ? 'mgz-categories-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-categories-heading-line--bottom' : '';
    const { data, loading } = getCategories({ ids: categories });

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (loading && !data) return <>Loading</>;

    const renderCategories = (categoryList) => categoryList.map((category, index) => {
        const { children, url_path } = category;
        const expandIconCondition = show_hierarchical && children && children.length > 0 && expanded;

        return (
            <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleExpand(index)}
                disabled={!show_hierarchical || (children && children.length <= 0)}
                TransitionProps={{ unmountOnExit: true }}
            >
                <AccordionSummary
                    expandIcon={
                        show_hierarchical && children && children.length > 0 && expanded === index ? (
                            <RemoveIcon />
                        ) : show_hierarchical && children && children.length > 0 && expanded !== index ? (
                            <AddIcon />
                        ) : (
                            ''
                        )
                    }
                >
                    <Link href={url_path} onClick={(e) => e.stopPropagation()}>
                        <a className="mgz-categories-link">
                            {category.name}
                            {show_count && `(${category.product_count})`}
                        </a>
                    </Link>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="accordion-details-inner">{children && children.length > 0 && renderCategories(children)}</div>
                </AccordionDetails>
            </Accordion>
        );
    });

    // const memoizedCategories = useMemo(() => renderCategories(data.categoryList), [data.categoryList]);

    return (
        <>
            <div className="mgz-categories">
                <div className={`mgz-categories-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-categories-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div className="mgz-categories-heading-description">{description}</div>
                </div>
                <div className="mgz-categories-content">
                    {/* {memoizedCategories} */}
                    {renderCategories(data.categoryList)}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-categories-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-categories-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-categories-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-categories-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-categories :global(.accordion-details-inner) {
                        display: flex;
                        flex-direction: column;
                        margin: 1px;
                        width: 100%;
                        justify-content: flex-start;
                    }
                    .mgz-categories :global(.mgz-categories-link) {
                        ${link_color ? `color: ${link_color};` : ''}
                        ${link_font_size ? `font-size: ${link_font_size}px;` : ''}
                        ${link_font_weight ? `font-weight: ${link_font_weight};` : ''}
                    }
                    .mgz-categories :global(.mgz-categories-link:hover) {
                        ${link_hover_color ? `color: ${link_hover_color};` : ''}
                    }
                    .mgz-categories :global(.MuiAccordion-root) {
                        border-bottom: ${link_border_width ? `${link_border_width}px` : '1px'} solid
                            ${link_border_color ? link_border_color : '#000000'};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonCategories;
