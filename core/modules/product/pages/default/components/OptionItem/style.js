import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, WHITE, RED } from '@theme_color';
import {
    CenterAbsolute,
    CreateBorder,
    CreatePadding,
    FlexColumn,
    CreateMargin,
    FlexRow,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    dialog: {
        background: 'transparent',
    },
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'transparent',
    },
    bannerContainer: {
        backgroundPosition: 'center',
        background: 'transparent',
        height: '100vh',
    },
    img: {
        display: 'block',
        width: 'auto',
    },
    optionContainer: {
        position: 'absolute',
        zIndex: 3,
        ...CenterAbsolute,
        backgroundColor: WHITE,
        width: '95%',
        height: 'auto',
        maxHeight: '60vh',
        borderRadius: 10,
        bottom: 0,
        ...CreateBorder('1px', '1px', 0, '1px', GRAY_PRIMARY),
        ...CreatePadding(15, 14, 20, 14),
        alignItems: 'center',
        overflowX: 'scroll',
        [theme.breakpoints.down('xs')]: {
            maxHeight: '80vh',
        },
    },
    btnClose: {
        ...CreateMargin(0, 0, 15, 0),
    },
    label: {
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
        },
    },
    sizeContainer: {
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            ...CreateMargin(20, 0, 10, 0),
        },
    },
    classContainer: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    center: {
        justifyContent: 'center',
    },
    btnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            width: 316,
            float: 'left',
        },
        ...CreateMargin(0, 8, 0, 0),
        width: '100%',
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
    },
    textBtnAddToCard: {
        fontSize: 16,
        color: `${WHITE} !important`,
    },
    error: {
        color: RED,
    },
    qty: {
        [theme.breakpoints.down('sm')]: {
            ...CreateMargin(0, 15, 30, 15),
            alignItems: 'center',
        },
        ...CreateMargin(0, 15, 30, 0),
        ...FlexColumn,
    },
    select: {
        minWidth: '30%',
        width: 'auto',
        maxWidth: '100%',
        marginBottom: 10,
        ...FlexColumn,
        [theme.breakpoints.up('sm')]: {
            maxWidth: '75%',
        },
        '& .label-select': {
            textAlign: 'center',
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left',
            },
        },
    },
    labelContainer: {
        ...FlexRow,
        '& .label-select': {
        },
        '& .label-select-value': {
            marginLeft: 20,
            fontSize: 14,
        },
        justifyContent: 'flex-between',
        alignItems: 'center',
    },
    stylesItemOption: {
        width: 30,
        height: 30,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customizeContainer: {
        width: '100%',
        height: 100,
        backgroundColor: 'red',
        visibility: 'hidden',
        transition: 'top 1s ease',
        opacity: '0',
    },
    customizeContainerOpen: {
        visibility: 'visible',
        transition: 'top 1s ease',
        opacity: '1',
    },
    loadingCart: {
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
