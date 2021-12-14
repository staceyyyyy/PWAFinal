import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, PRIMARY, WHITE, GRAY_SECONDARY,
} from '@theme_color';
import {
    CenterAbsolute, CreateBorder, CreateMargin, CreatePadding, FlexColumn, FlexRow, Centering,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    modal: {
        width: '100%',
        height: '100%',
        position: 'relative',
        paddingTop: 25,
    },
    btnClose: {
        position: 'absolute',
        top: 0,
        right: 20,
    },
    container: {
        margin: '0 !important',
        padding: '0px 20px 0px 20px',
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            ...FlexColumn,
        },
        position: 'relative',
        '& .customizable-container': {
            marginTop: 20,
        },
    },
    caraousel: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    headContainer: {
        position: 'relative',
        backgroundColor: WHITE,
        width: '100%',
        padding: 10,
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
    },

    body: {
        ...CreatePadding(15, 30, 30, 30),
        ...FlexColumn,
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },

    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        background: 'rgba(255,255,255,0.7)',
        // opacity : 0.7,
        ...CreatePadding(20, 20, 20, 20),
        zIndex: theme.zIndex.drawer + 1,
    },

    title: {
        [theme.breakpoints.up('sm')]: {
            fontSize: 30,
        },
    },

    btnGoToProduct: {
        marginTop: 20,
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
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

    titleContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titlePriceContainer: {
        ...FlexColumn,
        flex: 1,
        fontSize: 20,
        '& .price_text': {
            fontSize: 30,
        },
        [theme.breakpoints.down('sm')]: {
            '& .price_text': {
                fontSize: 18,
            },
        },
    },

    shareContainer: {
        ...FlexRow,
        justifyContent: 'flex-end',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            '& button span': {
                fontSize: 9,
            },
        },
    },

    shareRootContainer: {
        ...CreatePadding(15, 30, 30, 30),
        ...FlexColumn,
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40,
        },
    },

    btnShare: {
        margin: '0px !important',
    },

    iconShare: {
        color: PRIMARY,
        fontSize: 25,
        ...CreateMargin(0, 0, 0, 0),
    },

    carouselContainer: {
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 70,
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    carouselTitle: {
        marginBottom: '20px',
    },
    desc: {
        ...CreateMargin(12, 0, 12, 0),
        textAlign: 'center',
    },
    ratingContainer: {
        ...FlexRow,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 20,
        },
    },
    btnLoadReview: {
        ...Centering,
        textAlign: 'center',
    },
    textLoadReview: {
        color: `${GRAY_SECONDARY} !important`,
    },
    sku: {
        alignItems: 'center',
        marginLeft: '0 !important',
    },
    tabs: {
        paddingTop: '40px',
    },
    shareTitle: {
        marginTop: 20,
        fontSize: 12,
    },
}));

export default useStyles;
