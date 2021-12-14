import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@layout';
import Router from 'next/router';
import { newPassword } from '@core_modules/customer/services/graphql';

const NewPassword = (props) => {
    const {
        t, Content, pageConfig, query: { token },
    } = props;
    const config = {
        title: t('customer:newPassword:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:newPassword:title'),
        bottomNav: false,
    };
    const [disabled, setdisabled] = React.useState(false);
    const [setNewPassword] = newPassword();
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required(t('validate:password:required')),
            confirmPassword: Yup.string()
                .required(t('validate:confirmPassword:required'))
                // eslint-disable-next-line no-use-before-define
                .test('check-pass', t('validate:confirmPassword.wrong'), (input) => input === formik.values.password),
        }),
        onSubmit: (values) => {
            setdisabled(true);
            window.backdropLoader(true);
            setNewPassword({
                variables: {
                    ...values,
                    token,
                },
            })
                .then(async () => {
                    window.backdropLoader(false);
                    setdisabled(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: t('customer:newPassword:success'),
                    });
                    setTimeout(() => {
                        Router.push('/customer/account/login');
                    }, 3000);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setdisabled(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:newPassword:failed'),
                    });
                });
        },
    });

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content t={t} formik={formik} disabled={disabled} />
        </Layout>
    );
};

export default NewPassword;
