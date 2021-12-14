import Layout from '@layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { setCartId } from '@helper_cartid';
import { reOrder as mutationReorder, getCmsBlocks } from '@core_modules/customer/services/graphql';

const Customer = dynamic(() => import('@core_modules/customer/pages/account/components/Customer'), { ssr: false });

const CustomerAccount = (props) => {
    const {
        t, isLogin, CustomerView, Skeleton, GuestView, pageConfig,
    } = props;
    const router = useRouter();
    const config = {
        title: t('customer:dashboard:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'account',
    };
    const [actionReorder] = mutationReorder();
    const {
        data,
    } = getCmsBlocks({ identifiers: ['pwa_footer'] });

    const reOrder = (order_id) => {
        if (order_id && order_id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id,
                },
            }).then(async (res) => {
                if (res.data && res.data.reorder && res.data.reorder.cart_id) {
                    await setCartId(res.data.reorder.cart_id);
                    setTimeout(() => {
                        router.push('/checkout/cart');
                    }, 1000);
                }
                window.backdropLoader(false);
            }).catch(() => {
                window.backdropLoader(false);
            });
        }
    };

    if (isLogin) {
        return (
            <Layout pageConfig={pageConfig || config} {...props}>
                <Customer {...props} data={data} CustomerView={CustomerView} Skeleton={Skeleton} reOrder={reOrder} />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <GuestView {...props} data={data} />
        </Layout>
    );
};

export default CustomerAccount;
