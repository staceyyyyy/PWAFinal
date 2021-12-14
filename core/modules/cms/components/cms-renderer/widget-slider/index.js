import React from 'react';
import { withTranslation } from '@i18n';

import BannerSliderSkeleton from '@core_modules/home/pages/default/components/Skeleton/BannerSkeleton';
import BannerView from '@core_modules/home/pages/default/components/Banner/view';
import BannerSlider from '@core_modules/home/pages/default/components/Banner';
import ErrorInfo from '@core_modules/home/pages/default/components/ErrorInfo';

const WidgetSlider = (props) => {
    const { ...other } = props;

    return <BannerSlider BannerSliderSkeleton={BannerSliderSkeleton} BannerView={BannerView} ErrorInfo={ErrorInfo} {...other} />;
};

export default withTranslation()(WidgetSlider);
