import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import useModalStyles from '@core_modules/checkout/pages/default/components/ModalSelectStore/style';
import useStyles from '@core_modules/checkout/pages/default/components/PickupInformation/style';
import useParentStyles from '@core_modules/checkout/pages/default/components/style';
import { pickupLocations, setInstoreShippingAddress, setShippingMethod } from '@core_modules/checkout/services/graphql';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const ModalPickupLocations = (props) => {
    const {
        t, open, setOpen, locations = [], checkout, setCheckout,
        handleOpenMessage,
    } = props;
    const [loading, setLoading] = useState(false);
    const [listLocations, setListLocations] = useState(locations);
    const [selected, setSelected] = useState(checkout);
    const [search, setSearch] = useState('');
    const styles = useModalStyles();
    const [setShipMethod] = setShippingMethod();
    const [setInstoreAddress] = setInstoreShippingAddress();

    const handleSave = async () => {
        setLoading(true);
        const { cart } = checkout.data;
        const newCheckout = { ...checkout };
        try {
            const updatedShippingAddress = await setInstoreAddress({
                variables: {
                    cartId: cart.id,
                    city: selected.city,
                    countryCode: selected.country_id,
                    firstname: selected.name,
                    lastname: selected.name,
                    telephone: selected.phone,
                    postcode: selected.postcode,
                    street: selected.street,
                    region: selected.region_id.toString(),
                    latitude: selected.latitude.toString(),
                    longitude: selected.longitude.toString(),
                    pickup_location_code: selected.pickup_location_code,
                },
            });

            await setShipMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: 'instore',
                    methodCode: 'pickup',
                },
            });

            newCheckout.selected.billing = updatedShippingAddress.data.setBillingAddressOnCart.cart;
            /* eslint-disable */
            newCheckout.selected.address = updatedShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses[0];

            await setCheckout({
                ...newCheckout,
                pickup_location_code: updatedShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses[0].pickup_location_code,
            });

            setLoading(false);
            setOpen(!open);
        } catch (error) {
            let msg = t('checkout:message:serverError');
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                msg = error.graphQLErrors[0].message;
            }
            setLoading(false);
            setOpen(!open);
            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        const searched = locations.filter(({ name }) => name.toLowerCase().search(value.toLowerCase()) > -1);

        setSearch(value);
        setListLocations(searched);
    };

    useEffect(() => {
        setListLocations(locations);
    }, [locations]);

    /* eslint-disable */
    return (
        <Dialog open={open} onClose={() => setOpen(!open)} fullWidth={true} maxWidth="sm">
            <AppBar className={styles.appBar}>
                <IconButton className={styles.btnClose} edge="start" onClick={() => setOpen(!open)} aria-label="close">
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography variant="label" type="bold" align="center" letter="uppercase" className={styles.title}>
                    {t('checkout:pickupInformation:label')}
                </Typography>
            </AppBar>
            <DialogContent dividers>
                <div className={styles.container}>
                    <div className={styles.body}>
                        <TextField label="Search" value={search} onChange={handleSearch} />
                        {listLocations && listLocations.length > 0 ? (
                            listLocations.map((loc) => {
                                return (
                                    <div
                                        key={loc.pickup_location_code}
                                        onClick={() => setSelected(loc)}
                                        className={classNames(
                                            styles.card,
                                            selected && selected.pickup_location_code === loc.pickup_location_code && styles.cardActive
                                        )}
                                    >
                                        <Typography variant="span" type="bold">
                                            {loc.name}
                                        </Typography>
                                        <Typography>
                                            {loc.street}
                                            <br />
                                            {loc.city}
                                            <br />
                                            {loc.region}
                                            <br />
                                            {loc.country_id}
                                            <br />
                                            {loc.postcode}
                                            <br />
                                            {loc.telephone}
                                        </Typography>
                                    </div>
                                );
                            })
                        ) : (
                            <Alert className="m-15" severity="warning">
                                {t('checkout:storesNotFound')}
                            </Alert>
                        )}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div className={styles.footer}>
                    <Button className={styles.btnSave} type="button" onClick={handleSave} loading={loading} disabled={loading}>
                        {t('common:button:save')}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

const InStorePickup = (props) => {
    const { t, checkout, setCheckout, handleOpenMessage } = props;
    const [getPickupLocations, results] = pickupLocations();
    const [open, setOpen] = useState(false);
    const locations = results.data?.pickupLocations.items;
    const classes = useStyles();
    const styles = useParentStyles();
    const { pickup_location_code } = checkout;
    const { address } = checkout.selected;

    useEffect(() => {
        getPickupLocations();
    }, [results.called]);

    return (
        <div className={styles.block}>
            <ModalPickupLocations
                t={t}
                open={open}
                setOpen={setOpen}
                locations={locations}
                checkout={checkout}
                setCheckout={setCheckout}
                handleOpenMessage={handleOpenMessage}
            />
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <Typography>{t('checkout:pickupInformation:pickupAtLabel')}</Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {address && pickup_location_code && Object.keys(address).length > 0 && (
                        <>
                            <Typography variant="span" type="bold">
                                {address.name}
                            </Typography>
                            <Typography>
                                {address.street[0]}
                                <br />
                                {address.city}
                                <br />
                                {address.region.label}
                                <br />
                                {address.country.label}
                                <br />
                                {address.postcode}
                                <br />
                                {address.telephone}
                            </Typography>
                        </>
                    )}
                    <Button align="left" variant="text" className="clear-margin-padding" onClick={() => setOpen(!open)}>
                        <Typography variant="span" letter="uppercase" type="bold">
                            {t('checkout:pickupInformation:changePickupLocation')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InStorePickup;
