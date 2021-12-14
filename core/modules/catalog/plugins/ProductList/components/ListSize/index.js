/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from 'classnames';
import Typography from '@common_typography';
import { GRAY_SECONDARY, WHITE, GRAY_PRIMARY } from '@theme_color';
import { Centering, CreateBorder } from '@theme_mixins';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        borderRadius: 100,
        ...CreateBorder('1px', '1px', '1px', '1px', GRAY_SECONDARY),
        ...Centering,
    },
    label: {
        fontSize: 8,
    },
    disabledBox: {
        position: 'absolute',
        width: '6px',
        height: '100%',
        borderLeft: '2px solid #fff',
        borderRight: '2px solid #fff',
        background: 'red',
        margin: '0 auto',
        transform: 'rotate(45deg)',
    },
}));

const ListSize = ({
    onClick = () => {},
    data = 'm',
    width = 20,
    className = {},
    code = 'size',
    value = '',
    disabled = false,
}) => {
    const classes = useStyles();
    const styles = {
        cursor: disabled ? 'default' : 'pointer',
        minWidth: width,
        height: width,
        background: disabled ? GRAY_PRIMARY : WHITE,
        padding: '4px',
    };

    if (value === data) {
        styles.border = '1px solid #000';
    }

    const customClass = classNames(classes.root, className);

    return (
        <span
            className={customClass}
            style={styles}
            onClick={() => (!disabled ? onClick(code, data) : null)}
        >
            {disabled ? <div className={classes.disabledBox} /> : null}
            <Typography
                variant="label"
                letter="uppercase"
                className={classes.label}
            >
                {data}
            </Typography>
        </span>
    );
};

export default ListSize;
