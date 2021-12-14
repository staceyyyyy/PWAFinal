import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import ItemView from '@core_modules/cart/pages/default/components/item';
import EmptyView from '@core_modules/cart/pages/default/components/empty';
import CrossSellView from '@core_modules/cart/pages/default/components/crosssell/view';
import SkeletonCart from '@core_modules/cart/pages/default/components/skeleton';
import EditDrawerView from '@core_modules/cart/pages/default/components/editDrawer';
import PromoModalItemView from '@core_modules/checkout/pages/default/components/PromoModalItem/view';
import Content from '@core_modules/cart/pages/default/components';

const Core = dynamic(() => import('./core'), { ssr: false });

const Page = (props) => (

    <Core
        {...props}
        ItemView={ItemView}
        EmptyView={EmptyView}
        CrossSellView={CrossSellView}
        SkeletonView={SkeletonCart}
        EditDrawerView={EditDrawerView}
        PromoModalItemView={PromoModalItemView}
        Content={Content}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart', 'checkout'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
