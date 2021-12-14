import Button from '@common_button';
import Header from '@common_headermobile';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Skeleton from '@material-ui/lab/Skeleton';
import RadioGroup from '@material-ui/core/RadioGroup';
import Add from '@material-ui/icons/Add';
import AddressFormDialog from '@plugin_addressform';
import Typography from '@common_typography';
import ItemAddress from '@core_modules/checkout/pages/default/components/ItemModalAddress';
import useStyles from '@core_modules/checkout/pages/default/components/ModalAddress/style';

const AddressView = (props) => {
    const {
        t, open, setOpen, loading, success,
        address, handleAddress, selectedAddressId, loadingAddress,
        handleChange, handleOpenNew, openNew, typeAddress, dataEdit,
        updateAddress, manageCustomer,
    } = props;
    const styles = useStyles();
    const headerConfig = {
        headerTitle: t('customer:address:pageTitle'),
        header: 'relative',
        headerBackIcon: 'close',
    };
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const getItemAddress = () => {
        let content;
        if (loading) {
            content = <Skeleton variant="rect" width="100%" height={118} />;
        } else if (!address) {
            content = <Skeleton variant="rect" width="100%" height={118} />;
        } else if (address.length === 0) {
            content = null;
        } else {
            content = address.map((item) => (
                <ItemAddress
                    {...item}
                    checked={item.id === selectedAddressId}
                    key={item.id}
                    addressId={item.id}
                    firstname={item.firstname}
                    lastname={item.lastname}
                    telephone={item.telephone}
                    postcode={item.postcode}
                    region={item.region.region}
                    city={item.city}
                    country={{
                        id: item.country.code,
                        full_name_locale: item.country.label,
                    }}
                    street={item.street.join(' ')}
                    value={item.id}
                    defaultBilling={item.default_billing}
                    defaultShipping={item.default_shipping}
                    loadingAddress={loadingAddress}
                    success={success}
                    t={t}
                    handleOpenNew={handleOpenNew}
                    manageCustomer={manageCustomer}
                    updateAddress={updateAddress}
                    handleChange={handleChange}
                />
            ));
        }

        return content;
    };

    return (
        <>
            <AddressFormDialog
                {...props}
                open={openNew}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => handleOpenNew(typeAddress)}
                pageTitle={typeAddress === 'new' ? t('customer:address:addTitle') : t('customer:address:editTitle')}
                {...dataEdit}
            />
            <Dialog open={open} className={[styles.address_drawer].join(' ')} maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
                <div className={styles.container} id="checkoutListAddress">
                    <Header
                        pageConfig={headerConfig}
                        LeftComponent={{
                            onClick: () => {
                                setOpen(false);
                            },
                        }}
                        className={styles.pageTitle}
                    />
                    <div className={[styles.address_form].join(' ')}>
                        <div>
                            <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                                {getItemAddress()}
                            </RadioGroup>
                            <div className={[styles.address_action].join(' ')}>
                                <Button variant="outlined" size="small" onClick={() => handleOpenNew('new')}>
                                    <Typography variant="span" letter="uppercase" type="bold">
                                        {t('customer:address:addTitle')}
                                    </Typography>
                                    <Add />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddressView;
