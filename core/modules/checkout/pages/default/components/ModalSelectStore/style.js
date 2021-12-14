import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY, GRAY_PRIMARY } from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    FlexColumn,
    CreateBorder,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
        boxShadow: 'none',
        height: '51px',
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnClose: {
        position: 'absolute',
        left: 10,
    },
    iconClose: {
        ...FONT_BIG,
        color: PRIMARY,
    },
    title: {
        justifySelf: 'center',
        ...CreateMargin(16, 0, 16, 0),
    },
    container: {
        width: '100%',
        height: '80vh',
    },
    body: {
        ...FlexColumn,
        position: 'relative',
        height: '100%',
    },
    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        bottom: 0,
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
    },
    btnSave: {
        display: 'block',
        margin: 'auto',
        width: 'calc(100% - 12px)',
        height: 41,
    },
    card: {
        width: '100%',
        ...CreateMargin(10, 0, 10, 0),
        ...CreatePadding(17, 17, 17, 17),
        ...FlexColumn,
        alignItems: 'left',
        justifyContent: 'space-between',
        ...CreateBorder('1px', '1px', '1px', '1px', GRAY_PRIMARY),
        borderRadius: 10,
    },
    cardActive: {
        ...CreateBorder('1px', '1px', '1px', '1px', PRIMARY),
    },
    cardLast: {
        marginBottom: 100,
    },
}));

export default useStyles;
