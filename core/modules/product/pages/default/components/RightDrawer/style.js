import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    Centering, FlexRow, CreatePadding,
} from '@theme_mixins';
import { WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        position: 'absolute',
        right: '0',
        top: '0',
        height: '100vh',
        zIndex: 2,
        width: 35,
    },

    openContainer: {
        width: 175,
    },

    btnOpen: {
        width: 164,
        height: 33,
        ...Centering,
        borderRadius: '10px 10px 0px 0px',
        backgroundColor: WHITE,
        transform: 'rotate(-90deg)',
        position: 'absolute',
        top: '50vh',
        right: -65,
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#000000',
        },
    },
    btnOpenLabel: {
        [theme.breakpoints.up('sm')]: {
            color: WHITE,
            fontWeight: 'bold',
        },
    },
    btnOpeActive: {
        right: 120,
    },

    drawerContainer: {
        background: 'transparent',
        overflow: 'hidden',
    },

    contianerBtnDrawer: {
        alingIntems: 'center',
        width: 50,
        height: '100%',
        background: 'transparent',
        position: 'relative',
    },

    btnOpenInDrawer: {
        backgroundColor: WHITE,
        right: -66,
        height: 33,
        transform: 'rotate(-90deg)',
        borderRadius: '10px 10px 0px 0px',
        position: 'absolute',
        top: '50vh',
        width: 164,
        ...Centering,
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#000000',
        },
    },

    body: {
        height: '100%',
        width: '50vw',
        [theme.breakpoints.up('sm')]: {
            width: '40vw',
        },
        background: 'transparent',
        position: 'relative',
        ...FlexRow,
    },
    content: {
        height: '100%',
        width: '100%',
        background: WHITE,
        boxShadow: '5px 0px 5px 3px #0000001A',
        ...CreatePadding(12, 12, 12, 12),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alingIntems: 'center',
        overflow: 'auto !important',
    },

    contentMin: {
        height: '100%',
        width: '100%',
        background: WHITE,
        boxShadow: '5px 0px 5px 3px #0000001A',
        ...CreatePadding(12, 12, 12, 12),
        ...Centering,
        alignItems: 'center',
    },

    itemLookContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageLookContainer: {
        width: '80%',
        height: '90%',
        maxWidth: 89,
        maxHeight: 112,
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: '95%',
            padding: 5,
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: 140,
            maxHeight: 160,
        },
    },
    img: {
        width: 99,
        height: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '80%',
        },
    },
}));
