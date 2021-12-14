import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {},
    fieldNewsletterControl: {
        display: 'flex',
        padding: theme.spacing(1),
    },
    fieldNewsletter: {
        background: '#fff',
        backgroundClip: 'padding-box',
        border: '1px solid silver',
        borderRadius: 0,
        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, 'Arial, sans-serif'",
        fontSize: '13px',
        height: '40px',
        lineHeight: 1.42857143,
        verticalAlign: 'baseline',
        boxSizing: 'border-box',
        padding: '0 20px 0',
        minwidth: '400px',
    },
    subscribeBtn: {
        background: '#000',
        border: '#000',
        fontWeight: 'bold',
        width: '120px',
        textTransform: 'uppercase',
        height: '40px',
        marginLeft: '5px',
        whiteSpace: 'nowrap',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: 0,
        '@media screen and (max-width: 767px)': {
            width: '100%',
            marginLeft: 0,
        },
    },
}));

export default useStyles;
