import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';

const useStyles = makeStyles({
    root: {
        margin: 0,
        marginBottom: 10,
        width: '100%',
        ...FlexColumn,
    },
    column: {
        ...FlexColumn,
    },
    row: {
        ...FlexRow,
    },
    error: {
        marginBottom: 0,
    },
});

export default useStyles;
