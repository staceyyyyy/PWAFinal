import { makeStyles } from '@material-ui/core/styles';
import { Centering, CreatePadding } from '@theme_mixins';
import { WHITE } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
    },
    body: {
        ...Centering,
        ...CreatePadding(20, 80, 80, 80),
        justifyContent: 'space-between',
    },
    item: {
        margin: 0,
        ...Centering,
    },
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        boxShadow: 'none',
        '& .MuiFormControl-marginNormal': {
            marginTop: 10,
            marginBottom: 30,
        },
    },
    iconClose: {
        size: 30,
    },
    lastCat: {
        margin: 0,
        padding: 2,
        height: 'auto',
        marginBottom: '40px !important',
    },
    cat: {
        padding: 2,
        height: 'auto',
    },
}));

export default useStyles;
