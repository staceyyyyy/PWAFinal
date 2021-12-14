import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, CreatePadding } from '@theme_mixins';
import { PRIMARY } from '@theme_color';

export const useStyles = makeStyles(() => ({
    container: {
        ...CreateMargin(15, 0, 30, 0),
    },
    icon: {
        fontSize: 16,
        color: PRIMARY,
    },
    imgList: {
        maxWidth: 50,
        maxHeight: 25,
        right: 0,
    },
}));

export const ExpanPanelStyle = {
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
};

export const ExpanSummaryStyle = {
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        height: 40,
        '&$expanded': {
            height: 40,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
};

export const ExpanDetailStyle = {
    root: {
        ...CreatePadding(15, 15, 15, 15),
    },
};
