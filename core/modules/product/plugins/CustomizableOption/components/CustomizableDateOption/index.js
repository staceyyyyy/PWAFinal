/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { formatPrice } from '@helpers/currency';
import { useTranslation } from '@i18n';
import dayjs from 'dayjs';
import getPrice from '@core_modules/product/helpers/getPrice';
import View from '@plugin_customizableitem/components/CustomizableDateOption/view';
import { getCustomizableDateOption } from '@core_modules/product/services/graphql/customizableSchema';

const CustomizableDateOption = ({
    url_key, option_id, customizableOptions, setCustomizableOptions,
    errorCustomizableOptions, additionalPrice, setAdditionalPrice,
    stock_status, ...other
}) => {
    const { t } = useTranslation(['product']);
    const productPrice = getPrice(other.price);
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState({});
    const [textValue, setTextValue] = useState('');

    // get values options customizable
    const { data, loading } = useQuery(getCustomizableDateOption(url_key), {
        skip: !url_key,
        fetchPolicy: 'no-cache',
    });

    const onChange = async (e) => {
        const val = e.target.value;
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
                    value: dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
                });
                setAdditionalPrice(newPrice + addPrice);
            }
            setCustomizableOptions([
                ...removeOldOptions,
            ]);
        } else if (val !== '') {
            setCustomizableOptions([{
                ...value,
                value: dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
            }]);
            setAdditionalPrice(additionalPrice + addPrice);
        }
        setTextValue(val);
    };

    useMemo(() => {
        if (data && data.products && data.products.items.length > 0) {
            const option = data.products.items[0].options.filter(
                (item) => item.option_id === option_id && item.__typename === 'CustomizableDateOption',
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
            error={error}
            disabled={stock_status === 'OUT_OF_STOCK'}
        />
    );
};

export default CustomizableDateOption;
