import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY } from '@theme_color';
import {
    Centering,
    CreateBorder,
    CreatePadding,
    FlexRow,
    CreateMargin,
} from '@theme_mixins';

export default makeStyles(() => ({
    block: {
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...CreatePadding(0, 10, 0, 10),
    },
    fieldPoinContainer: {
        ...FlexRow,
        alignItems: 'center',
        ...CreateMargin(10, 0, 15, 0),
        maxWidth: 420,
    },
    btnAplly: {
        height: 30,
        ...Centering,
        marginLeft: 5,
    },
    rmBorder: {
        border: 'none',
    },
    smallCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -8,
        marginLeft: -8,
    },
}));
