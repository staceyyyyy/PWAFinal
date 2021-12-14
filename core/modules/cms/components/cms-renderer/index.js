/* eslint-disable consistent-return */
import React, { memo } from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import MagezonRenderer from '@core_modules/cms/components/cms-renderer/MagezonRenderer';

const CmsRenderer = (props) => {
    const { content } = props;
    if (content.includes('[mgz_pagebuilder]')) {
        return <MagezonRenderer {...props} />;
    }
    return <WidgetRenderer {...props} />;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(CmsRenderer, notRenderIf);
