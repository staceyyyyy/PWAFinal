import Core from '@plugin_optionitem/Download/core';
import View from '@plugin_optionitem/Download/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
