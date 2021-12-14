/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: 100,
    },
    disabledBox: {
        width: '6px',
        height: '100%',
        borderLeft: '2px solid #fff',
        borderRight: '2px solid #fff',
        background: 'red',
        margin: '0 auto',
        transform: 'rotate(45deg)',
    },
}));

const ListColor = ({
    onClick = () => {},
    color = '#000',
    size = 20,
    className = {},
    value = '',
    disabled = false,
}) => {
    const classes = useStyles();
    const styles = {
        cursor: disabled ? 'default' : 'pointer',
        width: size,
        height: size,
        backgroundColor: color,
    };

    if (value === color) {
        styles.border = '1px solid #000';
    }

    const customClass = classNames(classes.root, className);

    return (
        <div className={customClass} style={styles} onClick={() => (!disabled ? onClick('color', color) : null)}>
            {disabled ? <div className={classes.disabledBox} /> : null}
        </div>
    );
};

export default ListColor;
