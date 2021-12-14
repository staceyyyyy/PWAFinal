import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonColumn = (props) => {
    const {
        elements, xs_size, sm_size, md_size, lg_size, xl_size,
        xs_offset_size, sm_offset_size, md_offset_size, lg_offset_size, xl_offset_size,
        xs_hide, sm_hide, md_hide, lg_hide, xl_hide, storeConfig,
    } = props;
    const classes = useStyles(props);
    let classColumn = 'mgz-column ';
    if (xs_size && xs_size !== '') classColumn += `col-xs-${xs_size} `;
    if (sm_size && sm_size !== '') classColumn += `col-sm-${sm_size} `;
    if (md_size && md_size !== '') classColumn += `col-md-${md_size} `;
    if ((lg_size && lg_size !== '') || (xl_size && xl_size !== '')) classColumn += `col-lg-${lg_size} `;

    if (xs_offset_size && xs_offset_size !== '') classColumn += `col-xs-offset-${xs_offset_size} `;
    if (sm_offset_size && sm_offset_size !== '') classColumn += `col-sm-offset-${sm_offset_size} `;
    if (md_offset_size && md_offset_size !== '') classColumn += `col-md-offset-${md_offset_size} `;
    if ((lg_offset_size && lg_offset_size !== '') || (xl_offset_size && xl_offset_size !== '')) classColumn += `col-lg-offset-${lg_offset_size} `;

    if (xs_hide) classColumn += 'hidden-mobile ';
    if (sm_hide) classColumn += 'hidden-sm ';
    if (md_hide) classColumn += 'hidden-md ';
    if (lg_hide || xl_hide) classColumn += 'hidden-lg ';

    if (!classColumn.includes('col-')) {
        classColumn += 'col-xs-12 col-lg-12';
    }

    return (
        <>
            <div className={`${classes.container} ${classColumn}`}>
                { elements && elements.length > 0 && elements.map((item, key) => (
                    <MagezonElement key={key} {...item} storeConfig={storeConfig} />
                )) }
            </div>
            <style jsx>
                {
                    `
                        .col-md-15 {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                        .col-md-25 {
                            flex: 1 40%;
                            max-width: 40%;
                        }
                        .col-md-35 {
                            flex: 1 60%;
                            max-width: 60%;
                        }
                        .col-md-45 {
                            flex: 1 80%;
                            max-width: 80%;
                        }
                    `
                }
            </style>
        </>
    );
};

export default MagezonColumn;
