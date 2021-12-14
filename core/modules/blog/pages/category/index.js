/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import DefaultContent from '@core_modules/blog/pages/category/components';
import CoreBase from '@core_modules/blog/pages/category/core';
import Skeleton from '@core_modules/blog/pages/category/components/Skeleton';
import WarningInfo from '@core_modules/blog/components/Info';
import ContentCategory from '@core_modules/blog/components/ModalCategory';
import ContentItem from '@core_modules/blog/components/Details';

const DefaultCategory = (props) => (
    <CoreBase
        Content={DefaultContent}
        ContentCategory={ContentCategory}
        ContentItem={ContentItem}
        Skeleton={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

DefaultCategory.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultCategory));
