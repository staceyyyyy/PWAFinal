/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import Button from '@common_button';
import TextField from '@common_textfield';
import ReCAPTCHA from 'react-google-recaptcha';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/contact/pages/default/components/style';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContactForm = (props) => {
    const styles = useStyles();
    const {
        t, formik, sitekey, handleChangeCaptcha, recaptchaRef,
        message, setMessage, load, enableRecaptcha,
    } = props;
    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Message
                open={message.open}
                variant={message.variant}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
            />
            <span style={{ margin: '0 0 10px -5px', textTransform: 'uppercase' }}>
                <Typography variant="h6" type="bold" align="left">
                    {t('contact:contactUs')}
                </Typography>
            </span>
            <TextField
                label={t('contact:fullName')}
                className={styles.fullName}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                errorMessage={(formik.touched.fullName && formik.errors.fullName) || null}
            />
            <TextField
                label={t('contact:email')}
                className={styles.email}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!(formik.touched.email && formik.errors.email)}
                errorMessage={(formik.touched.email && formik.errors.email) || null}
            />
            <TextField
                label={t('contact:telephone')}
                className={styles.telephone}
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={!!(formik.touched.telephone && formik.errors.telephone)}
                errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
            />
            <TextField
                label={t('contact:message')}
                className={styles.message}
                name="message"
                multiline
                rows="4"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={!!(formik.touched.message && formik.errors.message)}
                errorMessage={(formik.touched.message && formik.errors.message) || null}
            />
            {
                enableRecaptcha ? (
                    <>
                        <ReCAPTCHA
                            sitekey={sitekey}
                            onChange={handleChangeCaptcha}
                            ref={recaptchaRef}
                        />
                        {formik.errors.captcha && (
                            <Typography color="red">{formik.errors.captcha}</Typography>
                        )}
                    </>
                ) : null
            }
            <Button
                disabled={load}
                loading={load}
                rootClassName="contact-btn-container"
                align="left"
                type="submit"
            >
                <Typography variant="span" letter="uppercase" color="white" type="bold">
                    {t('common:button:send')}
                </Typography>
            </Button>
            <style jsx global>
                {`
                    .contact-btn-container {
                        margin-top: 50px;
                    }
                `}
            </style>
        </form>
    );
};

const ContactPage = (props) => {
    const styles = useStyles();
    const {
        data, t, loading, Skeleton,
    } = props;
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <Typography variant="h5" type="bold" align="left" className={styles.pageTitles}>
                {t('contact:contactUs')}
            </Typography>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    {(!loading && <div className={styles.container} dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />)}
                    {(loading && <Skeleton />)}
                </div>
                <div className="col-md-6 col-xs-12">
                    <ContactForm {...props} />
                </div>
            </div>
        </>
    );
};

export default ContactPage;
