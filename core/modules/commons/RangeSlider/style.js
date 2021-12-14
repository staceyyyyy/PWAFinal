import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, GRAY_THIRD } from '@theme_color';
import {
    FlexColumn, FlexRow, CreateMargin, CreatePadding,
} from '@theme_mixins';

export const useStyles = makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 15, 0, 0),
    },
    spanLabelPrice: {
        ...FlexRow,
        justifyContent: 'space-between',
        ...CreateMargin(17, 0, 0, 0),
    },
}));

export const sliderStyle = {
    root: {
        color: GRAY_THIRD,
        height: 8,
        width: '100%',
    },
    thumb: {
        height: 17,
        width: 17,
        backgroundColor: PRIMARY,
        border: `2px solid ${PRIMARY}`,
        marginTop: -5,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'primary',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 0,
    },
    rail: {
        height: 8,
        borderRadius: 0,
    },
};
