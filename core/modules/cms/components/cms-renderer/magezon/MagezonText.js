/* eslint-disable react/no-danger */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonText = (props) => {
    const {
        content, ...other
    } = props;
    const classes = useStyles(props);
    return (
        <div className={`${classes.container}`}>
            <WidgetRenderer content={content} {...other} />
        </div>
    );
};

export default MagezonText;
