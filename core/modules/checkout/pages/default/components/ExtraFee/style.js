import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 20, 0, 20),
        width: '100%',
    },
    title: {
        marginBottom: 0,
        marginLeft: 0,
    },
    checkbox: {
        paddingTop: 0,
        marginTop: 0,
    },
    checkboxContainer: {
        padding: 0,
        marginTop: 0,
    },
    select: {
        marginTop: 0,
    },
    radio: {
        marginTop: 0,
    },
    boxItem: {
        margin: '10px 0px',
        ...FlexColumn,
    },
}));
