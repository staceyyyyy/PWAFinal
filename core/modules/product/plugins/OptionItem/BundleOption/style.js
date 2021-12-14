import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    WHITE,
} from '@theme_color';
import { CenterAbsolute, CreateMargin } from '@theme_mixins';

export default makeStyles((theme) => ({
    customizeContainer: {
        width: '100%',
        height: 'auto',
        padding: '10px 7px',
        '& .required-label': {
            color: 'red',
            paddingLeft: 5,
        },
        '& .options-container': {
            display: 'flex',
            padding: '5px 0px',
        },
        '& .label-options': {
            fontWeight: 'normal',
            cursor: 'pointer',
        },
        '& .item-list': {
            padding: '10px 0px',
            borderBottom: '1px solid #e6dddd',
        },
    },
    btnAddToCard: {
        width: '100%',
        marginTop: 15,
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
    },
    btnOpenSimple: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            width: 316,
            float: 'left',
        },
        ...CreateMargin(0, 8, 0, 0),
        width: '100%',
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
    },
    selectItem: {
        display: 'flex',
        margin: '15px 0px',
    },
}));
