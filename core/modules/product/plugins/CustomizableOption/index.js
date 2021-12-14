/* eslint-disable no-underscore-dangle */
import React from 'react';
import Content from '@plugin_customizableitem/components';
import Core from '@plugin_customizableitem/core';

const CustomizableOption = (props) => {
    const { showCustomizableOption } = props;
    return (
        <>
            {showCustomizableOption && (
                <Core
                    {...props}
                    Content={Content}
                />
            )}
        </>
    );
};

CustomizableOption.defaultProps = {
    showCustomizableOption: false,
};

export default CustomizableOption;
