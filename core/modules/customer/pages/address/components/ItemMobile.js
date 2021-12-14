/* eslint-disable no-unused-vars */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@plugin_addressform';
import React, { useState } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import useStyles from '@core_modules/customer/pages/address/components/style';

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
        handleAddress,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
        first,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const styles = useStyles();
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div className="column">
                <div className={[styles.address_content, first ? styles.address_content_first : ''].join(' ')}>
                    <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                        <FormControlLabel
                            className={[styles.address_shipping].join(' ')}
                            value={value}
                            checked={checked}
                            control={<Radio color="secondary" size="small" />}
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
                    </RadioGroup>
                    <Typography className={[styles.address_edit, styles.address_edit_mobile].join(' ')} variant="span" onClick={() => setOpen(!open)}>
                        {t('customer:address:editTitle')}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
