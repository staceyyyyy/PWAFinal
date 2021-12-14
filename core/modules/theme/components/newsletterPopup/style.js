import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: (props) => ({
        position: 'fixed',
        bottom: '50%',
        right: theme.spacing(2),
        zIndex: theme.zIndex.drawer + 3,
        color: props.color,
        backgroundColor: props.bgColor,
        [theme.breakpoints.down('sm')]: {
            bottom: theme.spacing(10),
        },
        '&:hover': {
            backgroundColor: `${props.bgColor}E6`,
        },
    }),
    dialog: {
        '& div[role=dialog]': {
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(1),
            },
        },
    },
    newsletter: {
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4, 1),
        },
        '& .row': {
            margin: 0,
        },
        '& .newsletter-left': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .newsletter-right': {
            padding: 0,
            '& img': {
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
            },
            '@media screen and (max-width: 767px)': {
                display: 'none',
            },
        },
        '& p': {
            fontSize: 11,
        },
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        '&:hover': {
            cursor: 'pointer',
        },
    },
}));

export default useStyles;
