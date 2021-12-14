import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn, CreateMargin } from '@theme_mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
        textAlign: 'left',
    },
    btn: {
        alignSelf: 'center',
    },
    email: {
        ...CreateMargin(15, 5, 15, 5),
    },
    switch: {
        ...CreateMargin(0, 0, 30, -10),
    },
}));
