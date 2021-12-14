import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '& .quoteContainer': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
            },
        },
        '& .quoteContainer > *': {
            margin: '0px 5px',
        },

        '& .wpx-sub': {
            fontWeight: 'bold',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        '& p': {
            fontSize: 12,
            [theme.breakpoints.down('sm')]: {
                fontSize: 10,
            },
        },

        '& .wpx-link': {
            fontSize: 12,
            textDecoration: 'underline',
            cursor: 'pointer',
            [theme.breakpoints.down('sm')]: {
                fontSize: 10,
            },
        },
    },
    arrow: {
        fontSize: '1.5rem',
        position: 'absolute',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        paddingLeft: 10,
        top: 'calc(50% - 1.5rem)',
        width: 30,
        height: 30,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            width: 20,
            height: 20,
            fontSize: '1rem',
            top: 'calc(50%)',
        },
    },
    leftArrow: {
        left: '20%',
        [theme.breakpoints.down('sm')]: {
            left: 5,
        },
    },

    btnClose: {
        position: 'absolute',
        top: 5,
        right: 15,
        color: 'inherit',
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        background: 'none',
        [theme.breakpoints.down('sm')]: {
            right: 5,
        },
    },

    rightArrow: {
        right: '20%',
        [theme.breakpoints.down('sm')]: {
            right: 10,
        },
    },
}));

export default useStyles;
