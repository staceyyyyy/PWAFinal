import makeStyles from '@material-ui/core/styles/makeStyles';

import { CreatePadding, FlexColumn} from '@theme_mixins';
export default makeStyles({
    container: {
        ...CreatePadding(15, 15, 25, 15),
        ...FlexColumn,
    },
    footer: {
        marginTop: 25,
        textAlign: 'left',
    },
    button: {
        padding: 10,
        borderRadius:'0',
        backgroundColor:'#E63B14',
    },
    datePicker: {
        marginBottom: 20,
    },
});
