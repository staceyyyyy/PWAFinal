import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, CenterAbsolute, FlexColumn, CreateMargin, Centering,
} from '@theme_mixins';
import { WHITE, GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        ...CreatePadding(30, 70, 30, 70),
        ...FlexColumn,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url("/assets/img/thanks/background.jpg")',
    },
    iconContainer: {
        width: '65%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 120,
        left: 0,
        ...CenterAbsolute,
    },
    imgIcon: {
        width: '100%',
        height: 230,
        overflow: 'hidden',
    },
    title: {
        marginBottom: 30,
        marginLeft: 0,
        fontSize: 30,
        [theme.breakpoints.up('sm')]: {
            marginTop: 30,
            marginLeft: '0px !important',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
            marginBottom: 20,
        },
    },

    info: {
        marginTop: 20,
        width: '100%',
        ...FlexColumn,
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            ...FlexColumn,
        },
    },

    wrapperBank: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            ...FlexColumn,
            alignItems: 'center',
            '&> *': {
                textAlign: 'center !important',
            },
        },
        ...CreatePadding(10, 10, 10, 10),
    },

    wrapperRegister: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            ...FlexColumn,
            '&> *': {
                textAlign: 'center !important',
            },
        },
        ...CreatePadding(10, 10, 10, 10),
    },

    bankItem: {
        width: '16vw',
        height: '10vw',
        border: `0.5px solid ${GRAY_PRIMARY}`,
        ...FlexColumn,
        ...Centering,
        fontSize: 12,
        ...CreateMargin(0, 8, 0, 0),
        [theme.breakpoints.down('md')]: {
            ...FlexColumn,
            width: '90%',
            height: '20vw',
            ...CreateMargin(8, 0, 8, 0),
            alignItems: 'center',
            '&> *': {
                textAlign: 'center !important',
            },
        },
    },

    footer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        ...Centering,
        ...CreatePadding(20, 60, 30, 60),
    },
    btnConfirm: {
        height: 30,
        fontSize: 10,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 0,
        },
    },
    txtConfirm: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 10,
        },
    },
    btnConfirmFirst: {
        marginBottom: 15,
    },
    btnConfirmIcon: {
        fontSize: '12px !important',
        marginLeft: -5,
    },
    btnAccountIcon: {
        fontSize: '50px !important',
    },
    btnContinue: {
        ...CreateMargin(0, 8, 0, 0),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        ...Centering,
        color: WHITE,
        borderRadius: 100,
    },
    textBtn: {
        color: `${WHITE} !important`,
    },

    payment: {
        textTransform: 'lowercase',
    },
    dateOver: {
        marginTop: 15,
        marginLeft: '0px !important',
        textAlign: 'center',
    },

    footerDesktop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
    },

    link: {
        cursor: 'pointer',
    },

    // media query
    '@media (max-width: 280px )': {
        container: {
            padding: '20px 20px !important',
        },
        footer: {
            padding: '20px 20px !important',
        },
    },

    '@media (max-width: 320px )': {
        container: {
            padding: '20px 50px',
        },
        footer: {
            ...CreatePadding(20, 60, 20, 60),
        },
        imgIcon: {
            height: 160,
        },
        iconContainer: {
            width: '50%',
            bottom: 100,
        },
    },
    '@media (min-width: 375px )': {
        iconContainer: {
            width: '60%',
        },
    },
    '@media (min-width: 411px )': {
        iconContainer: {
            width: '55%',
        },
    },
    '@media (min-width: 750px )': {
        iconContainer: {
            width: '300px',
            bottom: '12%',
        },
        imgIcon: {
            height: 280,
        },
    },
    '@media (min-width: 1020px )': {
        iconContainer: {
            width: '400px',
            bottom: '10%',
        },
        imgIcon: {
            height: 350,
        },
    },
    generalButton: {
        marginTop: 20,
    },
}));
