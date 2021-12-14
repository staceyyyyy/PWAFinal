import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CenterAbsolute,
    CreateMargin,
    CreatePadding,
    CreateShadow,
    FlexColumn,
    FlexRow,
    Centering,
} from '@theme_mixins';
import { WHITE } from '@theme_color';

export default makeStyles(() => ({
    footer: {
        ...FlexColumn,
        width: '100%',
        maxWidth: 960,
        position: 'fixed',
        bottom: 0,
        ...CreateShadow('top', 3),
        ...CreatePadding(0, 20, 20, 20),
        background: WHITE,
    },
    btnSave: {
        ...CreateMargin(13, 8, 0, 0),
        ...CenterAbsolute,
        width: 316,
        maxWidth: '85%',
        height: 41,
    },
    listSummary: {
        ...FlexRow,
        justifyContent: 'space-between',
    },

    expand: {
        margin: 0,
        padding: 0,
        width: '100%',
        border: 'none',
        boxShadow: 'none',
    },
    expanBody: {
        width: '100%',
        margin: 0,
        padding: 0,
        ...FlexColumn,
    },

    expanHead: {
        maxHeight: 20,
        minHeight: 15,
        ...Centering,
        ...CreateMargin(10, 0, 10, 0),
    },
    expandHeadOpen: {
        maxHeight: '20px !important',
        minHeight: 15,
        ...Centering,
        ...CreateMargin(0, 0, 0, 0),
        ...CreatePadding(0, 0, 0, 0),
    },
}));
