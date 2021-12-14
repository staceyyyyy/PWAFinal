/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from 'classnames';
import useStyles from '@common_buttonqty/style';

const ButtonQty = ({
    value = 1, onChange, max = 100, disabled = false,
}) => {
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(value);
    const handleMinus = () => {
        if (!disabled && localValue > 1 && localValue <= max) {
            if (onChange) {
                onChange(localValue - 1);
            }
            setLocalValue(parseInt(localValue, 0) - 1);
        }
    };
    const handlePlus = () => {
        if (!disabled && localValue > 0 && localValue < max) {
            if (onChange) {
                onChange(localValue + 1);
            }
            setLocalValue(parseInt(localValue, 0) + 1);
        }
    };

    const handleLocalChange = (event) => {
        const val = parseInt(event.target.value, 0);
        if (val < 1) {
            window.toastMessage({
                open: true,
                text: 'Min input 1',
                variant: 'error',
            });
        } else if (val > max) {
            window.toastMessage({
                open: true,
                text: `Max input ${max}`,
                variant: 'error',
            });
        } else {
            if (onChange) {
                onChange(val);
            }
            setLocalValue(parseInt(val, 0));
        }
    };
    const disabledMin = disabled || localValue === 1;
    const disableMax = disabled || localValue === max;
    return (
        <div className={styles.box}>
            <div className={classNames(styles.minus, disabledMin ? styles.disabled : '')} onClick={handleMinus}>-</div>
            <input disabled={disabled} value={localValue} className={styles.input} type="number" onChange={handleLocalChange} />
            <div className={classNames(styles.plus, disableMax ? styles.disabled : '')} onClick={handlePlus}>+</div>
        </div>
    );
};

export default ButtonQty;
