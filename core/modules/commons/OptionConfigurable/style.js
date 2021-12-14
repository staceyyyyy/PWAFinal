import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, CreateBorder, Centering } from '@theme_mixins';
import { PRIMARY, SECONDARY, GRAY_PRIMARY } from '@theme_color';

export default makeStyles(() => ({
    container: {
        borderRadius: 100,
        width: 47,
        height: 47,
        ...CreateMargin(11, 11, 11, 11),
        ...Centering,
        cursor: 'pointer',
    },
    bordered: {
        ...CreateBorder('3px', '3px', '3px', '3px', PRIMARY),
    },
    borderedSecondary: {
        ...CreateBorder('3px', '3px', '3px', '3px', SECONDARY),
    },
    disabledBox: {
        width: '6px',
        height: '100%',
        borderLeft: '2px solid #fff',
        borderRight: '2px solid #fff',
        background: 'red',
        margin: '0 auto',
        transform: 'rotate(45deg)',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 13,
        color: GRAY_PRIMARY,
    },
    labelActive: {
        color: PRIMARY,
    },
}));
