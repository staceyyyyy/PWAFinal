/* eslint-disable no-underscore-dangle */
import React from 'react';
import Content from '@core_modules/product/pages/default/components/CustomizableOption/components';
import Core from '@core_modules/product/pages/default/components/CustomizableOption/core';

const CustomizableOption = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

export default CustomizableOption;
