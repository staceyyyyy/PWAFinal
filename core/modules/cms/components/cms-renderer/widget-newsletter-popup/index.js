import { useMutation } from '@apollo/client';
import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '@core_modules/cms/components/cms-renderer/widget-newsletter-popup/style';
import { subscribeNewsletter } from '@core_modules/customer/services/graphql/schema';
import { useFormik } from 'formik';
import parse, { domToReact } from 'html-react-parser';
import * as Yup from 'yup';

const Newsletter = (props) => {
    const { t, storeConfig, handleClose } = props;
    const [actSubscribe, result] = useMutation(subscribeNewsletter, {
        context: {
            request: 'internal',
        },
    });
    const styles = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('required'),
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

                    if (data.response !== 'Failed') {
                        handleClose(false);
                    }
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

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <div className={styles.fieldNewsletterControl}>
                <label htmlFor="newsletter">
                    <input
                        className={styles.fieldNewsletter}
                        name="email"
                        type="email"
                        id="newsletter"
                        placeholder="Enter your email address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </label>
                <Button type="submit" loading={result.loading} className={styles.subscribeBtn}>
                    {t('common:newsletter:buttonLabel')}
                </Button>
            </div>
            {storeConfig.weltpixel_newsletter_general_terms_conditions_consent === '1' && (
                <div>
                    <input name="newsletter-tnc" type="checkbox" id="newsletter-tnc" />
                    <label htmlFor="newsletter-tnc">{parse(storeConfig.weltpixel_newsletter_general_terms_conditions_text)}</label>
                </div>
            )}
        </form>
    );
};

const WidgetNewsletterPopup = (props) => {
    const {
        t, storeConfig, data, handleClose,
    } = props;
    const content = data.cmsBlocks.items[0].content || '';

    /* eslint-disable */
    const options = {
        replace: ({ name, attribs, children }) => {
            if (attribs) {
                if (name === 'pwa' && attribs.type === 'pwa-newsletter') {
                    return <Newsletter t={t} storeConfig={storeConfig} handleClose={handleClose} />;
                }

                if (attribs.class === 'title') {
                    return (
                        <Typography variant="title" type="semiBold">
                            {domToReact(children, options)}
                        </Typography>
                    );
                }

                if (attribs.class === 'col-md-7 newsletter-left') {
                    return <div className="col-xs-12 col-sm-7 col-md-7 newsletter-left">{domToReact(children, options)}</div>;
                }

                if (attribs.class === 'col-md-5 newsletter-right') {
                    return <div className="col-sm-5 col-md-5 newsletter-right">{domToReact(children, options)}</div>;
                }
            }
        },
    };

    return parse(content, options);
};

export default WidgetNewsletterPopup;
