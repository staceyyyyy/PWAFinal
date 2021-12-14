import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE } from '@theme_color';
import {
    CenterAbsolute,
    FlexColumn,
    CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    btnAddToCard: {
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
    qty: {
        [theme.breakpoints.down('sm')]: {
            ...CreateMargin(0, 15, 30, 15),
            alignItems: 'center',
        },
        ...CreateMargin(0, 15, 30, 0),
        ...FlexColumn,
    },
}));
