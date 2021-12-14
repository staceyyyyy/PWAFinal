import Layout from '@layout';
import { useFormik } from 'formik';
import { regexPhone } from '@helper_regex';
import * as Yup from 'yup';
import Router from 'next/router';
import { requestLinkToken, otpConfig } from '../../services/graphql';

const ForgotPassword = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('forgotpassword:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('forgotpassword:title'),
        bottomNav: false,
    };
    const [toast, setToast] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const [useEmail, setUseEmail] = React.useState(false);
    const { loading, data } = otpConfig();
    const [load, setLoad] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [getToken] = requestLinkToken();
    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object().shape({
            email: (useEmail || (data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password))
                && Yup.string().required(t('validate:email:required')),
            phoneNumber:
                !useEmail && data
                && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
            otp: !useEmail && data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && Yup.string().required('Otp is required'),
        }),
        onSubmit: (values) => {
            setLoad(true);
            const getVariables = () => (
                useEmail
                    ? { phoneNumber: '', otp: '', email: values.email }
                    : { phoneNumber: values.phoneNumber, otp: values.otp, email: '' }
            );
            getToken({
                variables: getVariables(),
            })
                .then((res) => {
                    setLoad(false);
                    const { token, message } = res.data.requestLinkForgotPassword;
                    if (token) {
                        setToast({
                            open: true,
                            variant: 'success',
                            text: t('forgotpassword:success'),
                        });
                        setTimeout(() => {
                            Router.push(`/customer/account/newpassword?token=${token}`);
                        }, 3000);
                    } else {
                        setToast({
                            open: true,
                            variant: 'success',
                            text: message || t('forgotpassword:successEmail1') + values.email + t('forgotpassword:successEmail2'),
                        });
                    }
                })
                .catch((e) => {
                    setToast({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('forgotpassword:failed'),
                    });
                    setLoad(false);
                });
        },
    });

    const handleSwitch = () => {
        setToast({ ...toast, open: false });
        setUseEmail(!useEmail);
        if (data && data.otpConfig.otp_enable[0].enable_otp_forgot_password) {
            setDisabled(!disabled);
        }
    };

    React.useEffect(() => {
        if (data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password) {
            setUseEmail(true);
        }
    }, [useEmail]);

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                loading={loading}
                data={data}
                formik={formik}
                load={load}
                useEmail={useEmail}
                handleSwitch={handleSwitch}
                toast={toast}
                setToast={setToast}
                setDisabled={setDisabled}
                disabled={disabled}
            />
        </Layout>
    );
};

export default ForgotPassword;
