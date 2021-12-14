/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import TextField from '@common_textfield';
import Typography from '@common_typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import checkPassword from '@helper_passwordstrength';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { storeConfigNameCookie, passwordStrength } from '@config';
import useStyles from '@common_forms/Password/style';

const PasswordField = ({
    label = 'Password',
    value = '',
    onChange = () => {},
    showPasswordMeter = false,
    showVisible = false,
    error = false,
    errorMessage = '',
    ...other
}) => {
    const styles = useStyles();
    const [show, setShow] = React.useState(false);
    const [errorPaswd, setErrorPasswd] = React.useState({
        status: 'No Password',
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    let { numberOfRequiredClass, minValue } = passwordStrength;

    const config = Cookies.getJSON(storeConfigNameCookie);

    if (config && config.customer_password_minimum_password_length) {
        minValue = config.customer_password_minimum_password_length;
    }

    if (config && config.customer_password_required_character_classes_number) {
        numberOfRequiredClass = config.customer_password_required_character_classes_number;
    }

    const handleChange = (event) => {
        onChange(event);
        if (showPasswordMeter) {
            const strength = checkPassword({ value: event.target.value, minValue, numberOfRequiredClass });
            setErrorPasswd(strength);
        }
    };

    return (
        <TextField
            label={label}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            error={error}
            errorMessage={errorMessage}
            footer={
                showPasswordMeter && (
                    <>
                        <div className={styles.passwordStrength}>
                            <Typography
                                variant="p"
                                type="semiBold"
                                className={styles.txtPasswdStr}
                            >
                                Password Strength:
                                {' '}
                                {errorPaswd.status}
                            </Typography>
                            <div
                                className={classNames(
                                    styles.passwdStrPrgsBar,
                                    errorPaswd.status.toLocaleLowerCase()
                                        === 'no password'
                                        ? styles.zeroBar
                                        : errorPaswd.status.toLocaleLowerCase()
                                          === 'weak'
                                            ? styles.per3Bar
                                            : errorPaswd.status.toLocaleLowerCase()
                                          === 'medium'
                                                ? styles.halfBar
                                                : errorPaswd.status.toLocaleLowerCase()
                                          === 'strong'
                                                    ? styles.per7
                                                    : styles.full,
                                )}
                            />
                            <div
                                className={classNames(
                                    styles.passwdStrPrgsCtr,
                                    errorPaswd.status.toLocaleLowerCase()
                                        === 'no password'
                                        ? styles.full
                                        : errorPaswd.status.toLocaleLowerCase()
                                          === 'weak'
                                            ? styles.per7
                                            : errorPaswd.status.toLocaleLowerCase()
                                          === 'medium'
                                                ? styles.half
                                                : errorPaswd.status.toLocaleLowerCase()
                                          === 'strong'
                                                    ? styles.per3
                                                    : styles.zero,
                                )}
                            />
                        </div>
                        <Typography variant="p" type="semiBold" color="red">
                            {errorPaswd.message || ''}
                        </Typography>
                    </>
                )
            }
            endAdornment={
                showVisible && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShow(!show)}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }
            {...other}
        />
    );
};

export default PasswordField;
