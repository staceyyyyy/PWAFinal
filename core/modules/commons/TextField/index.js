import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import classNames from 'classnames';
import Typography from '@common_typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@common_textfield/style';

const CustomTextField = ({
    placeholder = '',
    disabled = false,
    onChange = () => {},
    value = '',
    className = '',
    label = '',
    fullWidth = true,
    shrink = true,
    error = false,
    errorMessage = '',
    variant = 'standard',
    loading = false,
    footer,
    ...other
}) => {
    const styles = useStyles();
    const customClass = classNames(styles.container, className);
    return (
        <FormControl disabled={disabled || loading} fullWidth={fullWidth} error={error} variant={variant} className={customClass}>
            <InputLabel shrink={shrink} htmlFor={label} className={styles.label}>
                {label}
            </InputLabel>
            <Input
                id={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                endAdornment={<>{loading ? <CircularProgress color="inherit" size={20} /> : null}</>}
                {...other}
            />
            {React.isValidElement(footer) ? (
                footer
            ) : (
                <Typography variant="p" color={error ? 'red' : 'default'}>
                    {errorMessage}
                </Typography>
            )}
        </FormControl>
    );
};

export default CustomTextField;
