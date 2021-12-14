import { makeStyles } from '@material-ui/core/styles';
import { Centering } from '@theme_mixins';
import {
    PRIMARY, WHITE, RED,
} from '@theme/colors';

const useStyles = makeStyles(() => ({
    noMargin: {
        margin: 0,
    },
    spanNew: {
        minWidth: 20,
        minHeight: 20,
        backgroundColor: PRIMARY,
        color: WHITE,
        fontWeight: '700',
        fontSize: 11,
        padding: 5,
        borderRadius: 5,
        ...Centering,
    },
    spanSale: {
        minWidth: 20,
        minHeight: 20,
        backgroundColor: RED,
        color: WHITE,
        fontWeight: '700',
        fontSize: 11,
        padding: 5,
        borderRadius: 5,
        ...Centering,
        marginLeft: 'auto',
        marginRight: 10,
    },
}));

export default useStyles;
