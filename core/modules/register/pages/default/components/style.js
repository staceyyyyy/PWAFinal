import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    CreatePadding, FlexColumn, CreateMargin, CenterAbsolute, FlexRow,
} from '@theme_mixins';
import {
    GRAY_PRIMARY, RED, GREEN, ORANGE,
} from '@theme_color';

export default makeStyles(() => ({
    container: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        alignItems: 'center',
        ...CreatePadding(10, 30, 30, 30),
        '& * .Mui-error, * .Mui-error > span': {
            fontSize: 10,
            fontWeight: 300,
        },
    },
    btnSigin: {
        ...CreateMargin(30, 0, 10, 0),
    },
    footer: {
        ...CreateMargin(40, 0, 0, 0),
        ...FlexColumn,
        width: '100%',
        height: 'auto',
    },

    passwordStrength: {
        background: GRAY_PRIMARY,
        width: '100%',
        height: 30,
        ...FlexRow,
    },
    passwdStrPrgsCtr: {
        background: 'transparent',
        height: 30,
    },
    zero: {
        width: 0,
    },
    per3: {
        width: '30%',
    },
    half: {
        width: '50%',
    },
    per7: {
        width: '75%',
    },
    full: {
        width: '100%',
    },
    passwdStrPrgsBar: {
        height: 30,
        background: GREEN,
        opacity: 0.4,
    },
    per3Bar: {
        width: '30%',
        background: RED,
        opacity: 0.3,
    },
    halfBar: {
        background: ORANGE,
        width: '50%',
        opacity: 0.5,
    },
    txtPasswdStr: {
        position: 'absolute',
        width: '100%',
        ...CenterAbsolute,
    },
    checkWa: {
        ...CreateMargin(0, 0, -10, -10),
    },
    checkTos: {
        ...CreateMargin(0, 0, 0, -10),
    },
    tos: {
        ...FlexRow,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        '& p': {
            width: 80,
        },
    },
    subscribe: {
        marginBottom: 25,
    },
}));
