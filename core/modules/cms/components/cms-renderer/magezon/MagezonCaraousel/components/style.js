import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    caraousel: {
        width: '100%',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100vw',
        },
    },
    arrow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        borderRadius: 5,
        textAlign: 'center',
        cursor: 'pointer',
    },
    leftArrow: {
        left: 0,
    },

    rightArrow: {
        right: 0,
    },
}));

export default useStyles;
