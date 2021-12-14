import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, PRIMARY } from '@theme_color';
import { Centering, CreateMargin } from '@theme_mixins';

export default makeStyles(() => ({
    container: {
        width: 47,
        height: 47,
        borderRadius: 100,
        border: `1px solid ${GRAY_PRIMARY}`,
        ...Centering,
        ...CreateMargin(10, 5, 5, 10),
        position: 'relative',
    },
    active: {
        border: `3px solid ${PRIMARY}`,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 13,
        color: GRAY_PRIMARY,
    },
    labelActive: {
        color: PRIMARY,
    },
    disabled: {
        width: '6px',
        height: '100%',
        borderLeft: '2px solid #fff',
        borderRight: '2px solid #fff',
        background: 'red',
        margin: '0 auto',
        transform: 'rotate(45deg)',
        position: 'absolute',
        zIndex: 5,
    },
}));
