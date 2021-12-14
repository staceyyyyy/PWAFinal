/* eslint-disable no-underscore-dangle */
import React from 'react';
import { modules } from '@config';
import CustomizableCheckboxOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableCheckboxOption';
import CustomizableRadioOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableRadioOption';
import CustomizableDropDownOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableDropDownOption';
import CustomizableAreaOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableAreaOption';
import CustomizableFieldOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableFieldOption';
import CustomizableFileOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableFileOption';
import CustomizableMultipleOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableMultipleOption';
import CustomizableDateOption from '@core_modules/product/pages/default/components/CustomizableOption/components/CustomizableDateOption';

const CustomizableOption = ({
    options = [], ...other
}) => (
    <>
        {
            options && options.length > 0
                        && options.map((item, key) => {
                            if (item.__typename === 'CustomizableMultipleOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableMultipleOption) {
                                return <CustomizableMultipleOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableCheckboxOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableCheckboxOption) {
                                return <CustomizableCheckboxOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableRadioOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableRadioOption) {
                                return <CustomizableRadioOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableDropDownOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableDropDownOption) {
                                return <CustomizableDropDownOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableAreaOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableAreaOption) {
                                return <CustomizableAreaOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableFieldOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableFieldOption) {
                                return <CustomizableFieldOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableFileOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableFileOption) {
                                return <CustomizableFileOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableDateOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableDateOption) {
                                return <CustomizableDateOption key={key} {...item} {...other} />;
                            }

                            return null;
                        })
        }
    </>
);

export default CustomizableOption;
