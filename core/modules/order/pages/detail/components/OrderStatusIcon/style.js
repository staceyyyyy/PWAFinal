import { PRIMARY, WHITE, GRAY_PRIMARY } from '@theme_color';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Centering } from '@theme_mixins';

export const lineStyle = {
    alternativeLabel: {
        top: 30,
        '@media (max-width: 768px )': {
            top: 20,
        },
    },
    active: {
        '& $line': {
            background: PRIMARY,
        },
    },
    completed: {
        '& $line': {
            background: PRIMARY,
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: PRIMARY,
        borderRadius: 1,
    },
};

const configStyleIcon = {
    backgroundPosition: 'center top',
    backgroundSize: '100% 100%',
    width: 20,
    height: 20,
};

const configIconSm = {
    width: 20,
    height: 20,
};

export const useIconStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        maxWidth: 700,
    },
    stepLabel: {
        marginTop: '5px !important',
    },
    label: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 9,
        },
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        zIndex: 2,
        ...Centering,
        [theme.breakpoints.down('xs')]: {
            width: 40,
            height: 40,
        },
    },
    iconContainerinactive: {
        background: GRAY_PRIMARY,
    },
    iconContainerskip: {
        background: PRIMARY,
    },
    iconContaineractive: {
        background: WHITE,
        border: `3px solid ${PRIMARY}`,
    },

    // icon pending

    iconpendinginactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/waiting-gray.svg)',
    },
    iconpendingactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/waiting-black.svg)',
    },
    iconpendingskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/waiting-white.svg)',
    },

    // icon processing
    iconprocessinginactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/processing-gray.svg)',
    },
    iconprocessingactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
        },
        backgroundImage: 'url(/assets/img/order_status/processing-black.svg)',
    },
    iconprocessingskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/processing-white.svg)',
    },

    // icon shipping

    iconshippinginactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/shipping-gray.svg)',
    },
    iconshippingactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/shipping-black.svg)',
    },
    iconshippingskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/shipping-white.svg)',
    },

    // icon completed
    iconcompleteinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/completed-gray.svg)',
    },
    iconcompleteactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/completed-black.svg)',
    },
    iconcompleteskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/completed-white.svg)',
    },
    // icon canceled
    iconcanceledinactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/completed-gray.svg)',
    },
    iconcanceledactive: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/completed-black.svg)',
    },
    iconcanceledskip: {
        ...configStyleIcon,
        [theme.breakpoints.down('xs')]: {
            ...configIconSm,
        },
        backgroundImage: 'url(/assets/img/order_status/completed-white.svg)',
    },
}));
