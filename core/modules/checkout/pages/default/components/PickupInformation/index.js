/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/checkout/pages/default/components/PickupInformation/style';
import ModalPickupInformation from '@core_modules/checkout/pages/default/components/ModalPickupInformation';
import ModalSelectStore from '@core_modules/checkout/pages/default/components/ModalSelectStore';
import gqlService from '@core_modules/checkout/services/graphql';
import useParentStyles from '@core_modules/checkout/pages/default/components/style';

const PickupInformation = (props) => {
    const {
        t, checkout, setCheckout, formik,
    } = props;
    const classes = useStyles();
    const styles = useParentStyles();
    const { cart } = checkout.data;
    let listStores = [];
    const pickupStores = gqlService.getPickupStore({
        variables: { cart_id: cart.id },
        skip: typeof cart === 'undefined',
    });
    if (!pickupStores.loading && pickupStores.data && !pickupStores.error) {
        listStores = pickupStores.data.getPickupStore.store;
    }
    const [openModal, setOpenModal] = React.useState({
        openModalInfo: false,
        openModalSelectStore: false,
    });
    const handleOpen = (state) => {
        setOpenModal({
            ...openModal,
            [state]: !openModal[state],
        });
    };
    return (
        <div className={styles.block} id="checkoutPickupStore">
            <ModalPickupInformation
                open={openModal.openModalInfo}
                setOpen={() => handleOpen('openModalInfo')}
                setCheckout={setCheckout}
                checkout={checkout}
            />
            <ModalSelectStore
                open={openModal.openModalSelectStore}
                setOpen={() => handleOpen('openModalSelectStore')}
                setCheckout={setCheckout}
                checkout={checkout}
                listStores={listStores}
            />
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {
                        (Object.keys(checkout.pickupInformation).length > 0) && (
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Person</td>
                                            <td>{' : '}</td>
                                            <td><strong>{checkout.pickupInformation.pickup_person_name}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{t('common:form:phoneNumber')}</td>
                                            <td>{' : '}</td>
                                            <td><strong>{checkout.pickupInformation.pickup_person_phone}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{' : '}</td>
                                            <td><strong>{checkout.pickupInformation.pickup_person_email}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )
                    }
                    <Button
                        align="left"
                        variant="text"
                        className="clear-margin-padding"
                        onClick={() => handleOpen('openModalInfo')}
                        disabled={
                            formik.values.email !== '' && formik.values.email !== formik.values.oldEmail
                        }
                    >
                        <Typography variant="span" letter="uppercase" type="bold">
                            {t('checkout:pickupInformation:changePickupInformation')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <Typography>
                {t('checkout:pickupInformation:pickupAtLabel')}
            </Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {
                        (Object.keys(checkout.selectStore).length > 0) && (
                            <>
                                <Typography variant="span" type="bold">
                                    {checkout.selectStore.name}
                                </Typography>
                                <Typography>
                                    {checkout.selectStore.street}
                                    <br />
                                    {checkout.selectStore.city}
                                    <br />
                                    {checkout.selectStore.region}
                                    <br />
                                    {checkout.selectStore.country_id}
                                    <br />
                                    {checkout.selectStore.postcode}
                                    <br />
                                    {checkout.selectStore.telephone}
                                </Typography>
                            </>
                        )
                    }
                    {
                        pickupStores.loading || !pickupStores.data ? (
                            <Skeleton variant="text" animation="wave" width={270} height={30} />
                        ) : (
                            <Button
                                align="left"
                                variant="text"
                                className="clear-margin-padding"
                                onClick={() => handleOpen('openModalSelectStore')}
                                disabled={
                                    formik.values.email !== '' && formik.values.email !== formik.values.oldEmail
                                }
                            >
                                <Typography variant="span" letter="uppercase" type="bold">
                                    {t('checkout:pickupInformation:changePickupLocation')}
                                </Typography>
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PickupInformation;
