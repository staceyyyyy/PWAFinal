import Core from '@core_modules/cms/components/cms-renderer/magezon/MagezonFlickr/core';
import View from '@core_modules/cms/components/cms-renderer/magezon/MagezonFlickr/view';
import React from 'react';

const MagezonFlickr = (props) => (
    <Core
        View={View}
        {...props}
    />
);

export default MagezonFlickr;
