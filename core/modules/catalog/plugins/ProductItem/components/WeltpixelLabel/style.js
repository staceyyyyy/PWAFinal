import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    topSmall: {
        [theme.breakpoints.down('sm')]: {
            top: 50,
        },
    },
    1: {
        position: 'absolute',
        left: 5,
        top: 5,
        zIndex: 2,
    },
    2: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
        top: 5,
        zIndex: 2,
    },
    3: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 2,
    },
    4: {
        position: 'absolute',
        left: 5,
        top: '50%',
        transform: 'translate(0%, -50%)',
        zIndex: 2,
    },
    5: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
    },
    6: {
        position: 'absolute',
        right: 5,
        top: '50%',
        transform: 'translate(0%, -50%)',
        zIndex: 2,
    },
    7: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        zIndex: 2,
    },
    8: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
        bottom: 5,
        zIndex: 2,
    },
    9: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        zIndex: 2,
    },
    10: {
        marginLeft: 5,
        marginBottom: 10,
    },
    withThumbnailProduct: {
        left: 30,
        [theme.breakpoints.down('sm')]: {
            left: 20,
        },
    },
    withThumbnailProductRight: {
        right: 50,
        [theme.breakpoints.down('sm')]: {
            right: 20,
        },
    },
    productRight: {
        right: 20,
        [theme.breakpoints.down('sm')]: {
            right: 10,
        },
    },
}));

export default useStyles;
