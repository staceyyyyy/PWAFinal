import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import classNames from 'classnames';
import Typography from '@common_typography';
import useStyles from '@common_forms/TextField/style';

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
    footer,
    styleFrameText = {},
    styleTextField = {},
    ...other
}) => {
    const styles = useStyles();
    const customClass = classNames(styles.container, className);
    return (
        <FormControl disabled={disabled} fullWidth={fullWidth} error={error} variant={variant} className={customClass} style={styleFrameText}>
            <InputLabel shrink={shrink} htmlFor={label} className={styles.label}>
                {label}
            </InputLabel>
            <Input id={label} value={value} onChange={onChange} placeholder={placeholder} style={styleTextField} {...other} />
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
