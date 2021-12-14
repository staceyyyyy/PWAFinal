import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        position: 'relative',
        padding: '50px 20px 0px 20px',
        maxHeight: 900,
    },
    buttonClose: {
        position: 'absolute',
        top: 20,
        right: 20,
        color: GRAY_SECONDARY,
        fontSize: '3rem',
        zIndex: theme.zIndex.drawer + 9,
    },
    actionZoom: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 130,
        top: 50,
        zIndex: theme.zIndex.drawer + 9,
    },
    buttonActionZoom: {
        margin: 10,
        color: GRAY_SECONDARY,
        fontSize: '3rem',
    },
}));
