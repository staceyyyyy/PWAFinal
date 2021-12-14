/* eslint-disable no-nested-ternary */

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        borderStyle: (props) => props.border_style || 'solid',
        backgroundPosition: (props) => props.background_position,
        backgroundColor: (props) => props.background_color || 'transparent',
        borderColor: (props) => props.border_color || 'transparent',
        borderWidth: (props) => `${props.border_top_width || 0}px ${props.border_right_width || 0}px ${props.border_bottom_width || 0}px ${
            props.border_left_width || 0
        }px` || '0 0 0 0',
        margin: (props) => `${props.margin_top || 0}px ${props.margin_right || 0}px ${props.margin_bottom || 0}px ${props.margin_left || 0
        }px ` || '0 0 0 0',
        padding: (props) => `${props.padding_top || 0}px ${props.padding_right || 0}px ${props.padding_bottom || 0}px ${props.padding_left || 0
        }px` || '0 0 0 0',
    },
    button: (props) => ({
        transition: 'all 0.2s ease-in-out',
        backgroundPosition: props.background_position,
        color: props.button_color || '#000000',
        fontSize: props.button_size === 'xs'
            ? '11px'
            : props.button_size === 'sm'
                ? '12px'
                : props.button_size === 'md'
                    ? '14px'
                    : props.button_size === 'lg'
                        ? '17px'
                        : props.button_size === 'xl'
                            ? '21px'
                            : '12px',
        padding: props.button_size === 'xs'
            ? '8px 12px'
            : props.button_size === 'sm'
                ? '11px 16px'
                : props.button_size === 'md'
                    ? '15px 21px'
                    : props.button_size === 'lg'
                        ? '20px 27px'
                        : props.button_size === 'xl'
                            ? '26px 34px'
                            : '11px 16px',
        boxShadow: props.button_style === '3d' ? `0 5px 0 ${props.box_shadow_color}` : 'none',
        borderStyle: props.button_border_style,
        borderWidth: props.button_border_width ? `${props.button_border_width}px` : 0,
        borderRadius: props.button_border_radius ? `${props.button_border_radius}px` : '5px',
        borderColor: props.button_border_color || 'transparent',
        backgroundColor: props.button_background_color || '#e3e3e3',
        ...(props.full_width && { width: '100%' }),
        ...(props.button_style === 'gradient' && (props.gradient_color_1 || props.gradient_color_2) && {
            backgroundImage: `
                linear-gradient(to right, ${props.gradient_color_1} 0, ${props.gradient_color_2} 50%, ${props.gradient_color_1} 100%)
            `,
            backgroundSize: '200% 100%',
        }),
        '& .magezon-icon': {
            margin: props.button_size === 'xs'
                ? '0px 4px'
                : props.button_size === 'sm'
                    ? '0px 6px'
                    : props.button_size === 'md'
                        ? '0px 9px'
                        : props.button_size === 'lg'
                            ? '0px 13px'
                            : props.button_size === 'xl'
                                ? '0px 15px'
                                : '0px 6px',
        },
        '&:hover': {
            color: props.button_hover_color || '#333333',
            backgroundColor: props.button_hover_background_color
                ? props.button_hover_background_color
                : props.button_background_color
                    ? props.button_background_color
                    : '#e3e3e3',
            borderColor: props.button_hover_border_color || 'transparent',
            ...(props.button_style === 'gradient' && (props.gradient_color_1 || props.gradient_color_2) && {
                backgroundPosition: '100% 0',
            }),
            '& .magezon-icon': {
                '& i': {
                    color: props.button_hover_color || '#333333',
                },
            },
        },
    }),
    mgzMessageBox: {
        '& > .magezone-icon .wrapperIcon': {
            fontSize: '1em',
            fontStyle: 'normal',
            fontWeight: 400,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '3.6em',
            marginLeft: 0,
            marginRight: 0,
        },
        '& > .magezone-icon .wrapperIcon i': {
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            lineHeight: 1,
            fontSize: (props) => props.icon_size,
        },
        '& > .magezone-icon .wrapperIcon, .magezone-icon .wrapperIcon i': {
            color: (props) => props.message_icon_color,
            backgroundColor: (props) => props.message_icon_background_color,
        },
    },
    wrapper: {
        '&.xs-hide': {
            '@media (max-width: 575px)': {
                display: 'none !important',
            },
        },
        '&.sm-hide': {
            '@media (min-width: 576px) and (max-width: 767px)': {
                display: 'none !important',
            },
        },
        '&.md-hide': {
            '@media (min-width: 768px) and (max-width: 991px)': {
                display: 'none !important',
            },
        },
        '&.lg-hide': {
            '@media (min-width: 992px) and (max-width: 1200px)': {
                display: 'none !important',
            },
        },
        '&.xl-hide': {
            '@media (min-width: 1200px)': {
                display: 'none !important',
            },
        },
    },
}));

export default useStyles;
