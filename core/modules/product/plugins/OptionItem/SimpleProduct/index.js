import Core from '@plugin_optionitem/SimpleProduct/core';
import View from '@plugin_optionitem/SimpleProduct/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
