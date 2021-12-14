import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateBorder, CreateMargin, CreatePadding } from '@theme_mixins';
import { PRIMARY } from '@theme_color';
import { FONT_DEFAULT, FONT_10, FONT_REGULAR } from '@theme_typography';

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        ...CreateMargin(15, 0, 15, 0),
        ...CreateBorder('1px', 0, 0, 0, PRIMARY),
    },
    expandContainer: {
        boxShadow: 'none',
        borderRadius: 'none',
        margin: 0,
    },
    headerExpand: {
        padding: 0,
        height: 40,
        ...CreateBorder(0, 0, '1px', 0, PRIMARY),
    },
    bodyExpand: {
        ...CreatePadding(0, 0, 20, 0),
        margin: 0,
    },
    headerOpen: {
        borderBottom: 'none !important',
    },
    bodyOpen: {
        ...CreateBorder(0, 0, '1px', 0, PRIMARY),
    },
    icon: {
        fontSize: 16,
        color: PRIMARY,
    },
    descriptionHtml: {
        fontFamily: 'Montserrat',
        fontSize: 10,
        [theme.breakpoints.up('md')]: {
            width: 850,
            height: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: 700,
            height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            width: 320,
            height: '100%',
        },
        '& img': {
            width: '100%',
            height: '100%',
            [theme.breakpoints.up('md')]: {
                maxWidth: 800,
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: 650,
            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: 300,
            },
        },
        '& iframe': {
            width: '100%',
            height: '100%',
            [theme.breakpoints.up('md')]: {
                maxWidth: 800,
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: 650,
            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: 300,
            },
        },
    },

    listLabel: {
        ...FONT_REGULAR,
    },
    listValue: {
        ...FONT_DEFAULT,
        ...FONT_10,
    },
}));
