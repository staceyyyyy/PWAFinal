import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IcubeMaps from '@common_googlemaps';
import Header from '@common_headermobile';
import Button from '@common_button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTextField from '@common_textfield';
import Typography from '@common_typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CustomAutocomplete from '@core_modules/commons/AutoComplete';
import useStyles from '@plugin_addressform/components/style';

const AddressView = (props) => {
    const {
        t, open, setOpen, pageTitle, formik, addressState, setAddressState,
        mapPosition, handleDragPosition, disableDefaultAddress, loading, success, gmapKey, enableSplitCity,
        getCountries, responCountries, getRegion, responRegion, responCities,
        getCities,
    } = props;
    const styles = useStyles();
    const headerConfig = {
        headerTitle: pageTitle || t('customer:address:addTitle'),
        header: 'relative',
        headerBackIcon: 'close',
    };
    const addBtn = success ? styles.addBtnSuccess : styles.addBtn;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const getCountriesRender = () => (
        <div className={styles.boxField}>
            <CustomAutocomplete
                id="country"
                enableCustom={false}
                mode="lazy"
                value={formik.values.country}
                onChange={async (e) => {
                    formik.setFieldValue('country', e);
                    formik.setFieldValue('region', '');
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                    if (e && e.id) {
                        const state = { ...addressState };
                        state.dropdown.region = null;
                        state.dropdown.city = null;
                        await setAddressState(state);
                        getRegion({
                            variables: {
                                country_id: e.id,
                            },
                        });
                    }
                }}
                loading={responCountries.loading}
                options={
                    responCountries
                    && responCountries.data
                    && responCountries.data.countries
                }
                getOptions={getCountries}
                name="country"
                label={t('common:form:country')}
                primaryKey="id"
                labelKey="full_name_locale"
            />
        </div>
    );

    // regions is state/province
    const getRegionRender = () => {
        if (addressState.dropdown.region && addressState.dropdown.region.length > 0 && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.country}
                    options={addressState.dropdown.region}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    id="controlled-region"
                    value={!formik.values.region ? null : formik.values.region}
                    onChange={async (event, newValue) => {
                        formik.setFieldValue('region', newValue);
                        formik.setFieldValue('city', '');
                        formik.setFieldValue('district', '');
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postcode', '');
                        if (newValue && newValue.region_id) {
                            const state = { ...addressState };
                            state.dropdown.city = null;
                            await setAddressState(state);
                            getCities({
                                variables: { regionId: newValue.region_id },
                            });
                        }
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                    autoCorrect: 'off',
                                    autoCapitalize: 'none',
                                    spellCheck: 'false',
                                }}
                                name={`state_${new Date().getTime()}`}
                                label={t('common:form:state')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyDown={(event) => {
                                    if (event.key !== 'Enter' && event.key !== 'Tab') {
                                        const state = {
                                            ...addressState,
                                        };
                                        state.dropdown.city = null;
                                        setAddressState(state);
                                        formik.setFieldValue('city', null);
                                    }
                                }}
                                error={!!(formik.touched.region && formik.errors.region)}
                            />
                            <Typography variant="p" color={formik.touched.region && formik.errors.region ? 'red' : 'default'}>
                                {formik.touched.region && formik.errors.region}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.country}
                loading={responRegion.loading}
                autoComplete="new-password"
                label="State/Province"
                name="region"
                value={formik.values.region || ''}
                onChange={(e) => {
                    formik.setFieldValue('region', e.target.value);
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }}
                onFocus={() => {
                    if (formik.values.country && formik.values.country.id) {
                        getRegion({
                            variables: {
                                country_id: formik.values.country.id,
                            },
                        });
                    }
                }}
                error={!!(formik.touched.region && formik.errors.region)}
                errorMessage={(formik.touched.region && formik.errors.region) || null}
            />
        );
    };

    // city or kabupaten
    const getCityRender = () => {
        if (addressState.dropdown.city && addressState.dropdown.city.length
            && addressState.dropdown.city.length > 0 && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.region}
                    options={addressState.dropdown.city}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-city"
                    value={!formik.values.city ? null : formik.values.city}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('city', newValue);
                        formik.setFieldValue('district', '');
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postcode', '');
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                    autoCorrect: 'off',
                                    autoCapitalize: 'none',
                                    spellCheck: 'false',
                                }}
                                name={`city_${new Date().getTime()}`}
                                label={t('common:form:city')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.city && formik.errors.city)}
                            />
                            <Typography variant="p" color={formik.touched.city && formik.errors.city ? 'red' : 'default'}>
                                {formik.touched.city && formik.errors.city}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.region}
                loading={responCities.loading}
                autoComplete="new-password"
                label="City"
                name="city"
                value={formik.values.city || ''}
                onChange={(e) => {
                    formik.setFieldValue('city', e.target.value);
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }}
                error={!!(formik.touched.city && formik.errors.city)}
                errorMessage={(formik.touched.city && formik.errors.city) || null}
            />
        );
    };

    // district / kecamatan
    const getDistrictRender = () => {
        if (addressState.dropdown.district && addressState.dropdown.district.length
            && addressState.dropdown.district.length > 0 && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.city}
                    options={addressState.dropdown.district}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-district"
                    value={!formik.values.district ? null : formik.values.district}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('district', newValue);
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postcode', '');
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoCorrect: 'off',
                                    autoCapitalize: 'none',
                                    spellCheck: 'false',
                                }}
                                name={`district_${new Date().getTime()}`}
                                label="Kecamatan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.district && formik.errors.district)}
                            />
                            <Typography variant="p" color={formik.touched.district && formik.errors.district ? 'red' : 'default'}>
                                {formik.touched.district && formik.errors.district}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.city}
                loading={responCities.loading}
                autoComplete="new-password"
                label="Kecamatan"
                name="district"
                value={formik.values.district ? formik.values.district.label : ''}
                onChange={(e) => {
                    formik.setFieldValue('district', e.target.value);
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }}
                error={!!(formik.touched.district && formik.errors.district)}
                errorMessage={(formik.touched.district && formik.errors.district) || null}
            />
        );
    };

    const getVillageRender = () => {
        if (addressState.dropdown.village && addressState.dropdown.village.length
            && addressState.dropdown.village.length > 0 && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.district}
                    options={addressState.dropdown.village}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-village"
                    value={!formik.values.village ? null : formik.values.village}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('village', newValue);
                        formik.setFieldValue('postcode', '');
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoCorrect: 'off',
                                    autoCapitalize: 'none',
                                    spellCheck: 'false',
                                }}
                                name={`village_${new Date().getTime()}`}
                                label="Kelurahan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.village && formik.errors.village)}
                            />
                            <Typography variant="p" color={formik.touched.village && formik.errors.village ? 'red' : 'default'}>
                                {formik.touched.village && formik.errors.village}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return null;
    };

    return (
        <Dialog open={open} className={[styles.address_drawer].join(' ')} maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
            <div className={styles.container} id="formAddress">
                <Header
                    pageConfig={headerConfig}
                    LeftComponent={{
                        onClick: () => {
                            formik.resetForm();
                            setOpen();
                        },
                    }}
                    className={styles.pageTitle}
                />
                <div className={[styles.address_form].join(' ')}>
                    <form onSubmit={formik.handleSubmit} autoComplete="new-password">
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:firstName')}
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            errorMessage={(formik.touched.firstname && formik.errors.firstname) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:lastName')}
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            errorMessage={(formik.touched.lastname && formik.errors.lastname) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:street')}
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            errorMessage={(formik.touched.street && formik.errors.street) || null}
                        />
                        {getCountriesRender()}
                        {getRegionRender()}
                        {getCityRender()}
                        {enableSplitCity ? getDistrictRender() : null}
                        {enableSplitCity ? getVillageRender() : null}
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:postal')}
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            errorMessage={(formik.touched.postcode && formik.errors.postcode) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:phoneNumber')}
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
                        />
                        {gmapKey && (
                            <div className={styles.boxMap}>
                                <IcubeMaps height="230px" mapPosition={mapPosition} dragMarkerDone={handleDragPosition} gmapKey={gmapKey} />
                            </div>
                        )}

                        {disableDefaultAddress ? null : (
                            <div>
                                <FormControlLabel
                                    value={formik.values.defaultShippingBilling}
                                    checked={formik.values.defaultShippingBilling}
                                    onChange={() => formik.setFieldValue('defaultShippingBilling', !formik.values.defaultShippingBilling)}
                                    name="defaultShippingBilling"
                                    control={<Checkbox name="newsletter" color="primary" size="small" />}
                                    label={(
                                        <Typography variant="p" letter="capitalize" className="row center">
                                            {t('customer:address:useDefault')}
                                        </Typography>
                                    )}
                                />
                            </div>
                        )}

                        <div className={styles.wrapper}>
                            <Button className={addBtn} fullWidth type="submit" disabled={loading} loading={loading}>
                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                    {t(success ? 'common:button:saved' : 'common:button:save')}
                                </Typography>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default AddressView;
