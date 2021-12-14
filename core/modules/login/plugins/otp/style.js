import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FlexColumn, FlexRow, CreateMargin, Centering,
} from '@theme_mixins';

export default makeStyles(() => ({
    root: {
        ...FlexColumn,
        width: '100%',
    },
    componentContainer: {
        width: '100%',
        ...FlexRow,
        alignItems: 'center',
        ...CreateMargin(0, 0, 0, 0),
    },
    input: {
        width: '65%',
        marginRight: 10,
    },
    button: {
        width: '35%',
        ...Centering,
        textAlign: 'center',
        justifyContent: 'center',
    },
}));
