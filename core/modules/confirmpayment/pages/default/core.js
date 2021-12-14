import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import formatDate from '@helper_date';
import gqlService, { confirmPayment } from '@core_modules/confirmpayment/services/graphql';

const ConfirmPaymentPage = (props) => {
    const { t, pageConfig, Content } = props;
    const Config = {
        title: t('payment:confirmPayment:label'),
        headerTitle: t('payment:confirmPayment:label'),
        bottomNav: false,
        pageType: 'other',
        header: 'relative',
    };
    const [postConfirmPayment] = confirmPayment();
    const [getBankList, { data: bankList, error: errorBankList }] = gqlService.getPaymentBankList();
    const validationSchema = Yup.object().shape({
        order_number: Yup.string().required(t('payment:confirmPayment:form:validation')),
        payment: Yup.string().required(t('payment:confirmPayment:form:validation')),
        account_number: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        account_name: Yup.string().required(t('payment:confirmPayment:form:validation')),
        amount: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        date: Yup.string().required(t('payment:confirmPayment:form:validation')),
        filename: Yup.string().required(t('payment:confirmPayment:form:validation')),
        image_base64: Yup.string().required(t('payment:confirmPayment:form:validation')),
    });
    const formik = useFormik({
        initialValues: {
            order_number: '',
            payment: '',
            account_number: '',
            account_name: '',
            amount: '',
            date: Date.now(),
            filename: '',
            image_base64: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            window.backdropLoader(true);
            postConfirmPayment({
                variables: {
                    ...values,
                    amount: parseFloat(values.amount),
                    date: formatDate(values.date, 'YYYY-MM-03 HH:mm:ss'),
                },
            }).then(() => {
                window.backdropLoader(true);
                window.toastMessage({
                    open: true,
                    text: t('payment:confirmPayment:confirmSuccess'),
                    variant: 'success',
                });
                resetForm({});
            }).catch((e) => {
                window.backdropLoader(true);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('payment:confirmPayment:confirmFailed'),
                    variant: 'error',
                });
            });
        },

    });

    React.useEffect(() => {
        if (!bankList) {
            getBankList();
        }
    }, [bankList]);

    const handleChangeDate = (date) => {
        formik.setFieldValue('date', date);
    };
    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('image_base64', baseCode);
    };

    if (bankList && !errorBankList) {
        const temporaryData = [];
        bankList.getPaymentBankList.map((item) => {
            const data = {
                value: `${item.bankname} - ${item.banknumber} (${item.placeholder})`,
                label: `${item.bankname} - ${item.banknumber} (${item.placeholder})`,
            };
            temporaryData.push(data);
            return null;
        });
        return (
            <Layout pageConfig={pageConfig || Config} {...props} showRecentlyBar={false}>
                <Content
                    Content={Content}
                    handleChangeDate={handleChangeDate}
                    handleDropFile={handleDropFile}
                    t={t}
                    formik={formik}
                    banks={temporaryData}
                />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={pageConfig || Config} {...props} showRecentlyBar={false}>
            <Content
                Content={Content}
                handleChangeDate={handleChangeDate}
                handleDropFile={handleDropFile}
                t={t}
                formik={formik}
                banks={[]}
            />
        </Layout>
    );
};

export default ConfirmPaymentPage;
