/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@common_textfield';
import PasswordField from '@common_password';
import Button from '@common_button';
import Typography from '@common_typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import OtpBlock from '@plugin_otp';
import OtpView from '@plugin_otp/view';
import useStyles from '@core_modules/login/pages/default/components/style';

const Login = (props) => {
    const {
        formik,
        otpConfig,
        isOtp,
        setIsOtp,
        t,
        setDisabled,
        disabled,
        loading,
        formikOtp,
        toastMessage,
        socialLoginMethodData,
        socialLoginMethodLoading,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
        query,
    } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');

    const signInOptions = [];

    if (firebase && firebase.auth && socialLoginMethodData && socialLoginMethodData.length > 0) {
        for (let idx = 0; idx < socialLoginMethodData.length; idx += 1) {
            const code = socialLoginMethodData[idx];
            if (code.match(/google/i) && firebase.auth.GoogleAuthProvider && firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
            }

            if (code.match(/facebook/i) && firebase.auth.FacebookAuthProvider && firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.FacebookAuthProvider.PROVIDER_ID);
            }

            if (code.match(/twitter/i) && firebase.auth.TwitterAuthProvider && firebase.auth.TwitterAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);
            }

            if (code.match(/github/i) && firebase.auth.GithubAuthProvider && firebase.auth.GithubAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
            }

            if (code.match(/email/i) && firebase.auth.EmailAuthProvider && firebase.auth.EmailAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.EmailAuthProvider.PROVIDER_ID);
            }
        }
    }

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions,
        callbacks: {
            signInSuccess: () => false,
        },
    };

    const FirebaseSocialLogin = () => {
        if (firebase.app()) {
            try {
                return !socialLoginMethodLoading && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
            } catch {
                return null;
            }
        }
    };

    return (
        <div className={styles.container}>
            {!desktop && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                <FormControlLabel
                    control={<Switch checked={isOtp} onChange={() => setIsOtp(!isOtp)} name="useOtp" color="primary" />}
                    className={classNames(styles.selectLogin, 'hidden-desktop')}
                    label={t('login:switchPhone')}
                />
            )}
            <div className={classNames('row between-sm between-md between-lg', styles.desktopContainer)}>
                <div className="col-sm-12 col-md-12 col-lg-12 hidden-mobile">
                    <Typography type="bold" variant="h1" className={styles.title}>
                        {t('login:customerLogin')}
                    </Typography>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-sm-12 hidden-mobile">
                            <div className={styles.headerSpan}>
                                <Typography variant="span" className="clear-margin-padding" letter="uppercase">
                                    {t('login:registerCustomer')}
                                </Typography>
                            </div>
                        </div>
                        {(!isOtp || desktop) && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className={classNames(styles.spanLabel, 'hidden-mobile')}>
                                    <Typography type="bold" variant="p" className="clear-margin-padding">
                                        {t('login:loginInformation')}
                                    </Typography>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <TextField
                                                name="username"
                                                label="Email"
                                                placeholder="john.doe@gmail.com"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                error={!!formik.errors.username}
                                                errorMessage={formik.errors.username || null}
                                            />
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <PasswordField
                                                name="password"
                                                label="Password"
                                                placeholder="********"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                error={!!formik.errors.password}
                                                errorMessage={formik.errors.password || null}
                                                showVisible
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <>
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                                </>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={desktop ? false : disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('login:pageTitle')}
                                                </Typography>
                                            </Button>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <FirebaseSocialLogin />
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Button
                                                fullWidth={false}
                                                variant="text"
                                                href="/customer/account/forgotpassword"
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                                                    {t('login:forgotPassword')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 hidden-mobile">
                            <div className={classNames('row middle-sm', styles.spanDivider)}>
                                <div className="col-sm-12">
                                    <Divider />
                                </div>
                            </div>
                        </div>
                        {(isOtp || desktop) && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className={classNames(styles.spanLabel, 'hidden-mobile')}>
                                    <Typography type="bold" variant="p" className="clear-margin-padding">
                                        {t('login:loginOtpInformation')}
                                    </Typography>
                                </div>
                                <form onSubmit={formikOtp.handleSubmit} className={styles.formOtp}>
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12">
                                            <OtpBlock
                                                setDisabled={setDisabled}
                                                type="login"
                                                OtpView={OtpView}
                                                phoneProps={{
                                                    name: 'username',
                                                    placeholder: '+6281234xxxx',
                                                    value: formikOtp.values.username,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!formikOtp.errors.username,
                                                    errorMessage: formikOtp.errors.username || null,
                                                }}
                                                codeProps={{
                                                    name: 'otp',
                                                    value: formikOtp.values.otp,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!(formikOtp.touched.otp && formikOtp.errors.otp),
                                                    errorMessage: (formikOtp.touched.otp && formikOtp.errors.otp) || null,
                                                }}
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <>
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                                </>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('common:button:submit')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 hidden-mobile">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={styles.headerSpan}>
                                <Typography className="clear-margin-padding" variant="span" letter="uppercase">
                                    {t('login:newCustomer')}
                                </Typography>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Typography variant="p">{t('login:registerInformation')}</Typography>
                        </div>
                        <div className="col-sm-12">
                            <Button
                                className={styles.generalButton}
                                fullWidth={false}
                                href={
                                    (query && query.redirect)
                                        ? `/customer/account/create?redirect=${query.redirect}`
                                        : '/customer/account/create'
                                }
                                disabled={desktop ? false : disabled}
                                align={desktop ? 'left' : 'center'}
                            >
                                <Typography color="white" variant="span" type="bold" letter="uppercase">
                                    {t('login:registerTitle')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
                {toastMessage}
            </div>
            <style jsx global>
                {`
                    .firebaseui-container {
                        display: flex !important;
                        flex-direaction: column !important;
                        justify-content: flex-start !important;
                        max-width: 100% !important;
                    }

                    .firebaseui-card-content {
                        padding: 0px !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Login;
