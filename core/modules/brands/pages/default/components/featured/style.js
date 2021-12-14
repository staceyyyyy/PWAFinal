import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 233,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        cursor: 'pointer',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    imgBrand: {
        width: '100%',
        height: 'auto',
    },
}));

export default useStyles;
