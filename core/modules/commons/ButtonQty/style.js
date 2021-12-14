import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, GRAY_SECONDARY } from '@theme_color';
import { FlexRow, Centering, CreateBorder } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    box: {
        ...FlexRow,
        width: 120,
        height: 30,
    },
    minus: {
        borderRadius: '5px 0px 0px 5px',
        ...CreateBorder('1px', 0, '1px', '1px', GRAY_PRIMARY),
        flex: 1,
        ...Centering,
        cursor: 'pointer',
        userSelect: 'none',
    },
    input: {
        margin: 0,
        flex: 1,
        minWidth: 60,
        border: `1px solid ${GRAY_PRIMARY}`,
        ...Centering,
        borderRadius: 0,
        textAlign: 'center',
        '&:focus': {
            outline: 'none',
        },
        '&::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
        },
        '&::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
        },
        WebkitAppearance: 'textfield',
    },
    plus: {
        flex: 1,
        borderRadius: '0px 5px 5px 0px',
        ...CreateBorder('1px', '1px', '1px', 0, GRAY_PRIMARY),
        ...Centering,
        cursor: 'pointer',
        userSelect: 'none',
    },
    disabled: {
        background: GRAY_SECONDARY,
    },
}));

export default useStyles;
