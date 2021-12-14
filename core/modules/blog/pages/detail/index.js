/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import DefaultContent from '@core_modules/blog/pages/detail/components';
import CoreBase from '@core_modules/blog/pages/detail/core';
import Skeleton from '@core_modules/blog/pages/detail/components/Skeleton';
import WarningInfo from '@core_modules/blog/components/Info';

const DetailPage = (props) => (
    <CoreBase
        Content={DefaultContent}
        Skeleton={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

DetailPage.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(DetailPage));
