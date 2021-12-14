import React from 'react';
import { features } from '@config';
import WidgetSliderCaraousel from '@core_modules/cms/components/cms-renderer/widget-slider-caraousel';
import {
    getCmsBlocks,
} from '@core_modules/theme/services/graphql';

const GlobalPromoMessage = (props) => {
    const { storeConfig, showGlobalPromo, ...other } = props;
    const { key_cookies } = features.globalPromo;
    const { data } = getCmsBlocks({
        identifiers: 'weltpixel_global_promo_message',
    });

    if (storeConfig.global_promo.enable && showGlobalPromo && data
        && data.cmsBlocks && data.cmsBlocks.items[0] && data.cmsBlocks.items[0].content) {
        return (
            <WidgetSliderCaraousel
                content={data.cmsBlocks.items[0].content}
                key_cookies={key_cookies}
                backgroundColor={storeConfig.global_promo.background_color}
                textColor={storeConfig.global_promo.text_color}
                storeConfig={storeConfig}
                {...other}
            />
        );
    }

    return null;
};

export default GlobalPromoMessage;
