import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { regexPhone } from '@helper_regex';
import { useTranslation } from '@i18n';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import gqlService from '@core_modules/checkout/services/graphql';
import useStyles from '@core_modules/checkout/pages/default/components/ModalPickupInformation/style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const ModalPickupInformation = ({
    open,
    setOpen,
    checkout,
    setCheckout,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const [setPickupStore] = gqlService.setPickupStore();
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        person: Yup.string().required(`${t('checkout:pickupInformation:pickupPerson')} ${t('validate:required')}`),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
    });

    const [loading, setLoading] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: checkout.pickupInformation.pickup_person_email || '',
            phoneNumber: checkout.pickupInformation.pickup_person_phone || '',
            person: checkout.pickupInformation.pickup_person_name || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const pickupInformation = {
                pickup_person_email: values.email,
                pickup_person_name: values.person,
                pickup_person_phone: values.phoneNumber,
            };
            await setLoading(true);
            if (Object.keys(checkout.selectStore).length > 0) {
                await setPickupStore({
                    variables: {
                        cart_id: checkout.data.cart.id,
                        code: checkout.selectStore.code,
                        extension_attributes: pickupInformation,
                        store_address: {
                            city: checkout.selectStore.city,
                            country_code: checkout.selectStore.country_id,
                            name: checkout.selectStore.name,
                            postcode: checkout.selectStore.postcode,
                            region: checkout.selectStore.region,
                            street: [checkout.selectStore.street],
                            telephone: checkout.selectStore.telephone,
                        },
                    },
                }).then(async (res) => {
                    const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null,
                    }));
                    await setCheckout({
                        ...checkout,
                        data: {
                            ...checkout.data,
                            cart: {
                                ...checkout.data.cart,
                                ...res.data.setPickupStore,
                            },
                            paymentMethod,
                        },
                        pickupInformation,
                        error: {
                            selectStore: false,
                            pickupInformation: false,
                        },
                    });
                    await setLoading(false);
                    setOpen();
                }).catch(() => {
                    setLoading(false);
                });
            } else {
                await setCheckout({
                    ...checkout,
                    pickupInformation,
                    error: {
                        ...checkout.error,
                        selectStore: true,
                    },
                });
                await setLoading(false);
                setOpen();
            }
        },
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            maxWidth="sm"
            fullWidth={!!isDesktop}
            fullScreen={!isDesktop}
        >
            <AppBar className={styles.appBar}>
                <IconButton
                    className={styles.btnClose}
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography
                    variant="label"
                    type="bold"
                    align="center"
                    letter="uppercase"
                    className={styles.title}
                >
                    {t('checkout:pickupInformation:label')}
                </Typography>
            </AppBar>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent dividers>
                    <div className={styles.body}>
                        <TextField
                            label={t('checkout:pickupInformation:pickupPerson')}
                            name="person"
                            value={formik.values.person}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.person && formik.errors.person)}
                            errorMessage={(formik.touched.person && formik.errors.person) || null}
                        />
                        <TextField
                            label={t('common:form:phoneNumber')}
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                            errorMessage={(formik.touched.phoneNumber && formik.errors.phoneNumber) || null}
                        />
                        <TextField
                            label="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            errorMessage={(formik.touched.email && formik.errors.email) || null}
                        />
                    </div>
                </DialogContent>

                <DialogActions>
                    <div className={styles.footer}>
                        <Button loading={loading} className={styles.btnSave} type="submit">
                            {t('common:button:save')}
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ModalPickupInformation;
