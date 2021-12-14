import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 100,
    },
    fullWidth: {
        width: '100%',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            maxWidth: 375,
        },
    },
    loadRoot: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    centerAlign: {
        textAlign: 'center',
    },
    leftAlign: {
        textAlign: 'left',
    },
    rightAlign: {
        textAlign: 'right',
    },
    wrapper: {
        width: '100%',
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default useStyles;
