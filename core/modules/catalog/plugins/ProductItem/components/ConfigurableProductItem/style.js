import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreateMargin, CreatePadding, FlexRow, FlexColumn,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    colorContainer: {
        ...FlexRow,
        ...CreatePadding(10, 10, 0, 0),
    },
    btnColor: {
        ...CreateMargin(0, 5, 0, 0),
    },
    container: {
        borderRadius: 100,
        width: 20,
        height: 20,
        ...CreateMargin(11, 11, 11, 11),
    },
    select: {
        minWidth: '30%',
        width: 'auto',
        maxWidth: '100%',
        marginBottom: 10,
        ...FlexColumn,
        [theme.breakpoints.up('sm')]: {
            maxWidth: '75%',
        },
        '& .label-select': {
            textAlign: 'center',
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left',
            },
        },
    },
    labelContainer: {
        ...FlexRow,
        '& .label-select': {
        },
        '& .label-select-value': {
            marginLeft: 20,
            fontSize: 14,
        },
        justifyContent: 'flex-between',
        alignItems: 'center',
    },
    stylesItemOption: {
        width: 30,
        height: 30,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 8,
    },
}));
