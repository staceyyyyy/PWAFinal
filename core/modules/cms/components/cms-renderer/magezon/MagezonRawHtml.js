/* eslint-disable react/no-danger */
import React from 'react';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonRawHtml = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, content,
    } = props;
    const styles = useStyles(props);
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    return (
        <div className={`${styles.container} ${classes}`}>
            <div className="magezone-html" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default MagezonRawHtml;
