import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import useStyles from '@common_typography/style';

const getVariant = (variant) => {
    const variantDefault = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
    ];
    const variantCustom = {
        span: 'caption',
        title: 'h1',
        p: 'body1',
        label: 'caption',
    };
    if (variantDefault.indexOf(variant) > -1) {
        return variant;
    }
    return variantCustom[variant];
};

const CustomTypography = ({
    size = '10',
    variant = 'span',
    type = 'regular',
    className = {},
    children,
    align = 'left',
    letter = '',
    decoration = '',
    color = '',
    ...other
}) => {
    const styles = useStyles();
    const customStyle = classNames(
        styles.root,
        styles[variant],
        styles[type],
        styles[align],
        styles[decoration],
        styles[color],
        styles[`size${size}`],
        styles[`letter${letter}`],
        className,
    );
    const variantType = getVariant(variant);
    return (
        <Typography variant={variantType} align={align} {...other} className={customStyle}>
            {children}
        </Typography>
    );
};

CustomTypography.propTypes = {
    variant: PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'title',
        'label',
        'inherit',
    ]),
    type: PropTypes.oneOf(['bold', 'italic', 'semiBold', 'regular']),
    letter: PropTypes.oneOf(['uppercase', 'capitalize', 'lowercase', 'none']),
    align: PropTypes.oneOf(['top', 'bottom', 'center', 'left', 'right']),
    decoration: PropTypes.oneOf(['underline', 'none']),
    color: PropTypes.oneOf(['red', 'green', 'orange', 'white', 'default', 'gray']),
    size: PropTypes.oneOf(['5', '6', '8', '10', '12', '14', '16', '0']),
};

CustomTypography.defaultProps = {
    variant: 'span',
    type: 'regular',
    align: 'left',
    letter: 'none',
    decoration: 'none',
    color: 'default',
    size: '0',
};

export default CustomTypography;
