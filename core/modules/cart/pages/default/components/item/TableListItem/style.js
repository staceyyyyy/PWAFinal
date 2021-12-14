import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow, Centering } from '@theme_mixins';
import { GREEN, WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    displayFlexRow: {
        ...FlexRow,
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        marginTop: 30,
        boxShadow: 'none',
        width: '100%',
        '& .product-options': {
            paddingLeft: 5,
            fontSize: 12,
            marginTop: 10,
            '& .option-wrapper__item': {
                marginLeft: 0,
            },
            '& .option-item': {
                margin: 0,
                marginLeft: 5,
            },
        },
        '& .option-link': {
            marginLeft: 0,
        },
    },
    table: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            border: 'none',
            padding: '8px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('xs')]: {
            display: 'none',
        },
        width: '50%',
        minWidth: '150px',
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
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
    },
    productImgContainer: {
        width: 105,
        height: 130,
        position: 'relative',
        '& span': {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            minWidth: 20,
            minHeight: 15,
            backgroundColor: GREEN,
            color: WHITE,
            fontWeight: '700',
            fontSize: 10,
            padding: 5,
            borderRadius: 5,
            ...Centering,
            marginLeft: 'auto',
            marginRight: 5,
            textTransform: 'uppercase',
        },
    },

    productImg: {
        width: 105,
        height: 'auto',
    },
    right: {
        textAlign: 'right',
    },
    summary: {
        paddingTop: 30,
    },
    noBorder: {
        borderBottom: 'none',
    },
    iconBtn: {
        width: 30,
        height: 30,
    },
}));
