import React from 'react';
import { withTranslation } from '@i18n';
import { breakPointsUp } from '@helper_theme';
import { getBrands } from '@core_modules/brands/services/graphql';

import Featured from '@core_modules/brands/pages/default/components/featured';

const WidgetListBrand = (props) => {
    const { t } = props;
    const { data } = getBrands({ pageSize: 100, currentPage: 1 });

    const featured = data?.getBrandList?.featured;
    const desktop = breakPointsUp('sm');

    return <Featured useTitle={false} t={t} featured={featured} desktop={desktop} />;
};

export default withTranslation()(WidgetListBrand);
