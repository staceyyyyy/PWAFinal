import React from 'react';
import NewsletterForm from '@plugin_newsletter';

const MagezonNewsletter = (props) => {
    const { disable_element } = props;
    if (!disable_element) {
        return (
            <div>
                <NewsletterForm isCms {...props} />
                <style jsx global>
                    {`
                        .container {
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default MagezonNewsletter;
