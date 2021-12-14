import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@root/core/theme/mixins';

export default makeStyles(() => ({
    detail: {
        marginTop: 15,
        ...FlexColumn,
        '& span': {
            margin: '0px 5px',
        },
    },
}));
