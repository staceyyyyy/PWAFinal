import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY } from '@theme_color';
import {
    CreatePadding,
    FlexColumn,
    FlexRow,
    CreateMargin,
    Centering,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    block: {
        // ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...CreatePadding(30, 30, 30, 30),
        ...FlexColumn,
    },
    blockHeader: {
        ...CreatePadding(30, 30, 0, 30),
        ...FlexColumn,
    },
    headerTitle: {
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
    },
    detail: {
        paddingTop: 0,
        alignItems: 'center',
        textAlign: 'center',
    },

    labelDetail: {
        ...CreateMargin(30, 0, 0, 0),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    labelDetailSm: {
        ...CreateMargin(10, 0, 0, 0),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },

    itemContainer: {
        ...FlexRow,
        ...CreateMargin(10, 0, 20, 0),
    },

    productImgContainer: {
        width: 105,
        height: 130,
    },

    productImg: {
        width: 105,
        height: 'auto',
    },

    detailItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
    },
    textDetail: {
        ...CreateMargin(5, 0, 0, 0),
        padding: 0,
    },

    listSummary: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    blockLabel: {
        fontSize: 25,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    footer: {
        ...FlexColumn,
        '&> *': {
            margin: '15px auto',
        },
    },
    blockIcon: {
        ...Centering,
    },

    wrapperButton: {
        width: 80,
        border: `1px solid ${GRAY_PRIMARY}`,
        ...CreatePadding(5, 5, 5, 5),
        ...CreateMargin(5, 0, 0, 0),
        ...Centering,
        marginRight: 10,
    },

    reorderButton: {
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
    },
    btnPayNow: {
        marginTop: 15,
    },
}));
