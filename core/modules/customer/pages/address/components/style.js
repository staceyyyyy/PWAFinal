import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, GREEN, PRIMARY } from '@theme_color';
import {
    CreateMargin, CreatePadding, FlexColumn, FlexRow,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    displayFlexRow: {
        ...FlexRow,
    },
    container: {
        // [theme.breakpoints.up('sm')]: {
        //     maxWidht: 900,
        // },
        ...FlexColumn,
        width: '100%',
        height: '100%',
        fontSize: '12px',
        padding: '0px 20px 40px 20px',
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
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
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
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
    colorPrimary: {
        color: PRIMARY,
    },
    wrapper_address: {
        margin: '40px 0',
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    appBarBottom: {
        bottom: 0,
        top: 'auto',
        backgroundColor: 'white',
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
    address_shipping: {
        ...CreatePadding(15, 15, 15, 15),
        width: '100%',
        margin: 0,
    },
    address_billing: {
        padding: '20px 15px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    address_title: {
        color: PRIMARY,
        fontSize: '12px',
        fontWeight: '700',
        marginBottom: '5px',
    },
    addressColumn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    address_content: {
        fontSize: '12px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        paddingBottom: '15px',
    },
    address_text: {
        fontSize: '12px',
    },
    address_edit: {
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '12px',
        margin: '0',
    },
    address_remove: {
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '12px',
        margin: '0',
    },
    address_edit_mobile: {
        marginLeft: 57,
    },
    address_action: {
        marginTop: '20px',
        textAlign: 'left',
    },
    btn_action: {
        borderRadius: '0',
        padding: '10px',
    },
    address_add: {
        backgroundColor: 'white',
        boxShadow: 'none',
        border: '1px solid black',
        fontSize: '12px',
    },
    address_save: {
        width: '100%',
        backgroundColor: PRIMARY,
        color: 'white',
        textTransform: 'uppercase',
    },
    address_drawer: {
        backgroundColor: 'white',
        left: 0,
        width: '100%',
    },
    address_form: {
        padding: '15px',
    },
    form_input: {
        marginBottom: '25px',
    },
    addBtn: {
        ...CreateMargin(30, 0, 30, 0),
    },
    boxMap: {
        ...CreateMargin(30, 0, 60, 0),
        height: 'auto',
    },
    fontWhite: {
        color: 'white',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: PRIMARY,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    addBtnSuccess: {
        backgroundColor: GREEN,
        '&:hover': {
            backgroundColor: GREEN,
        },
        ...CreateMargin(30, 0, 30, 0),
    },
    ok: {
        marginTop: '10px',
    },
}));

export default useStyles;
