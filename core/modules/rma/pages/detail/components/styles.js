import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding,
    CreateBorder,
    FlexColumn,
    FlexRow,
    CreateMargin,
} from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    block: {
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...CreatePadding(30, 30, 30, 30),
        ...FlexColumn,
    },
    detail: {
        paddingTop: 0,
    },

    labelDetail: {
        ...CreateMargin(30, 0, 0, 0),
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
        ...CreateMargin(0, 0, 0, 5),
        padding: 0,
    },

    listSummary: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    footer: {
        ...FlexColumn,
        '&> *': {
            margin: '15px auto',
        },
    },
    btnPrintLabel: {
        width: '100%',
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        borderTop: 'none',
        width: '100%',
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: 'none',
            padding: '0px 10px',
        },
    },
    tableCellResponsive: {
        border: 'none',
        borderBottom: 'none !important',
    },
    displayFlexRow: {
        ...FlexRow,
    },
    mobLabel: {
        width: '40%',
        minWidth: '130px',
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
    container: {
        paddingBottom: 30,
    },
}));
