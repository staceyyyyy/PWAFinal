/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import _ from 'lodash';
import {
    createCustomerAddress,
    removeAddress as gqlRemoveAddress,
    updateCustomerAddress,
    updatedDefaultAddress as gqlUpdateDefaulAddress,
    getCustomer as gqlGetCustomer,
} from '@core_modules/customer/services/graphql';

const AddressCustomer = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:address:pageTitle'),
        headerTitle: t('customer:address:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    // graphql
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    const [removeAddress] = gqlRemoveAddress();
    const getCustomer = gqlGetCustomer();
    // state
    const [address, setAddress] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openNew, setOpenDialogNew] = useState(false);
    const [, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setMapPosition({
            lat,
            lng,
        });
    };

    // didmount
    useEffect(() => {
        setLoading(true);
        if (!getCustomer.loading && getCustomer.data) {
            const { customer } = getCustomer.data;

            if (customer) {
                const selectedAddress = customer.addresses.find((addr) => addr.default_shipping);
                setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
                setAddress(customer.addresses);
            }
            setLoading(false);
        }

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [getCustomer]);

    // handle open modal add adress button
    const handleOpenNew = () => {
        setOpenDialogNew(!openNew);
    };

    // handle change selected address
    const handleChange = async (event) => {
        window.backdropLoader(true);
        const addressId = parseInt(event.target.value);
        setSelectedAddressId(addressId);
        let detail = {};
        for (let index = 0; index < address.length; index++) {
            if (address[index].id === addressId) {
                detail = address[index];
            }
        }
        await updatedDefaultAddress({
            variables: {
                addressId,
                street: detail.street[0],
            },
        });
        await getCustomer.refetch();
        window.backdropLoader(false);
    };

    // handle edit address
    const handleDialogSubmit = async () => {
        setLoading(true);
        await getCustomer.refetch();
        setAddress(getCustomer.data.customer.addresses);
        setLoading(false);
    };

    // handle add address
    const handleAddress = async (data, type) => {
        setLoadingAddress(true);
        if (!success) {
            if (type === 'update') {
                await updateAddress({
                    variables: {
                        ...data,
                    },
                });
            } else {
                await addAddress({
                    variables: {
                        ...data,
                    },
                });
            }
        }

        setSuccess(true);
        setLoadingAddress(false);

        _.delay(() => {
            if (openNew) {
                setOpenDialogNew(false);
            }
            setSuccess(false);
            handleDialogSubmit();
        }, 1000);
    };

    const setRemoveAddress = async (addressId) => {
        setLoadingAddress(true);
        setLoading(true);
        if (!success) {
            if (addressId) {
                await removeAddress({
                    variables: {
                        id: addressId,
                    },
                });
            }
        }

        _.delay(async () => {
            await getCustomer.refetch();
            setSuccess(true);
            setLoadingAddress(false);
            setLoading(false);
        }, 1000);
    };
    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                loading={loading}
                address={address}
                selectedAddressId={selectedAddressId}
                handleDialogSubmit={handleDialogSubmit}
                handleChange={handleChange}
                handleOpenNew={handleOpenNew}
                handleAddress={handleAddress}
                removeAddress={setRemoveAddress}
                loadingAddress={loadingAddress}
                success={success}
                openNew={openNew}
            />
        </Layout>
    );
};

export default AddressCustomer;
