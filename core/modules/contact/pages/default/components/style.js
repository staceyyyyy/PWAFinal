import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';

export default makeStyles(() => ({
    pageTitles: {
        marginBottom: '20px',
        textTransform: 'uppercase',
    },
    container: {
        ...FlexColumn,
        ...CreatePadding(30, 20, 20, 20),
    },
    btnSubmit: {
        marginTop: 50,
        textAlign: 'left',
    },
    message: {
        marginBottom: 30,
    },
    skeletonForm: {
        marginBottom: 20,
    },
}));
