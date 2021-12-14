import Core from '@plugin_optionitem/ConfigurableOption/core';
import View from '@plugin_optionitem/ConfigurableOption/view';

const ConfigurableOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default ConfigurableOptionItem;
