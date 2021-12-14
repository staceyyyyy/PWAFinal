import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100vh',
        ...FlexColumn,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        maxWidth: 150,
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 100,
        },
        marginRight: -20,
    },
}));
