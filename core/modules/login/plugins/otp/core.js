/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useTranslation } from '@i18n';
import {
    requestOtpRegister,
    checkOtpRegister,
    checkOtpForgotPassword,
    requestOtpLogin,
    checkOtpLogin,
    requestOtpForgotPassword,
    otpConfig,
} from '@core_modules/login/services/graphql';

const OtpBlock = ({
    phoneProps, codeProps, type, setDisabled, OtpView,
}) => {
    const { t } = useTranslation(['otp', 'common']);
    const [time, setTime] = React.useState(0);
    const [manySend, setManySend] = React.useState(1);
    const [config, setConfig] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otp, setOtp] = React.useState('');

    const [actRequestOtpRegister] = requestOtpRegister();
    const [actCheckOtpRegister] = checkOtpRegister();
    const [actRequestForgotPassword] = requestOtpForgotPassword();
    const [actCheckOtpForgotPassword] = checkOtpForgotPassword();
    const [actRequestOtpLogin] = requestOtpLogin();
    const [actCheckOtpLogin] = checkOtpLogin();

    const { loading, data } = otpConfig();

    React.useEffect(() => {
        setPhoneNumber(phoneProps.value);
    }, [phoneProps.value]);

    React.useEffect(() => {
        setOtp(codeProps.value);
    }, [codeProps.value]);

    const handlePhone = (event) => {
        phoneProps.onChange && phoneProps.onChange(event);
    };

    const handleOtp = (event) => {
        codeProps.onChange && codeProps.onChange(event);
    };

    const handleSend = () => {
        let sendOtp = () => {};
        if (type === 'register') {
            sendOtp = actRequestOtpRegister;
        } else if (type === 'forgotPassword') {
            sendOtp = actRequestForgotPassword;
        } else if (type === 'login') {
            sendOtp = actRequestOtpLogin;
        }
        const maxSend = config && config.maxTry ? config.maxTry : 3;
        if (manySend > maxSend) {
            window.toastMessage({
                open: true,
                text: t('otp:maxSend'),
                variant: 'warning',
            });
        } else if (time <= 0) {
            window.backdropLoader(true);
            sendOtp({
                variables: {
                    phoneNumber,
                },
            }).then(() => {
                window.backdropLoader(false);
                setManySend(manySend + 1);
                // eslint-disable-next-line no-nested-ternary
                setTime(config && config.expired ? config.expired : 60);
                window.toastMessage({
                    open: true,
                    text: t('otp:sendSuccess'),
                    variant: 'success',
                });
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('otp:sendFailed'),
                    variant: 'error',
                });
            });
        } else {
            window.toastMessage({
                open: true,
                variant: 'success',
                text: `${t('otp:wait')} ${time} ${t('otp:resend')}`,
            });
        }
    };

    const handleCheck = () => {
        window.backdropLoader(true);
        let checkOtp = () => {};
        if (type === 'register') {
            checkOtp = actCheckOtpRegister;
        } else if (type === 'forgotPassword') {
            checkOtp = actCheckOtpForgotPassword;
        } else if (type === 'login') {
            checkOtp = actCheckOtpLogin;
        }

        checkOtp({
            variables: {
                phoneNumber,
                otp,
            },
        }).then((res) => {
            window.backdropLoader(false);
            let isValid;
            if (type === 'register') isValid = res.data.checkOtpRegister.is_valid_otp;
            if (type === 'forgotPassword') isValid = res.data.checkOtpForgotPassword.is_valid_otp;
            if (type === 'login') isValid = res.data.checkOtpLogin.is_valid_otp;
            if (isValid) {
                setDisabled(false);
                window.toastMessage({
                    variant: 'success',
                    open: true,
                    text: t('otp:valid'),
                });
            } else {
                setDisabled(true);
                window.toastMessage({
                    variant: 'error',
                    open: true,
                    text: t('otpLinvalid'),
                });
            }
        }).catch(() => {
            setDisabled(true);
            window.backdropLoader(false);
            window.toastMessage({
                variant: 'error',
                open: true,
                text: t('otpLinvalid'),
            });
        });
    };

    React.useEffect(() => {
        if (!loading && data && data.otpConfig && config === null) {
            switch (type) {
            case 'register':
                setConfig({
                    maxLength: data.otpConfig.otp_length[0].length_otp_register || 4,
                    maxTry: data.otpConfig.otp_max_try[0].max_try_otp_register || 3,
                    expired: data.otpConfig.otp_expired_time[0].expired_time_otp_register || 60,
                });
                break;
            case 'login':
                setConfig({
                    maxLength: data.otpConfig.otp_length[0].length_otp_login || 4,
                    maxTry: data.otpConfig.otp_max_try[0].max_try_otp_login || 3,
                    expired: data.otpConfig.otp_expired_time[0].expired_time_otp_login || 60,
                });
                break;
            case 'forgotPassword':
                setConfig({
                    maxLength: data.otpConfig.otp_length[0].length_otp_forgot_password || 4,
                    maxTry: data.otpConfig.otp_max_try[0].max_try_otp_forgot_password || 3,
                    expired: data.otpConfig.otp_expired_time[0].expired_time_otp_forgot_password || 60,
                });
                break;

            default:
                setConfig(null);
                break;
            }
        }
        if (!time) return;
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        // eslint-disable-next-line consistent-return
        return () => clearInterval(intervalId);
    }, [time, data]);

    return (
        <OtpView
            t={t}
            handleSend={handleSend}
            phoneProps={phoneProps}
            handlePhone={handlePhone}
            time={time}
            manySend={manySend}
            config={config}
            codeProps={codeProps}
            handleOtp={handleOtp}
            handleCheck={handleCheck}
        />
    );
};

OtpBlock.propTypes = {
    phoneProps: PropTypes.object,
    codeProps: PropTypes.object,
    type: PropTypes.oneOf(['login', 'register', 'forgotPassword']).isRequired,
};

OtpBlock.defaultProps = {
    phoneProps: {},
    codeProps: {},
};

export default OtpBlock;
