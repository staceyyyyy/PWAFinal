/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Image from '@common_image';
import Select from '@common_select';
import Typography from '@common_typography';
import useStyles from '@core_modules/product/plugins/OptionItem/AwGiftCardProduct/styles';
import DateDayJs from '@date-io/dayjs';
import { formatPrice } from '@helper_currency';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Footer from '@plugin_optionitem/components/Footer';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/index';

const AwGiftCardProduct = (props) => {
    const {
        data,
        qty = 1,
        setQty = () => {},
        handleAddToCart = () => {},
        t,
        loading = false,
        disabled = false,
        showQty = true,
        showAddToCart = true,
        formik,
        storeConfig,
        ...other
    } = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const styles = useStyles();

    // prettier-ignore
    const {
        aw_gc_allow_delivery_date, aw_gc_allow_open_amount,
        aw_gc_custom_message_fields, aw_gc_amounts, aw_gc_description,
        aw_gc_open_amount_max, aw_gc_open_amount_min, aw_gc_type,
    } = data;

    const emailTemplates = data?.aw_gc_email_templates || [];
    const amountList = aw_gc_amounts.map((amount) => ({
        label: formatPrice(amount),
        value: amount,
    }));
    if (aw_gc_allow_open_amount) {
        amountList.push({ label: 'Enter Custom Amount', value: 'custom' });
    }
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [selectedCustomAmount, setselectedCustomAmount] = useState(aw_gc_amounts[0]);

    const handleSelectTemplate = (e) => {
        const templateValue = e.currentTarget.dataset.template;
        const imgTemplate = emailTemplates.find((template) => template.value === templateValue).image_url;
        setSelectedTemplate({ value: templateValue, image: imgTemplate });
        formik.setFieldValue('aw_gc_template', templateValue);
    };

    const handleChangeSelect = (e) => {
        setselectedCustomAmount(e.target.value);
    };

    const handlePreview = () => {
        formik.setFieldTouched('aw_gc_recipient_name');
        formik.setFieldTouched('aw_gc_recipient_email');
        formik.setFieldTouched('aw_gc_sender_name');
        formik.setFieldTouched('aw_gc_sender_email');
        formik.setFieldTouched('aw_gc_template');
        if (aw_gc_allow_open_amount) {
            formik.setFieldTouched('aw_gc_custom_amount');
        }

        if (formik.isValid) {
            setOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChangeDate = (date) => {
        formik.setFieldValue('aw_gc_delivery_date', date);
    };

    return (
        <div className="gc-detailview">
            {aw_gc_description && (
                <div className="hidden-mobile">
                    <MagezonElement content={aw_gc_description} storeConfig={storeConfig} />
                </div>
            )}
            {(aw_gc_allow_open_amount || aw_gc_amounts.length > 1) && (
                <div className="gc-first">
                    <Typography variant="h2">{`1. ${t('validate:chooseAmount')}`}</Typography>
                    <div className="row" style={{ margin: 10 }}>
                        <Select
                            name="aw_gc_amount"
                            options={amountList}
                            value={selectedCustomAmount}
                            onChange={handleChangeSelect}
                            fullWidth={false}
                        />
                        {selectedCustomAmount === 'custom' && (
                            <TextField
                                name="aw_gc_custom_amount"
                                placeholder={`${aw_gc_open_amount_min} - ${aw_gc_open_amount_max}`}
                                fullWidth={false}
                                onChange={formik.handleChange}
                                value={formik.values.aw_gc_custom_amount}
                                error={!!(formik.touched.aw_gc_custom_amount && formik.errors.aw_gc_custom_amount)}
                                errorMessage={(formik.touched.aw_gc_custom_amount && formik.errors.aw_gc_custom_amount) || null}
                            />
                        )}
                    </div>
                </div>
            )}
            {aw_gc_type !== 'PHYSICAL' && (
                <div className="gc-first">
                    <Typography variant="h2">
                        {aw_gc_allow_open_amount || aw_gc_amounts.length > 1 ? '2.' : '1.'} {`${t('validate:selectDesign')}`}
                    </Typography>
                    <div className="row">
                        {emailTemplates.map((template, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={classnames('col-xs-12 col-sm-6 col-md-4 template-option', {
                                        'template-selected': selectedTemplate.value === template.value,
                                    })}
                                    onClick={handleSelectTemplate}
                                    data-template={template.value}
                                >
                                    <Image src={template.image_url} width={150} height={112} />
                                </div>
                            );
                        })}
                        {!!(formik.touched.aw_gc_template && formik.errors.aw_gc_template) && (
                            <Typography variant="p" color="red">
                                {formik.errors.aw_gc_template}
                            </Typography>
                        )}
                    </div>
                </div>
            )}
            <div className="gc-second">
                <Typography variant="h2">
                    {aw_gc_type === 'PHYSICAL'
                        ? (aw_gc_allow_open_amount || aw_gc_amounts.length > 1)
                            ? '2.'
                            : '1.'
                        : aw_gc_allow_open_amount
                            ? '3.'
                            : '2.'}
                    {' '}
                    {`${t('validate:composeEmail')}`}
                </Typography>
                <form>
                    {aw_gc_allow_delivery_date && (
                        <DatePicker
                            fullWidth
                            label={t('common:form:Delivery Date')}
                            name="aw_gc_delivery_date"
                            value={formik.values.aw_gc_delivery_date}
                            onChange={handleChangeDate}
                            error={!!(formik.touched.aw_gc_delivery_date && formik.errors.aw_gc_delivery_date)}
                            helperText={(formik.touched.aw_gc_delivery_date && formik.errors.aw_gc_delivery_date) || null}
                        />
                    )}
                    <div className="row">
                        <TextField
                            className="textfield col-xs-12 col-md-6"
                            name="aw_gc_recipient_name"
                            label={`${t('validate:to')}*`}
                            placeholder={t('validate:recipientName')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_recipient_name}
                            error={!!(formik.touched.aw_gc_recipient_name && formik.errors.aw_gc_recipient_name)}
                            errorMessage={(formik.touched.aw_gc_recipient_name && formik.errors.aw_gc_recipient_name) || null}
                        />
                        <TextField
                            className="textfield col-xs-12 col-md-6"
                            name="aw_gc_sender_name"
                            label={`${t('validate:from')}*`}
                            placeholder={t('validate:senderName')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_sender_name}
                            error={!!(formik.touched.aw_gc_sender_name && formik.errors.aw_gc_sender_name)}
                            errorMessage={(formik.touched.aw_gc_sender_name && formik.errors.aw_gc_sender_name) || null}
                        />
                    </div>
                    <div className="row">
                        <TextField
                            className="textfield col-xs-12 col-md-6"
                            name="aw_gc_recipient_email"
                            placeholder={t('validate:recipientEmail')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_recipient_email}
                            error={!!(formik.touched.aw_gc_recipient_email && formik.errors.aw_gc_recipient_email)}
                            errorMessage={(formik.touched.aw_gc_recipient_email && formik.errors.aw_gc_recipient_email) || null}
                        />
                        <TextField
                            className="textfield col-xs-12 col-md-6"
                            name="aw_gc_sender_email"
                            placeholder={t('validate:senderEmail')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_sender_email}
                            error={!!(formik.touched.aw_gc_sender_email && formik.errors.aw_gc_sender_email)}
                            errorMessage={(formik.touched.aw_gc_sender_email && formik.errors.aw_gc_sender_email) || null}
                        />
                    </div>

                    {aw_gc_custom_message_fields && (
                        <div>
                            {aw_gc_custom_message_fields === 1 && (
                                <>
                                    <TextField
                                        name="aw_gc_headline"
                                        label="Headline"
                                        placeholder="Enter your headline here (optional)"
                                        onChange={formik.handleChange}
                                        value={formik.values.aw_gc_headline}
                                    />
                                    <TextField
                                        name="aw_gc_message"
                                        label="Message"
                                        placeholder="Enter your Gift Card message here (optional)"
                                        multiline
                                        rows={4}
                                        onChange={formik.handleChange}
                                        value={formik.values.aw_gc_message}
                                    />
                                </>
                            )}
                            {aw_gc_custom_message_fields === 2 && (
                                <TextField
                                    name="aw_gc_headline"
                                    label="Headline"
                                    placeholder="Enter your headline here (optional)"
                                    onChange={formik.handleChange}
                                    value={formik.values.aw_gc_headline}
                                />
                            )}
                            {aw_gc_custom_message_fields === 3 && (
                                <TextField
                                    name="aw_gc_message"
                                    label="Message"
                                    placeholder="Enter your Gift Card message here (optional)"
                                    multiline
                                    rows={4}
                                    onChange={formik.handleChange}
                                    value={formik.values.aw_gc_message}
                                />
                            )}
                        </div>
                    )}
                    {aw_gc_type !== 'PHYSICAL' && (
                        <div className="gc-previewButton-container">
                            <Button className="gc-previewButton" onClick={handlePreview}>
                                <Typography color="white" type="bold">
                                    Preview
                                </Typography>
                            </Button>
                        </div>
                    )}
                </form>
            </div>
            <Footer
                loading={loading}
                disabled={disabled}
                showQty={showQty}
                handleAddToCart={handleAddToCart}
                qty={qty}
                setQty={setQty}
                t={t}
                showAddToCart={showAddToCart}
                {...other}
            />
            <Dialog open={open} onClose={handleCloseDialog} fullWidth>
                <DialogTitle classes={{ root: styles.root }} onClose={handleCloseDialog}>
                    <IconButton onClick={handleCloseDialog}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="gc-dialog-content">
                        <div className="gc-dialog-content-inner">
                            <div className="gc-dialog-image">
                                <Image src={selectedTemplate.image} width={280} height={175} />
                            </div>
                            <Typography variant="h1">GIFT CARD</Typography>
                            <div className="gc-dialog-storelogo">
                                <img
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                    width={240}
                                    height={104}
                                    alt={storeConfig.logo_alt}
                                />
                            </div>
                            <div className="gc-dialog-card-details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Typography>From:</Typography>
                                            </td>
                                            <td>
                                                <Typography>{formik.values.aw_gc_recipient_name}</Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>To:</Typography>
                                            </td>
                                            <td>
                                                <Typography>{formik.values.aw_gc_sender_name}</Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>Value:</Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {selectedCustomAmount === 'custom'
                                                        ? formatPrice(Number(formik.values.aw_gc_custom_amount))
                                                        : formatPrice(selectedCustomAmount)}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography> Gift Card Code:</Typography>
                                            </td>
                                            <td className="gc-dialog-card-details-giftcardcode">
                                                <Typography> XXXXXXXXXXXX</Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Button className="gc-dialog-card-details-button" onClick={() => router.push(`${storeConfig.base_url}`)}>
                                <Typography variant="h2" color="white">
                                    Shop Now
                                </Typography>
                            </Button>
                            <Typography>Apply on shopping cart page.</Typography>
                        </div>
                        <div className="gc-dialog-message">
                            {formik.values.aw_gc_headline && (
                                <Typography variant="h2" type="bold">
                                    {formik.values.aw_gc_headline}
                                </Typography>
                            )}
                            {formik.values.aw_gc_message && <Typography>{formik.values.aw_gc_message}</Typography>}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <style jsx>
                {`
                    .template-option {
                        border: 2px solid transparent;
                    }
                    .template-selected {
                        border-color: #62bcf7;
                    }
                    .gc-detailview .row {
                        margin-left: 0;
                        margin-right: 0;
                    }
                    .gc-first {
                        margin-bottom: 20px;
                    }
                    .gc-second form {
                        margin: 10px;
                    }
                    .gc-dialog-content {
                        background-color: #e1e1e1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .gc-dialog-content-inner {
                        background-color: #f5f5f5;
                        padding: 20px 0;
                        width: 80%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .gc-dialog-message {
                        background-color: #ffffff;
                        display: flex;
                        flex-direction: column;
                        padding: 0 20px;
                        align-items: center;
                        width: 80%;
                        text-align: center;
                    }
                    @media screen and (max-width: 600px) {
                        .gc-dialog-content-inner {
                            width: 100%;
                        }
                        .gc-dialog-message {
                            width: 100%;
                        }
                    }
                    .gc-dialog-image {
                        width: 280px;
                        margin-bottom: 20px;
                    }
                    .gc-dialog-storelogo {
                        display: flex;
                        margin: 20px 0;
                    }
                    .gc-dialog-card-details {
                        margin-bottom: 20px;
                    }
                    .gc-dialog-card-details table tr td:first-child {
                        text-align: right;
                    }
                    .gc-dialog-card-details table tr td:nth-of-type(2) {
                        padding-left: 10px;
                    }
                    .gc-dialog-card-details-giftcardcode :global(span) {
                        color: #4176d9;
                        font-weight: bold;
                    }
                    :global(.gc-dialog-card-details-button) {
                        background-color: #1fc064;
                        border-radius: 5px;
                        width: 200px;
                        padding: 0;
                        padding: 10px;
                    }
                    :global(.gc-dialog-card-details-button:hover) {
                        background-color: #1fc064;
                    }
                    .gc-previewButton-container :global(> div) {
                        text-align: left;
                    }
                    @media screen and (min-width: 960px) {
                        .row :global(.textfield:first-child) {
                            padding-right: 10px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

const ViewProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <AwGiftCardProduct {...props} />
    </MuiPickersUtilsProvider>
);

export default ViewProvider;
