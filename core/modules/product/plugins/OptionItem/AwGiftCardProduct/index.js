/* eslint-disable arrow-body-style */

import Core from '@plugin_optionitem/AwGiftCardProduct/core';
import View from '@plugin_optionitem/AwGiftCardProduct/view';

const AwGiftCardProduct = (props) => {
    return (
        <>
            <Core {...props} View={View} />
        </>
    );
};

export default AwGiftCardProduct;
