import Core from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/core';
import View from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/view';
import LoadView from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/components/LoadView';
import React from 'react';

const MagezonInstagramFeed = (props) => (
    <Core
        View={View}
        LoadView={LoadView}
        {...props}
    />
);

export default MagezonInstagramFeed;
