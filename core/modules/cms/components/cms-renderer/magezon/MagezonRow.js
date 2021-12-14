import React from 'react';
import MagezonColumn from '@core_modules/cms/components/cms-renderer/magezon/MagezonColumn';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonRow = (props) => {
    const {
        elements, xs_hide, sm_hide, md_hide, lg_hide, storeConfig, max_width, content_align,
    } = props;
    const classes = useStyles(props);
    let classRow = 'row ';

    if (max_width && max_width !== '') classRow += 'mgz-element-row-max-width';
    if (xs_hide) classRow += 'hidden-mobile ';
    if (sm_hide) classRow += 'hidden-sm ';
    if (md_hide) classRow += 'hidden-md ';
    if (lg_hide) classRow += 'hidden-lg ';
    return (
        <>
            <div className={`${classes.container} ${classRow}`}>
                {elements && elements.length > 0 && elements.map((item, key) => <MagezonColumn key={key} {...item} storeConfig={storeConfig} />)}
            </div>
            {/* eslint-disable no-nested-ternary */}
            <style jsx>
                {`
                    .mgz-element-row-max-width {
                        width: ${max_width}px;
                        max-width: 100%;
                        margin: ${content_align === 'left' ? 'auto 0 0 0' : content_align === 'center' ? 'auto' : '0 0 0 auto'};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonRow;
