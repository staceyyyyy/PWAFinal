import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, PRIMARY } from '@theme_color';
import {
    CreatePadding, FlexRow, FlexColumn,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        position: 'relative',
    },
    content: {
        ...FlexRow,
        ...CreatePadding(0, 0, 70, 0),
        flexWrap: 'wrap',
    },
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    pageTitle: {
        fontWeight: 700,
        textAlign: 'center',
        color: PRIMARY,
        textTransform: 'uppercase',
        position: 'absolute',
        left: '50px',
        right: '50px',
    },
    wishlistWrapper: {
        // paddingTop: "50px"
    },
    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        background: 'rgba(255,255,255,0.7)',
        ...CreatePadding(20, 20, 20, 20),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            position: 'unset',
        },
    },
    wishlistItems: {
        flex: '0 0 25%',
        padding: '5px',
    },
    btnWishlist: {
        width: '100%',
        marginLeft: 15,
        [theme.breakpoints.up('md')]: {
            width: 'fit-content',
        },
    },
    containerSkeleton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: '30%',
    },
}));

export default useStyles;
