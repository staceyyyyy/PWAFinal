import Button from '@common_button';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from '@core_modules/trackingorder/pages/default/components/style';

const FormTemplate = (props) => {
    const { formik, t } = props;
    const styles = useStyles();
    return (
        <>
            <Typography variant="h1" type="bold" letter="uppercase" className={classNames(styles.title, 'hidden-mobile')}>
                {t('trackingorder:trackingOrder')}
            </Typography>
            <form className={styles.container} onSubmit={formik.handleSubmit}>
                <TextField
                    label={t('trackingtrackingorder:email')}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.email && formik.errors.email)}
                    errorMessage={(formik.touched.email && formik.errors.email) || null}
                />
                <TextField
                    label={t('trackingorder:orderId')}
                    name="order_id"
                    value={formik.values.order_id}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.order_id && formik.errors.order_id)}
                    errorMessage={(formik.touched.order_id && formik.errors.order_id) || null}
                />
                <div className={styles.bottomButtons}>
                    <Button fullWidth type="submit" rootClassName={styles.btnSeacrh}>
                        <Typography variant="span" type="bold" letter="uppercase" color="white">
                            {t('common:search:title')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default FormTemplate;
