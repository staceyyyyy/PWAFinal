import Core from '@plugin_optionitem/Virtual/core';
import View from '@plugin_optionitem/Virtual/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
