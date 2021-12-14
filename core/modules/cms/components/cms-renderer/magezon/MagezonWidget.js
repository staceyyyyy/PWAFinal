/* eslint-disable react/no-danger */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonWidget = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, magento_widget, ...other
    } = props;
    const styles = useStyles(props);
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    return (
        <div className={`magezon-widget ${classes} ${styles.container}`}>
            <WidgetRenderer content={magento_widget} {...other} />
            <style jsx>
                {`
                    .magezon-widget {
                        margin-bottom: 20px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonWidget;
