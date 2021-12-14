import Core from '@core_modules/checkout/pages/default/components/ModalAddress/core';
import Content from '@core_modules/checkout/pages/default/components/ModalAddress/view';

const ModalAddress = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

export default ModalAddress;
