import React from 'react';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonEmpty = (props) => {
    const { height } = props;
    const classes = useStyles(props);
    let width = '';
    if (typeof window !== 'undefined') {
        width = window.innerWidth;
    }
    return (
        <div className={`${classes.container} magezon-empty`}>
            <style jsx global>
                {`
                    .magezon-empty {
                        width: ${width}px;
                        height: ${height}px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonEmpty;
