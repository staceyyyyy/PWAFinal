/* eslint-disable react/no-danger */
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@common_typography';
import ExpandMoreIcon from '@material-ui/icons/Add';
import Minimize from '@material-ui/icons/Minimize';
import classNames from 'classnames';
import useStyles from '@core_modules/product/pages/default/components/ExpandDetail/style';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

export default function ExpandDetail({ data = [1, 2, 3], smartProductTabs = [] }) {
    const styles = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [smartExpanded, setSmartExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChangeSmartTab = (panel) => (event, isExpanded) => {
        setSmartExpanded(isExpanded ? panel : false);
    };
    return (
        <div className={styles.root}>
            {data.map((item, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    className={styles.expandContainer}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded === index ? (
                                <Minimize className={styles.icon} />
                            ) : (
                                <ExpandMoreIcon className={styles.icon} />
                            )
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={
                            expanded === index
                                ? classNames(styles.headerExpand, styles.headerOpen)
                                : styles.headerExpand
                        }
                    >
                        <Typography letter="uppercase" variant="span" type="bold">
                            {item.title || ''}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        className={
                            expanded === index
                                ? classNames(styles.bodyExpand, styles.bodyOpen)
                                : styles.bodyExpand
                        }
                    >
                        {
                            item.type === 'html'
                                ? (
                                    <div className={styles.descriptionHtml}>
                                        {item.content ? <span dangerouslySetInnerHTML={{ __html: item.content }} /> : null}
                                    </div>
                                )
                                : item.type === 'array' && (
                                    <List>
                                        {
                                            item.content.map((content, idx) => (
                                                <ListItem key={idx}>
                                                    <ListItemText
                                                        primary={content.label}
                                                        secondary={content.value}
                                                        classes={{
                                                            primary: styles.listLabel,
                                                            secondary: styles.listValue,
                                                        }}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                )
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
            {Object.values(smartProductTabs).map((item, index) => (
                item.label ? (
                    <Accordion
                        key={index}
                        expanded={smartExpanded === index}
                        onChange={handleChangeSmartTab(index)}
                        className={styles.expandContainer}
                    >
                        <AccordionSummary
                            expandIcon={
                                smartExpanded === index ? (
                                    <Minimize className={styles.icon} />
                                ) : (
                                    <ExpandMoreIcon className={styles.icon} />
                                )
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className={
                                smartExpanded === index
                                    ? classNames(styles.headerExpand, styles.headerOpen)
                                    : styles.headerExpand
                            }
                        >
                            <Typography letter="uppercase" variant="span" type="bold">
                                {item.label || ''}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            className={
                                smartExpanded === index
                                    ? classNames(styles.bodyExpand, styles.bodyOpen)
                                    : styles.bodyExpand
                            }
                        >
                            <div className={styles.descriptionHtml}>
                                <CmsRenderer content={item.content} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ) : null
            ))}
        </div>
    );
}
