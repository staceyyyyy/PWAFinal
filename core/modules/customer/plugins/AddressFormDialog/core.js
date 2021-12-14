/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { regexPhone } from '@helper_regex';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { groupingCity, groupingSubCity } from '@helpers/city';
import { modules, storeConfigNameCookie } from '@config';
import helperCookies from '@helper_cookies';
import { getCityByRegionId, getCountries as getAllCountries, getRegions } from '@core_modules/customer/services/graphql';

const AddressFormDialog = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = {
            id: 'ID',
            full_name_locale: 'Indonesia',
        },
        region = null,
        city = null,
        telephone = '',
        maps = '',
        open,
        t,
        onSubmitAddress,
        loading = false,
        success = false,
        defaultShipping = false,
        defaultBilling = false,
        addressId = null,
        setOpen,
        latitude,
        longitude,
        pageTitle,
        disableDefaultAddress = false,
        Content,
    } = props;
    let { storeConfig } = props;

    if (!storeConfig && typeof window !== 'undefined') {
        storeConfig = helperCookies.get(storeConfigNameCookie);
    }
    const gmapKey = (storeConfig || {}).icube_pinlocation_gmap_key;

    const [getCountries, responCountries] = getAllCountries();
    const [getRegion, responRegion] = getRegions();
    const [addressState, setAddressState] = useState({
        countries: null,
        allCity: [],
        dropdown: {
            countries: null,
            region: null,
            city: null,
            district: null,
            village: null,
        },
    });

    const [enableSplitCity, setEnableSplitCity] = React.useState(
        country === 'ID' && modules.customer.plugin.address.splitCity,
    );

    const getCityByLabel = (label, dataCity = null) => {
        const data = dataCity || addressState.dropdown.city;
        if (!data || data.length === 0) return null;
        return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    };

    const splitCityValue = (cityValue) => cityValue.split(', ');

    const [mapPosition, setMapPosition] = useState({
        lat: latitude || '-6.197361',
        lng: longitude || '106.774535',
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const ValidationAddress = {
        firstname: Yup.string().required(t('validate:firstName:required')),
        lastname: Yup.string().required(t('validate:lastName:required')),
        telephone: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string().required(t('validate:street:required')),
        postcode: Yup.string().required(t('validate:postal:required')).min(3, t('validate:postal:wrong')).max(20, t('validate:postal:wrong')),
        country: Yup.string().nullable().required(t('validate:country:required')),
        region: Yup.string().nullable().required(t('validate:state:required')),
        city: Yup.string().nullable().required(t('validate:city:required')),
    };

    const InitialValue = {
        firstname: firstname || '',
        lastname: lastname || '',
        telephone: telephone || '',
        street: street || '',
        country: {
            id: 'ID',
            full_name_locale: 'Indonesia',
        },
        region: '',
        city: '',
        postcode: postcode || '',
        maps: maps || '',
        defaultShippingBilling: defaultShipping || defaultBilling,
        regionCode: '',
        regionId: '',
    };

    // add initial value if split city enabled
    if (enableSplitCity) {
        ValidationAddress.district = Yup.string().nullable().required('Kecamatan');
        ValidationAddress.village = Yup.string().nullable().test('check-village', 'Kelurahan', (value) => {
            if (addressState.dropdown.village && addressState.dropdown.village.length > 0 && !value) return false;
            return true;
        });

        InitialValue.district = '';
        InitialValue.village = '';
    }

    const AddressSchema = Yup.object().shape(ValidationAddress);

    const formik = useFormik({
        initialValues: InitialValue,
        validationSchema: AddressSchema,
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
                defaultBilling: values.defaultShippingBilling,
                defaultShipping: values.defaultShippingBilling,
                countryCode: values.country.id,
                region: values.region && values.region.code ? values.region.code : values.region,
                regionCode: values.region && values.region.code ? values.region.code : null,
                regionId: values.region && values.region.code ? values.region.region_id : null,
                addressId,
                latitude: String(mapPosition.lat),
                longitude: String(mapPosition.lng),
            };
            const defaultCity = values.city && values.city.label ? values.city.label : values.city;
            if (enableSplitCity) {
                if (values.village) {
                    data.city = values.village.city ? values.village.city : defaultCity;
                } else if (values.district) {
                    data.city = values.district.city ? values.district.city : defaultCity;
                } else {
                    data.city = defaultCity;
                }
            } else {
                data.city = defaultCity;
            }

            const type = addressId ? 'update' : 'add';

            // remove split values
            delete data.district;
            delete data.village;
            if (onSubmitAddress) {
                onSubmitAddress(data, type);
                if (!addressId) {
                    setTimeout(() => {
                        resetForm();
                    }, 1500);
                }
            }
        },
    });

    // togle enableSplitCity, set true when countryId === 'ID' & splitCity config === true
    React.useEffect(() => {
        const countryId = formik.values.country && formik.values.country.id;
        setEnableSplitCity(countryId === 'ID' && modules.customer.plugin.address.splitCity);
    }, [formik.values.country]);

    const [getCities, responCities] = getCityByRegionId({});
    React.useMemo(() => {
        if (open) {
            formik.setFieldValue('firstname', firstname);
            formik.setFieldValue('lastname', lastname);
            formik.setFieldValue('street', street);
            formik.setFieldValue('telephone', telephone);
            formik.setFieldValue('postcode', postcode);

            formik.setFieldValue('country', country);
            formik.setFieldValue('region', region);
            formik.setFieldValue('city', city);

            if (country && country.id) {
                getRegion({
                    variables: {
                        country_id: country.id,
                    },
                });
            }

            // only set current location for add mode
            if (typeof window !== 'undefined' && navigator && navigator.geolocation && !addressId) {
                navigator.geolocation.getCurrentPosition(displayLocationInfo);
            }

            // update map position after edit data
            if (open && latitude && longitude) {
                setMapPosition({
                    lat: latitude,
                    lng: longitude,
                });
            }

            if (region && typeof region === 'string' && addressState.dropdown.region
                && addressState.dropdown.region.length && addressState.dropdown.region.length > 0) {
                const selectRegion = addressState.dropdown.region.filter((item) => item.name === region);
                if (selectRegion && selectRegion.length > 0) formik.setFieldValue('region', selectRegion[0]);
            }
        }
    }, [open]);

    useEffect(() => {
        if (responRegion.data && responRegion.data.getRegions
            && responRegion.data.getRegions.item && responRegion.data.getRegions.item.length > 0) {
            const state = { ...addressState };
            if (region && typeof region === 'string') {
                const selectRegion = responRegion.data.getRegions.item.filter((item) => item.name === region);
                if (selectRegion && selectRegion.length > 0) formik.setFieldValue('region', selectRegion[0]);
            }
            state.dropdown.region = responRegion.data.getRegions.item;
            setAddressState(state);
        }
    }, [responRegion]);

    useEffect(() => {
        if (formik.values.region) {
            if (formik.values.region.region_id) {
                if (addressState.dropdown.city && addressState.dropdown.city.length
                    && addressState.dropdown.city.length > 0) {
                    const defaultValue = splitCityValue(city);
                    const valueCity = getCityByLabel(defaultValue[0], addressState.dropdown.city);
                    if (!valueCity) {
                        getCities({ variables: { regionId: formik.values.region.region_id } });
                    } else {
                        formik.setFieldValue('city', valueCity);
                    }
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    // formik.setFieldValue('postcode', '');
                } else {
                    getCities({ variables: { regionId: formik.values.region.region_id } });
                }

                if (enableSplitCity) {
                    const state = { ...addressState };
                    state.dropdown.district = null;
                    state.dropdown.village = null;
                    setAddressState(state);
                }
            } else if (formik.values.region === region) {
                formik.setFieldValue('city', city);
            }
        }
    }, [formik.values.region]);

    // set city and grouping
    useEffect(() => {
        if (responCities && responCities.data && !responCities.loading && !responCities.error && responCities.data.getCityByRegionId) {
            const state = { ...addressState };
            const { data } = responCities;
            if (data.getCityByRegionId.item.length !== 0) {
                state.allCity = data.getCityByRegionId.item;
                if (enableSplitCity) {
                    state.dropdown.city = groupingCity(data.getCityByRegionId.item);
                    state.dropdown.district = null;
                    state.dropdown.village = null;
                    // get default value by split city
                    if (city) {
                        const defaultValue = splitCityValue(city);
                        formik.setFieldValue('city', getCityByLabel(defaultValue[0], state.dropdown.city));
                    }
                } else {
                    state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
                    formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
                }

                setAddressState(state);
            } else if (enableSplitCity && city) {
                state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
                formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
            }
        }
    }, [responCities]);

    // get kecamatan if city change
    React.useMemo(() => {
        if (formik.values.city) {
            const state = { ...addressState };
            if (addressState.allCity && addressState.allCity.length
                && addressState.allCity.length > 0) {
                const district = groupingSubCity(formik.values.city.label, 'district', addressState.allCity);
                state.dropdown.district = district;
                setAddressState(state);
                let districtValue = '';
                if (city) {
                    const defaultValue = splitCityValue(city);
                    districtValue = getCityByLabel(defaultValue[1], district);
                }

                formik.setFieldValue('district', districtValue);
                formik.setFieldValue('village', '');
                // formik.setFieldValue('postcode', '');
            } else if (enableSplitCity && responCities
                    && responCities.data && !responCities.loading
                    && !responCities.error && responCities.data.getCityByRegionId) {
                const { data } = responCities;
                const district = data && data.getCityByRegionId
                    ? groupingSubCity(formik.values.city.label, 'district', data.getCityByRegionId.item)
                    : null;
                state.dropdown.district = district;
                state.dropdown.village = null;
                if (city && !formik.values.district) {
                    const defaultValue = splitCityValue(city);
                    const districtValue = getCityByLabel(defaultValue[1], state.dropdown.district);
                    if (districtValue) formik.setFieldValue('district', districtValue);
                } else {
                    // reset village and district if change city
                    formik.setFieldValue('district', '');
                }

                formik.setFieldValue('village', '');
                // formik.setFieldValue('postcode', '');
                setAddressState(state);
            } else {
                // formik.setFieldValue('postcode', formik.values.city.postcode || postcode);
            }
        }
    }, [formik.values.city]);

    // get kelurahan if kecamatan change
    React.useMemo(() => {
        const state = { ...addressState };
        if (addressState.allCity && addressState.allCity.length
            && addressState.allCity.length > 0) {
            if (formik.values.district && formik.values.district.label) {
                const village = groupingSubCity(formik.values.district.label, 'village', addressState.allCity, formik.values.city);
                state.dropdown.village = village;
            }
            let villageValue = '';
            if (city) {
                const defaultValue = splitCityValue(city);
                villageValue = getCityByLabel(defaultValue[2], state.dropdown.village);
            }
            formik.setFieldValue('village', villageValue);
            if (villageValue && villageValue !== '') {
                // formik.setFieldValue('postcode', '');
            } else if (formik.values.district) {
                // formik.setFieldValue('postcode', formik.values.postcode || postcode);
            }
        } else if (formik.values.district && enableSplitCity && responCities
            && responCities.data && !responCities.loading
            && !responCities.error && responCities.data.getCityByRegionId) {
            const { data } = responCities;
            const village = groupingSubCity(formik.values.district.label, 'village', data.getCityByRegionId.item, formik.values.city);
            state.dropdown.village = village;
            if (city && !formik.values.village && enableSplitCity) {
                const defaultValue = splitCityValue(city);
                const villageValue = getCityByLabel(defaultValue[2], state.dropdown.village);
                if (villageValue) {
                    formik.setFieldValue('village', villageValue);
                }
                // formik.setFieldValue('postcode', formik.values.district.postcode || postcode);
            } else {
                // reset village if district change
                formik.setFieldValue('village', '');
                // formik.setFieldValue('postcode', '');
            }
            setAddressState(state);
        }
    }, [formik.values.district]);

    // clear child location value when clear parent location
    // example: clear country => clear region
    React.useEffect(() => {
        if (!formik.values.country) formik.setFieldValue('region', '');
    }, [formik.values.country]);

    React.useEffect(() => {
        if (!formik.values.region) {
            formik.setFieldValue('city', '');
        }
    }, [formik.values.region]);

    React.useEffect(() => {
        if (!formik.values.city) formik.setFieldValue('district', '');
    }, [formik.values.city]);

    React.useEffect(() => {
        if (!formik.values.district) formik.setFieldValue('village', '');
    }, [formik.values.district]);

    React.useEffect(() => {
        if (formik.values.village && enableSplitCity) formik.setFieldValue('postcode', formik.values.village.postcode);
    }, [formik.values.village]);
    return (
        <Content
            t={t}
            open={open}
            setOpen={setOpen}
            pageTitle={pageTitle}
            formik={formik}
            addressState={addressState}
            getCities={getCities}
            responCities={responCities}
            setAddressState={setAddressState}
            mapPosition={mapPosition}
            handleDragPosition={handleDragPosition}
            disableDefaultAddress={disableDefaultAddress}
            loading={loading}
            success={success}
            gmapKey={gmapKey}
            enableSplitCity={enableSplitCity}
            getCountries={getCountries}
            responCountries={responCountries}
            getRegion={getRegion}
            responRegion={responRegion}
        />
    );
};

export default AddressFormDialog;
