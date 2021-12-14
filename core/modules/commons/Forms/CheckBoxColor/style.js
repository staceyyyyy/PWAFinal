import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, PRIMARY, WHITE } from '@theme_color';
import { Centering } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        marginRight: '6px',
        minWidth: 53,
        height: 53,
        borderRadius: 100,
        border: `1px solid ${GRAY_PRIMARY}`,
        backgroudColor: WHITE,
        ...Centering,
        [theme.breakpoints.up('sm')]: {
            minWidth: 23,
            height: 23,
            float: 'left',
            marginBottom: 10,
        },
    },
    active: {
        border: `3px solid ${PRIMARY}`,
    },
}));
