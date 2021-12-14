import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE, RED } from '@theme_color';
import {
    CenterAbsolute,
    FlexColumn,
    CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    btnAddToCardContainer: {

    },
    btnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            width: 316,
            float: 'left',
            maxWidth: '95%',
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
    textBtnAddToCard: {
        fontSize: 16,
        color: `${WHITE} !important`,
    },
    error: {
        color: RED,
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
