import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from '@common_select/style';

const Select = ({
    label = '', name = '', value = null, onChange = () => {},
    options = [], helperText = 'Please Select', className = '',
    error = false, errorMessage = '', showLabel = true, ...other
}) => {
    const styles = useStyles();
    const rootClasss = classNames(styles.root, className);
    return (
        <TextField
            id={name}
            select
            label={showLabel && label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            className={rootClasss}
            {...other}
            placeholder={helperText}
            error={error}
            helperText={error && (
                <Typography variant="span" color={error ? 'red' : 'default'}>
                    {errorMessage}
                </Typography>
            )}
        >
            <MenuItem disabled selected>
                {helperText}
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default Select;
