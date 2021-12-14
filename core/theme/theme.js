import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import {
    GRAY_SECONDARY, PRIMARY, SECONDARY, WHITE,
} from '@theme_color';
import { FONT_24, FONT_DEFAULT, FONT_REGULAR } from '@theme_typography';
import { BREAKPOINTS } from '@theme_vars';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY,
        },
        secondary: {
            main: SECONDARY,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: WHITE,
        },
    },
    breakpoints: {
        values: {
            ...BREAKPOINTS,
        },
    },
    overrides: {
        MuiGrid: {
            root: {
                padding: 0,
                margin: 0,
            },
        },
        MuiTextField: {
            root: {
                ...FONT_REGULAR,
            },
        },
        MuiTypography: {
            h1: {
                ...FONT_24,
                ...FONT_DEFAULT,
            },
            root: {
                ...FONT_DEFAULT,
            },
        },
        MuiRadio: {
            root: {
                color: GRAY_SECONDARY,
                '&$checked': {
                    color: PRIMARY,
                },
            },
        },
        MuiFormControlLabel: {
            label: {
                ...FONT_REGULAR,
            },
            root: {
                marginBottom: -15,
            },
        },
        MuiDrawer: {
            paperAnchorRight: {
                background: 'transparent',
                boxShadow: 'none',
            },
        },
        MuiIcon: {
            root: {
                color: PRIMARY,
            },
        },
        MuiButton: {
            root: {
                borderRadius: 100,
            },
        },
    },
});

export default theme;
