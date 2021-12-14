import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE } from '@theme_color';
import {
    CreatePadding, CreateMargin,
    Centering, FlexColumn,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    checkoutBox: {
        background: WHITE,
        ...CreatePadding(5, 18, 18, 18),
        boxShadow: '0 -1px 3px #0000001A',
        position: 'fixed',
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        zIndex: theme.zIndex.drawer + 1,
    },
    summary: {
        textAlign: 'center',
        padding: 10,
    },
    actions: {
        ...FlexColumn,
        alignItems: 'center',
    },
    paypalBtn: {
        marginTop: 20,
        minWidth: 300,
    },
    goToCheckout: {
        minWidth: 300,
    },
    subtotal: {
        fontSize: 16,
        textAlign: 'center',
        ...CreateMargin(10, 0, 10, 0),
    },
    expand: {
        margin: 0,
        padding: 0,
        width: '100%',
        border: 'none',
        boxShadow: 'none !important',
    },
    expanBody: {
        width: '100%',
        margin: 0,
        padding: 0,
        ...FlexColumn,
    },

    expanHead: {
        maxHeight: 20,
        minHeight: 15,
        ...Centering,
        ...CreateMargin(10, 0, 10, 0),
    },
    expandHeadOpen: {
        maxHeight: '10px !important',
        minHeight: '20px !important',
        ...Centering,
        ...CreateMargin(10, 0, 0, 0),
        ...CreatePadding(0, 0, 0, 0),
    },

    labelItem: {
        maxWidth: '50%',
    },
    itemContainer: {
        paddingBottom: 10,
        maxHeight: '40vh',
        overflowY: 'auto',
        overflowX: 'none',
    },
    qtyOption: {
        marginTop: -10,
        marginBottom: 5,
    },
    action: {
        marginTop: -15,
        marginBottom: 5,
        '& .item-minus': {
            cursor: 'pointer',
            '&::after': {
                fontSize: 16,
                content: '"<"',
            },
        },
        '& .item-count': {
            padding: '0px 10px',
            fontSize: 14,
        },
        '& .item-plus': {
            cursor: 'pointer',
            fontSize: 16,
            '&::after': {
                content: '">"',
            },
        },
        '& .delete': {
            textAlign: 'right',
            '& .delete-button': {
                width: 20,
                height: 20,
            },
            '& .icon-delete': {
                fontSize: 16,
            },
        },
    },
    list: {
        padding: 0,
    },
}));

export default useStyles;
