import TextField from '@common_textfield';
import Select from '@common_select';
import DropFile from '@common_dropfile';
import Button from '@common_button';
import Typography from '@common_typography';
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateDayJs from '@date-io/dayjs';
import useStyles from '@core_modules/confirmpayment/pages/default/components/style';

const ConfirmPayment = (props) => {
    const {
        t, formik, handleChangeDate, handleDropFile, banks,
    } = props;
    const styles = useStyles();
    return (
        <div className="row">
            <div className="col-md-6 col-xs-12">
                <div className={styles.container}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            name="order_number"
                            label={t('payment:confirmPayment:form:orderNumber')}
                            value={formik.values.order_number}
                            onChange={formik.handleChange}
                            error={!!(formik.errors.order_number && formik.touched.order_number)}
                            errorMessage={(formik.errors.order_number && formik.touched.order_number) ? formik.errors.order_number : null}
                        />
                        {
                            banks.length > 0
                                ? (
                                    <Select
                                        style={{ textTransform: 'capitalize' }}
                                        name="payment"
                                        label={t('payment:confirmPayment:form:bankName')}
                                        value={formik.values.payment}
                                        onChange={formik.handleChange}
                                        options={banks}
                                        error={!!(formik.errors.payment && formik.touched.payment)}
                                        errorMessage={(formik.errors.payment && formik.touched.payment) ? formik.errors.payment : null}
                                    />
                                )
                                : (
                                    <TextField
                                        name="payment"
                                        label={t('payment:confirmPayment:form:bankName')}
                                        value={formik.values.payment}
                                        onChange={formik.handleChange}
                                        error={!!(formik.errors.payment && formik.touched.payment)}
                                        errorMessage={(formik.errors.payment && formik.touched.payment) ? formik.errors.payment : null}
                                    />
                                )
                        }
                        <TextField
                            name="account_number"
                            label={t('payment:confirmPayment:form:bankAccountNumber')}
                            value={formik.values.account_number}
                            onChange={formik.handleChange}
                            error={!!(formik.errors.account_number && formik.touched.account_number)}
                            errorMessage={(formik.errors.account_name && formik.touched.account_number) ? formik.errors.account_number : null}
                        />
                        <TextField
                            name="account_name"
                            label={t('payment:confirmPayment:form:bankAccountName')}
                            value={formik.values.account_name}
                            onChange={formik.handleChange}
                            error={!!(formik.errors.account_name && formik.touched.account_name)}
                            errorMessage={(formik.errors.account_name && formik.touched.account_name) ? formik.errors.account_name : null}
                        />
                        <TextField
                            name="amount"
                            label={t('payment:confirmPayment:form:amountTranfer')}
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={!!(formik.errors.amount && formik.touched.amount)}
                            errorMessage={(formik.errors.amount && formik.touched.amount) ? formik.errors.amount : null}
                        />
                        <DatePicker
                            label={t('payment:confirmPayment:form:tranferDate')}
                            name="date"
                            onChange={handleChangeDate}
                            value={formik.values.date}
                            error={!!(formik.errors.date && formik.touched.date)}
                            fullWidth
                            format="MMMM D, YYYY"
                            className={styles.datePicker}
                        />
                        <DropFile
                            title={t('payment:confirmPayment:form:file')}
                            label={t('payment:confirmPayment:form:labelFile')}
                            acceptedFile=".jpg,.jpeg,.png,.pdf,.gif"
                            multiple={false}
                            error={(
                                (formik.errors.filename && formik.touched.filename)
                                || (formik.errors.image_base64 && formik.touched.image_base64)
                            )}
                            getBase64={handleDropFile}
                        />
                        <div className={styles.footer}>
                            <Button fullWidth className={styles.button} type="submit" on>
                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                    {t('payment:confirmPayment:form:button')}
                                </Typography>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ConfirmPaymentComp = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <ConfirmPayment {...props} />
    </MuiPickersUtilsProvider>
);

export default ConfirmPaymentComp;
