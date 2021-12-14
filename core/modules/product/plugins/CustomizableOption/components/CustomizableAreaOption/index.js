/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { formatPrice } from '@helpers/currency';
import { useTranslation } from '@i18n';
import getPrice from '@core_modules/product/helpers/getPrice';
import View from '@plugin_customizableitem/components/CustomizableAreaOption/view';
import { getCustomizableAreaOption } from '@core_modules/product/services/graphql/customizableSchema';

const CustomizableAreaOption = ({
    url_key, option_id, customizableOptions, setCustomizableOptions,
    errorCustomizableOptions, additionalPrice, setAdditionalPrice,
    stock_status, ...other
}) => {
    const { t } = useTranslation(['product']);
    const productPrice = getPrice(other.price);
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState({});
    const [textValue, setTextValue] = useState('');
    const [errorText, setErrorText] = useState('');

    // get values options customizable
    const { data, loading } = useQuery(getCustomizableAreaOption(url_key), {
        skip: !url_key,
        fetchPolicy: 'no-cache',
    });

    const onChange = (e) => {
        const val = e.target.value;
        let err;
        if (value && value.max_characters && value.max_characters > 0) {
            if ((textValue.length + val.length) > value.max_characters) {
                const splitError = t('product:validate:maxCharacters').split('$');
                err = splitError[0] + value.max_characters + splitError[1];
            }
        }
        setErrorText(err);
        setTextValue(val);
    };

    const onSave = async () => {
        const val = textValue;
        const err = errorText;
        if (!err) {
            let addPrice = 0;
            if (val && val !== '') {
                addPrice += value.price;
            }
            if (customizableOptions && customizableOptions.length > 0) {
                let oldPrice = 0;
                const removeOldOptions = customizableOptions.filter((item) => {
                    if (item.option_id === options.option_id) {
                        oldPrice += item.price;
                    }
                    return item.option_id !== options.option_id;
                });
                let newPrice = additionalPrice - oldPrice;
                if (newPrice <= 0) {
                    newPrice = 0;
                }
                await setAdditionalPrice(newPrice);
                if (val && val !== '') {
                    removeOldOptions.push({
                        ...value,
                        value: val,
                    });
                    setAdditionalPrice(newPrice + addPrice);
                }
                setCustomizableOptions([
                    ...removeOldOptions,
                ]);
            } else if (val !== '') {
                setCustomizableOptions([{
                    ...value,
                    value: val,
                }]);
                setAdditionalPrice(additionalPrice + addPrice);
            }
        } else if (customizableOptions && customizableOptions.length > 0) {
            let oldPrice = 0;
            const removeOldOptions = customizableOptions.filter((item) => {
                if (item.option_id === options.option_id) {
                    oldPrice += item.price;
                }
                return item.option_id !== options.option_id;
            });
            let newPrice = additionalPrice - oldPrice;
            if (newPrice <= 0) {
                newPrice = 0;
            }
            await setAdditionalPrice(newPrice);
            setCustomizableOptions([
                ...removeOldOptions,
            ]);
        }
    };

    useMemo(() => {
        const delayDebounceFn = setTimeout(() => {
            onSave();
            // Send Axios request here
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [textValue]);

    useMemo(() => {
        if (data && data.products && data.products.items.length > 0) {
            const option = data.products.items[0].options.filter(
                (item) => item.option_id === option_id && item.__typename === 'CustomizableAreaOption',
            );
            if (option && option.length > 0) {
                setOptions(option[0]);
            }
            if (option && option[0] && option[0].value && option[0].value.uid) {
                const item = option[0].value;
                let { price } = item;
                if (item.price_type === 'PERCENT') {
                    price = (productPrice * price) / 100;
                }

                setValue({
                    ...item,
                    option_id: option[0].option_id,
                    label: `${option[0].title} + ${formatPrice(price)}`,
                    value: '',
                    price,
                });
            }
        }
    }, [data]);

    let error = '';
    useMemo(() => {
        if (options.option_id && errorCustomizableOptions.length > 0) {
            const findError = errorCustomizableOptions.filter((op) => op.option_id === options.option_id);
            if (findError && findError.length > 0) {
                error = t('product:validate:fieldRequired');
            }
        }
    }, [options, errorCustomizableOptions]);

    if (loading || !data) {
        return <p>Loading...</p>;
    }

    return (
        <View
            {...other}
            data={value}
            value={textValue}
            onChange={onChange}
            error={error || errorText}
            disabled={stock_status === 'OUT_OF_STOCK'}
        />
    );
};

export default CustomizableAreaOption;
