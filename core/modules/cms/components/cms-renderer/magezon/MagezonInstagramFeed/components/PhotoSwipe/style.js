import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, Centering } from '@theme/mixins';
import { PRIMARY, WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        overflow: 'hidden',
    },
    header: {
        position: 'relative',
        height: 50,
        color: WHITE,
        backgroundColor: PRIMARY,
    },
    sliderContent: {
        padding: 0,
        backgroundColor: PRIMARY,
    },
    sliderContainer: {
        position: 'relative',
        padding: 20,
    },
    itemPopup: {
        width: '100%',
        ...FlexColumn,
        alignItems: 'center',
        justifyContent: 'enter',
    },
    imagePopup: {
        width: '100%',
        height: 'auto',
        maxWidth: '60vh',
    },
    action: {
        position: 'absolute',
        top: 5,
        right: 15,
        zIndex: 5,
    },
    btnClose: {
        color: WHITE,
    },
    footer: {
        textAlign: 'left',
        maxWidth: '100%',
        padding: '10px 25%',
        margin: '0 auto',
        maxHeight: '35vh',
        zIndex: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        [theme.breakpoints.down('sm')]: {
            padding: 10,
        },
        '&:empty': {
            display: 'none',
        },
    },
    caption: {
        marginTop: 20,
        fontSize: 14,
        color: WHITE,
    },
    countItem: {
        fontSize: 12,
    },
    arrow: {
        fontSize: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        ...Centering,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        paddingLeft: 10,
        top: 'calc(50% - 1rem)',
        width: 40,
        height: 40,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: PRIMARY,
            color: WHITE,
        },
        [theme.breakpoints.down('sm')]: {
        },
    },
    leftArrow: {
        left: 20,
    },

    rightArrow: {
        right: 20,
    },
}));
