import Core from '@plugin_optionitem/BundleOption/core';
import View from '@plugin_optionitem/BundleOption/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
