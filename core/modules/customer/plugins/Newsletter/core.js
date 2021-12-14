import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import { subscribeNewsletter } from '@core_modules/customer/services/graphql/schema';

const Newsletter = (props) => {
    const {
        NewsletterView, t, show_firstname, show_lastname,
    } = props;

    const [actSubscribe, result] = useMutation(subscribeNewsletter, {
        context: {
            request: 'internal',
        },
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            ...(show_firstname && { firstname: '' }),
            ...(show_lastname && { lastname: '' }),
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('required'),
            ...(show_firstname && { firstname: Yup.string().required('required') }),
            ...(show_lastname && { lastname: Yup.string().required('required') }),
        }),
        onSubmit: (values) => {
            actSubscribe({
                variables: {
                    email: values.email,
                },
            })
                .then(async (res) => {
                    const data = res.data.subscribe.status;
                    window.toastMessage({
                        open: true,
                        variant: data.response !== 'Failed' ? 'success' : 'error',
                        text: data.message,
                    });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('common:newsletter:emailFormat'),
                    });
                });
        },
    });

    return <NewsletterView formik={formik} loading={result.loading} t={t} {...props} />;
};

export default withApollo({ ssr: true })(withTranslation()(Newsletter));
