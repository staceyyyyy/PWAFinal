import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY } from '@theme_color';
import {
    CreateMargin, CreatePadding, FlexRow, FlexColumn, showHide,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        boxShadow: 'none',
    },
    header: {
        height: '10vh',
        ...FlexRow,
    },
    iconClose: {
        ...FONT_BIG,
        color: PRIMARY,
    },
    body: {
        ...CreatePadding(0, 10, 10, '15%'),
        ...FlexColumn,
    },
    textSearch: {
        ...FlexRow,
        justifyContent: 'space-between',
        ...CreatePadding(0, '15%', 0, 0),
    },
    title: {
        ...CreateMargin(16, 0, 16, 0),
    },
    rmMargin: {
        ...CreateMargin(0, 0, 0, 0),
    },
    result: {
        ...FlexColumn,
        ...CreateMargin(16, 0, 30, 0),
    },
    textValue: {
        ...FlexColumn,
        ...CreateMargin(10, 0, 10, 0),
    },
    ...showHide,

}));

export default useStyles;
