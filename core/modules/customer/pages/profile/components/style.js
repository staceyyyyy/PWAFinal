import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
        [theme.breakpoints.up('sm')]: {
            ...CreatePadding(16, 0),
        },
    },
    editContainer: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 30, 0),
    },
    checkboxLabel: {
        marginBottom: '12px',
    },
    bottomButtons: {
        textAlign: 'left',
    },
    skeletonContainer: {
        padding: '16px',
        width: '100%',
    },
    skeletonField: {
        marginBottom: '24px',
    },
    skeleton: {
        margin: '6px',
    },
}));
