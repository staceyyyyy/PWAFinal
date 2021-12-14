import React from 'react';
import ProgressBar from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/ProgressBarLayout';
import CircleLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/CircleLayout';
import NumberLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/NumberLayout';

const MagezonCounter = (props) => {
    const { layout } = props;
    let content = '';

    if (layout === 'circle') {
        content = <CircleLayout {...props} />;
    } else if (layout === 'bars') {
        content = <ProgressBar height={60} {...props} />;
    } else {
        content = <NumberLayout {...props} />;
    }

    return (
        <div>
            <div className="progress-wrapper">{content}</div>
            <style jsx global>
                {`
                    .progress-wrapper {
                        width: auto;
                        margin-bottom: 1rem;
                        margin-top: 1rem;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonCounter;
