import React from 'react';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import View from '@plugin_productitem/components/WeltpixelLabel/view';

const WeltpixelLabel = (props) => {
    const { weltpixel_labels, categoryLabel, ...other } = props;
    const data = [];
    const { onDetailProduct } = props;
    let customer = {};
    if (typeof window !== 'undefined') {
        customer = Cookies.getJSON(custDataNameCookie);
    }

    if (categoryLabel && weltpixel_labels && weltpixel_labels.categoryLabel
        && weltpixel_labels.categoryLabel.length > 0) {
        for (let index = 0; index < weltpixel_labels.categoryLabel.length; index += 1) {
            const label = {
                ...weltpixel_labels.categoryLabel[index],
            };
            label.disabled = false;
            if (customer && customer.customer && label.customer_group.length > 0) {
                if (!label.customer_group.includes(customer.customer_group)) {
                    label.disabled = true;
                }
            }
            data.push(label);
        }
    } else if (weltpixel_labels && weltpixel_labels.productLabel
        && weltpixel_labels.productLabel.length > 0) {
        for (let index = 0; index < weltpixel_labels.productLabel.length; index += 1) {
            const label = {
                ...weltpixel_labels.productLabel[index],
            };
            label.disabled = false;
            if (customer && customer.customer && label.customer_group.length > 0) {
                if (!label.customer_group.includes(customer.customer_group)) {
                    label.disabled = true;
                }
            }
            if (onDetailProduct && label.position !== 10) {
                label.disabled = true;
            }
            data.push(label);
        }
    }

    return (
        <View
            data={data}
            {...other}
            categoryLabel={categoryLabel}
        />
    );
};

export default WeltpixelLabel;
