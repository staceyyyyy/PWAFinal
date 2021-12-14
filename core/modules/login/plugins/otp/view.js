import Button from '@common_button';
import TextField from '@common_textfield';
import Password from '@common_password';
import Typography from '@common_typography';
import useStyles from '@plugin_otp/style';

const OtpView = (props) => {
    const styles = useStyles();
    const {
        t,
        handleSend,
        phoneProps,
        handlePhone,
        time,
        manySend,
        config,
        codeProps,
        handleOtp,
        handleCheck,
    } = props;
    return (
        <div className={styles.root}>
            <div className={styles.componentContainer}>
                <div className={styles.input}>
                    <TextField label={t('common:form:phoneNumber')} fullWidth {...phoneProps} onChange={handlePhone} />
                </div>
                <div className={styles.button}>
                    <Button fullWidth onClick={handleSend} disabled={!!(!phoneProps.value || phoneProps.value === '' || phoneProps.error)}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white" align="center">
                            {t('common:button:sendOtp')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <>
                {time > 0 && (
                    <Typography variant="p">
                        {`${t('otp:wait')} ${time} ${t('otp:resend')}`}
                    </Typography>
                )}
                {manySend > 1 && (
                    <Typography variant="p">
                        {`${t('otp:sendTimes')} ${manySend - 1} ${t('otp:time')}`}
                    </Typography>
                )}
            </>
            <div className={styles.componentContainer}>
                <div className={styles.input}>
                    <Password
                        label="Code Otp"
                        showVisible={false}
                        showPasswordMeter={false}
                        fullWidth
                        {...codeProps}
                        inputProps={{
                            maxLength: config !== null ? config.maxLength : 4,
                        }}
                        onChange={handleOtp}
                    />
                </div>
                <div className={styles.button}>
                    <Button fullWidth disabled={manySend <= 1} onClick={handleCheck}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white">
                            {t('common:button:verify')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OtpView;
