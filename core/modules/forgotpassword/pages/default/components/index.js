import Typography from '@common_typography';
import Button from '@common_button';
import TextField from '@common_textfield';
import Toast from '@common_toast';

import Loading from '@common_loaders/Backdrop';
import OtpBlock from '@plugin_otp';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import useStyles from '@core_modules/forgotpassword/pages/default/components/style';

const ForgotPassword = (props) => {
    const styles = useStyles();
    const {
        t, loading, data, formik, load, useEmail, handleSwitch, toast, setToast, setDisabled, disabled,
    } = props;

    if (loading || !data) return <Loading open />;

    return (
        <div className="row">
            <div className="col-xs-12 col-md-6">
                <form className={styles.container} onSubmit={formik.handleSubmit}>
                    <Loading open={load} />
                    {data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && (
                        <FormControlLabel
                            control={<Switch checked={useEmail} onChange={handleSwitch} name="useOtp" color="primary" />}
                            className={styles.switch}
                            label={t('forgotpassword:useEmail')}
                        />
                    )}
                    {
                        useEmail ? toast.open && (
                            <Toast
                                autoHideDuration={null}
                                open={toast.open}
                                setOpen={() => setToast({ ...toast, open: false })}
                                message={toast.text}
                                variant={toast.variant}

                            />
                        )
                            : (
                                <Toast
                                    open={toast.open}
                                    setOpen={() => setToast({ ...toast, open: false })}
                                    message={toast.text}
                                    variant={toast.variant}
                                />
                            )
                    }
                    {(useEmail || (data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password)) && (
                        <>
                            <Typography variant="span" align="left">
                                {t('forgotpassword:content')}
                            </Typography>
                            <TextField
                                label="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={!!formik.errors.email}
                                errorMessage={formik.errors.email || null}
                            />
                        </>
                    )}
                    {(data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && !useEmail) && (
                        <OtpBlock
                            setDisabled={setDisabled}
                            type="forgotPassword"
                            phoneProps={{
                                name: 'phoneNumber',
                                value: formik.values.phoneNumber,
                                onChange: formik.handleChange,
                                error: !!formik.errors.phoneNumber,
                                errorMessage: formik.errors.phoneNumber || null,
                            }}
                            codeProps={{
                                name: 'otp',
                                value: formik.values.otp,
                                onChange: formik.handleChange,
                                error: !!formik.errors.otp,
                                errorMessage: formik.errors.otp || null,
                            }}
                        />
                    )}
                    <Button
                        disabled={data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && (disabled || load)}
                        className={styles.btn}
                        fullWidth
                        type="submit"
                    >
                        <Typography variant="span" type="bold" letter="uppercase" color="white">
                            {t('common:button:send')}
                        </Typography>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
