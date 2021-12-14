import ViewMobile from '@core_modules/customer/pages/account/components/Customer/view/mobile';
import ViewDesktop from '@core_modules/customer/pages/account/components/Customer/view/desktop';

const CustomerView = (props) => (
    <>
        <ViewDesktop {...props} />
        <ViewMobile {...props} />
    </>
);

export default CustomerView;
