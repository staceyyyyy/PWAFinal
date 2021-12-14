import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE, PRIMARY, GRAY_PRIMARY } from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    Centering,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        height: '51px',
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
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
        textAlign: 'center',
    },
    body: {
        ...Centering,
        ...CreatePadding(20, 80, 80, 80),
        justifyContent: 'space-between',
    },
    item: {
        margin: 0,
        ...Centering,
        textAlign: 'center',
    },
    titleContainer: {
        ...Centering,
        textAlign: 'center',
    },
    btnCategoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 20,
        width: 'auto',
    },
}));

export default useStyles;
