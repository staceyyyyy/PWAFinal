import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import React from 'react';
import AddressFormDialog from '@plugin_addressform';
import useStyles from '@core_modules/checkout/pages/default/components/ItemModalAddress/style';

const ItemAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        loading,
        open,
        setOpen,
        handleSave,
        success,
        t,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const styles = useStyles();
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleSave}
                loading={loading}
                success={success}
                setOpen={() => setOpen(false)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div className={styles.addressColumn} id="checkoutListItemAddress">
                <div className={[styles.address_content].join(' ')}>
                    <FormControlLabel
                        className={[styles.address_shipping].join(' ')}
                        value={value}
                        checked={checked}
                        control={<Radio color="primary" size="small" />}
                        label={(
                            <>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {`${firstname} ${lastname}`}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {street}
                                    ,
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {city !== '' && `${city}, `}
                                    {region !== '' && `${region}, `}
                                    {country !== '' && `${country.full_name_locale || ''}, `}
                                    {postcode !== '' && postcode}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {telephone}
                                </Typography>
                            </>
                        )}
                        labelPlacement="end"
                    />
                    <Typography className={[styles.address_edit].join(' ')} variant="span" onClick={() => setOpen(true)}>
                        {t('customer:address:editTitle')}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
