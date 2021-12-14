import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';

const Accordion = withStyles({
    root: {
        borderBottom: '1px solid black',
        boxShadow: 'none',
        '&:last-child': {
            borderBottom: 'none !important',
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: '0',
        },
        '&$disabled': {
            backgroundColor: '#ffffff !important',
        },
    },
    rounded: {
        '&:last-child': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
    disabled: {},
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        // borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 14,
        '&$expanded': {
            minHeight: 14,
        },
        '&$disabled': {
            opacity: 1,
        },
    },
    content: {
        margin: '8px 0',
        '& a': {
            color: 'inherit',
            cursor: 'pointer',
            pointerEvents: 'auto',
        },
        '&$expanded': {
            margin: '8px 0',
        },
    },
    expanded: {},
    disabled: {},
    expandIcon: {
        padding: 0,
    },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 0, 0, 2),
    },
}))(MuiAccordionDetails);

export { Accordion, AccordionSummary, AccordionDetails };
