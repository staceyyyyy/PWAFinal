import { CreatePadding } from '@theme_mixins';

const configStyleIcon = {
    width: 30,
    height: 30,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPositionY: 'center',
    marginRight: 10,
};

export const IconAccordion = {
    reguler: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-reguler.svg)',
    },
    freeshipping: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-free.svg)',
    },
    express: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-express.svg)',
    },
    instant: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-instant.svg)',
    },
    sameday: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-sameday.svg)',
    },
    international: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-international.svg)',
    },
    trucking: {
        ...configStyleIcon,
        backgroundImage: 'url(/assets/img/shipping-trucking.svg)',
    },
};

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
        width: '100% !important',
        ...CreatePadding(15, 15, 15, 15),
    },
};
