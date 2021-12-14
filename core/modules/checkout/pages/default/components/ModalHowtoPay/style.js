import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY, GRAY_THIRD } from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    FlexColumn,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
        boxShadow: 'none',
        height: '70px',
        ...FlexRow,
    },
    btnClose: {
        position: 'absolute',
        right: 10,
    },
    iconClose: {
        ...FONT_BIG,
        color: PRIMARY,
    },
    title: {
        justifySelf: 'left',
        fontSize: '1.7vw',
        color: GRAY_THIRD,
        ...CreateMargin(30, 0, 16, 30),
    },
    body: {
        ...FlexColumn,
        position: 'relative',
        height: '100%',
        padding: 20,
    },
    footer: {
        ...FlexRow,
        justifyContent: 'flex-end',
        bottom: 0,
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
    },
    btnSave: {
        margin: 'auto',
        width: '8vw',
        height: 41,
    },
}));

export default useStyles;
