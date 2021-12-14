export const CreatePadding = (top = 0, right = 0, bottom = 0, left = 0) => ({
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
});

export const CreateMargin = (top = 0, right = 0, bottom = 0, left = 0) => ({
    marginTop: top,
    marginRight: right,
    marginBottom: bottom,
    marginLeft: left,
});

export const FlexRow = {
    display: 'flex',
    flexDirection: 'row',
};

export const FlexColumn = {
    display: 'flex',
    flexDirection: 'column',
};

export const Centering = {
    ...FlexColumn,
    justifyContent: 'center',
    alignItems: 'center',
};

export const showHide = {
    show: {
        display: 'block',
    },
    hide: {
        display: 'none',
    },
};

export const ClearMarginPadding = {
    margin: 0,
    padding: 0,
};

export const CenterAbsolute = {
    left: '50%',
    '-webkit-transform': 'translateX(-50%)',
    transform: ' translateX(-50%)',
};

export const CreateShadow = (position = 'all', width = 5, color = 'rgba(0,0,0,0.38)') => {
    const shadow = {
        top: {
            boxShadow: `0 -${width}px ${width}px -${width}px ${color}`,
        },

        right: {
            boxShadow: `${width}px 0 ${width}px -${width}px ${color}`,
        },

        bottom: {
            boxShadow: `0 ${width}px ${width}px -${width}px ${color}`,
        },

        left: {
            boxShadow: `-${width}px 0 ${width}px -${width}px ${color}`,
        },

        all: {
            boxShadow: `0 0 ${width}px ${color}`,
        },
    };
    return shadow[position];
};

export const CreateBorder = (
    borderTop = '',
    borderRight = '',
    BorderBottom = '',
    borderLeft = '',
    color = '#000',
) => ({
    borderTop: `${borderTop} solid ${color}`,
    borderRight: `${borderRight} solid ${color}`,
    borderBottom: `${BorderBottom} solid ${color}`,
    borderLeft: `${borderLeft} solid ${color}`,
});
