import React from 'react';
import ContactForm from '@core_modules/contact/pages/default/index';

const MagezonContactForm = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, disable_element,
    } = props;
    let classContact = '';
    if (xs_hide) classContact += 'hidden-mobile ';
    if (sm_hide) classContact += 'hidden-sm ';
    if (md_hide) classContact += 'hidden-md ';
    if (lg_hide) classContact += 'hidden-lg ';
    if (!disable_element) {
        return (
            <div className={classContact}>
                <ContactForm isCms />
            </div>
        );
    }
    return null;
};

export default MagezonContactForm;
