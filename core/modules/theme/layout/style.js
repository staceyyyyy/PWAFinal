import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding,
} from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 50,
        },
    },
    cookieRestriction: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#ffee9c',
        zIndex: 1500,
        ...CreatePadding(5, 15, 8, 18),
        color: '#303030',
    },
    recentView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        position: 'fixed',
        left: 20,
        bottom: 0,
        zIndex: 1400,
        backgroundColor: 'white',
        width: '15vw',
        height: '5vh',
        boxShadow: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            bottom: '0vh',
            width: '25vw',
            [theme.breakpoints.down('xs')]: {
                transform: 'rotate(90deg)',
                left: '-19vw',
                bottom: '30vh',
                width: '45vw',
            },
        },
        '&:hover': {
            backgroundColor: GRAY_PRIMARY,
        },
    },
    recentlyBtnContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        position: 'fixed',
        width: '15vw',
        height: '5vh',
        bottom: '345px',
        backgroundColor: 'white',
        left: 20,
        boxShadow: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            width: '25vw',
            left: 40,
            [theme.breakpoints.down('sm')]: {
                width: '45vw',
                left: 20,
                bottom: '338px',
            },
        },
        '&:hover': {
            backgroundColor: GRAY_PRIMARY,
        },
    },
    recentlyWrapperContent: {
        position: 'relative',
        height: '350px',
        paddingTop: '5px',
        paddingBottom: '5px',
        overflowY: 'hidden',
        '& .button-title': {
            fontSize: 12,
            color: 'black',
            textTransform: 'uppercase',
        },
    },
    contentFeatured: {
        display: 'flex',
        transition: '0.3s',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            padding: 8,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    itemProduct: {
        width: '180px',
        [theme.breakpoints.down('sm')]: {
            width: '200px',
        },
    },
}));

export default useStyles;
