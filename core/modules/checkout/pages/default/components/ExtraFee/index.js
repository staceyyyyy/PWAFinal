/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import gqlService from '@core_modules/checkout/services/graphql';

const AdditionSelect = (props) => {
    const {
        t, checkout, setCheckout, storeConfig, ExtraFeeView,
    } = props;
    const [updateExtraFee] = gqlService.updateExtraFee();
    const { data: { cart }, loading } = checkout;
    const [state, setState] = React.useState({});
    const globalCurrency = storeConfig.default_display_currency_code || 'IDR';

    React.useEffect(() => {
        if (cart && cart.addtional_fees && cart.applied_extra_fee) {
            const addtionalFee = cart.addtional_fees;
            const extraFee = cart.applied_extra_fee;
            if (addtionalFee.data && extraFee.select_options) {
                let stateData = {};
                for (let ei = 0; ei < extraFee.select_options.length; ei += 1) {
                    for (let ai = 0; ai < addtionalFee.data.length; ai += 1) {
                        for (let oai = 0; oai < addtionalFee.data[ai].options.length; oai += 1) {
                            if (addtionalFee.data[ai].options[oai].option_id === extraFee.select_options[ei].option_id) {
                                if (addtionalFee.data[ai].frontend_type === 'checkbox') {
                                    let newState = {
                                        [addtionalFee.data[ai].id_fee]: [JSON.stringify(addtionalFee.data[ai].options[oai])],
                                    };
                                    if (stateData[[addtionalFee.data[ai].id_fee]]) {
                                        newState = {
                                            [addtionalFee.data[ai].id_fee]: [
                                                ...stateData[[addtionalFee.data[ai].id_fee]],
                                                JSON.stringify(addtionalFee.data[ai].options[oai]),
                                            ],
                                        };
                                    }
                                    stateData = {
                                        ...stateData,
                                        ...newState,
                                    };
                                } else {
                                    stateData = {
                                        ...stateData,
                                        [addtionalFee.data[ai].id_fee]: JSON.stringify(addtionalFee.data[ai].options[oai]),
                                    };
                                }
                            }
                        }
                    }
                }
                setState(stateData);
            }
        }
    }, [checkout]);

    const handleChange = async (key, value) => {
        const newState = { ...state, [key]: value };
        await setState(newState);
        const keyState = Object.keys(newState);
        const select_options = [];
        for (let index = 0; index < keyState.length; index += 1) {
            if (Array.isArray(newState[keyState[index]])) {
                const options = newState[keyState[index]].map((option) => {
                    const val = JSON.parse(option);
                    return {
                        label: val.label,
                        option_id: val.option_id,
                    };
                });
                select_options.push(...options);
            } else {
                const val = JSON.parse(newState[keyState[index]]);
                select_options.push({
                    label: val.label,
                    option_id: val.option_id,
                });
            }
        }
        const isState = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: true,
                payment: true,
                extraFee: false,
                order: true,
            },
        };
        setCheckout(isState);
        updateExtraFee({
            variables: {
                cart_id: cart.id,
                select_options,
            },
        }).then(async (res) => {
            const checkoutData = { ...checkout };
            checkoutData.data.cart = {
                ...checkoutData.data.cart,
                ...res.data.updateExtraFeeOnCart.cart,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: false,
                    payment: false,
                    extraFee: false,
                    order: false,
                },
            };
            await setCheckout(checkoutData);
        }).catch(() => window.backdropLoader(false));
    };
    if (cart && cart.addtional_fees && cart.addtional_fees.data && cart.addtional_fees.data.length > 0) {
        return (
            <ExtraFeeView
                state={state}
                globalCurrency={globalCurrency}
                storeConfig={storeConfig}
                t={t}
                handleChange={handleChange}
                loading={loading}
                cart={cart}
            />
        );
    }

    return null;
};

export default AdditionSelect;
