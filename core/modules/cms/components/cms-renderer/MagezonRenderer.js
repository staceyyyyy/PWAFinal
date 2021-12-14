import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';

const MixedContent = (props) => {
    const {
        key, storeConfig, contents, ...item
    } = props;

    return (
        <>
            {contents[0] !== '' && <WidgetRenderer content={contents[0]} {...item} storeConfig={storeConfig} />}
            <MagezonElement {...item} storeConfig={storeConfig} />
            {contents[2] !== '' && <WidgetRenderer content={contents[2]} {...item} storeConfig={storeConfig} />}
        </>
    );
};

const MagezonRenderer = (props) => {
    const { content, storeConfig } = props;
    const mixedContents = content.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    const removeIdentifier = JSON.parse(mixedContents[1]);

    return (
        <>
            {
                removeIdentifier && removeIdentifier.elements && removeIdentifier.elements.length > 0
              && removeIdentifier.elements.map((item, key) => (
                  mixedContents[0] !== '' || mixedContents[2] !== ''
                      ? <MixedContent key={key} {...item} storeConfig={storeConfig} contents={mixedContents} />
                      : <MagezonElement key={key} {...item} storeConfig={storeConfig} />
              ))
            }
        </>
    );
};

export default MagezonRenderer;
