import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, PRIMARY } from '@theme_color';
import {
    Centering,
    CreateBorder,
    CreatePadding,
    FlexColumn,
    FlexRow,
    CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    root: {
        ...FlexColumn,
        height: '100vh',
        width: '100%',
    },
    container: {
        width: '100%',
        height: 'auto',
        paddingBottom: 150,
    },
    block: {
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...CreatePadding(30, 30, 30, 30),
    },
    addressContainer: {
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressText: {
        ...FlexColumn,
        maxWidth: '60%',
    },
    listShipping: {
        ...CreateBorder('1px', 0, 0, 0, PRIMARY),
    },
    listShippingGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
        boxSizing: 'inherit',
    },
    radioShiping: {
        width: '100% !important',
    },
    btnPoint: {
        maxWidth: 140,
        ...Centering,
        padding: 5,
    },
    cardPoint: {
        ...CreateMargin(5, 0, 5, 0),
        ...CreatePadding(17, 17, 17, 17),
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...CreateBorder('1px', '1px', '1px', '1px', GRAY_PRIMARY),
        borderRadius: 10,
        maxWidth: 480,
    },
    pointText: {
        fontSize: 20,
        ...CreateMargin(0, 0, 0, 5),
    },
    btnBalanceGift: {
        ...CreateMargin(-25, 0, 0, -5),
    },
    rmBorder: {
        border: 'none',
    },
    smallCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -8,
        marginLeft: -8,
    },
    mediumCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    largeCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -15,
        marginLeft: -15,
    },
    customFormControl: {
        marginTop: '10px',
        marginBottom: '20px',
    },
    emailContainer: {
        margin: '5px',
    },
    giftCardContainer: {
        position: 'relative',
    },
    giftcardInfoContainer: {
        ...CreateMargin(-30, 10, 30, 5),
    },
    giftCard: {
        marginLeft: '5px',
        marginRight: '5px',
    },
    paymentExpansionContainer: {
        marginTop: '10px',
    },
    placeOrderDesktop: {
        maxWidth: 500,
        height: 50,
    },
    labelAccordion: {
        ...FlexRow,
        alignItems: 'center',
    },
    mobileBottomSpace: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 140,
        },
    },
    paymentHeader: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    howToPay: {
        ...CreatePadding(5, 15, 5, 15),
    },
    listError: {
        ...FlexColumn,
        marginTop: 20,
    },
}));
