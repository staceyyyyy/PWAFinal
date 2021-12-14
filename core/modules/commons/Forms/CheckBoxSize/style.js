import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, PRIMARY } from '@theme_color';
import { Centering } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        minWidth: 65,
        height: 65,
        marginRight: 8,
        borderRadius: 100,
        border: `1px solid ${GRAY_PRIMARY}`,
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
    label: {
        fontWeight: 'bold',
        fontSize: 11,
        color: GRAY_PRIMARY,
        textAlign: 'center',
    },
    labelActive: {
        color: PRIMARY,
    },
}));
