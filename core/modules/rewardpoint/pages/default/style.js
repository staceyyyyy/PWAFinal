import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexRow, FlexColumn } from '@theme_mixins';
import { RED, GREEN } from '@theme_color';

export default makeStyles((theme) => ({
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(15, 15, 15, 15),
        marginBottom: 20,
    },
    divider: {
        marginBottom: 30,
    },
    displayFlexRow: {
        ...FlexRow,
    },
    container: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        fontSize: '12px',
        padding: 15,
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '8px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '50%',
        minWidth: '150px',
        maxWidth: '200px',
        position: 'relative',
        paddingRight: 20,
        '&::after': {
            content: "':'",
            display: 'block',
            position: 'absolute',
            right: '8px',
            top: 0,
        },
    },
    value: {
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
    },
    editLink: {
        marginTop: 20,
    },
    textGreen: {
        color: GREEN,
    },
    textRed: {
        color: RED,
    },
}));
