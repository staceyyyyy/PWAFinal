import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY } from '@theme_color';
import {
    CreateBorder,
    FlexRow,
} from '@theme_mixins';

export default makeStyles(() => ({
    root: {
        ...CreateBorder(0, 0, '1px', 0, PRIMARY),
        ...FlexRow,
    },
    rootRmBorder: {
        ...FlexRow,
        border: 'none',
    },
    labelContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    labelBox: {
        flex: 1,
    },
    labelContainerActive: {
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecoration: 'line-through',
        marginLeft: 'auto',
    },
    promo: {
        marginLeft: 'auto',
        fontWeight: 'bold',
    },
    notPromo: {
        marginLeft: 'auto',
        fontWeight: 'normal',
    },
}));
