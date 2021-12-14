import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import CoreBase from '@core_modules/rma/pages/detail/core';
import Skeleton from '@core_modules/rma/pages/detail/components/Skeleton';
import WarningInfo from '@core_modules/rma/pages/detail/components/Info';
import ItemProduct from '@core_modules/rma/pages/detail/components/ItemProduct';
import ListMessage from '@core_modules/rma/pages/detail/components/ListMessage';
import ItemFieldView from '@core_modules/rma/pages/detail/components/ItemField/view';
import FormComment from '@core_modules/rma/pages/detail/components/FormComment';
import Detail from '@core_modules/rma/pages/detail/components/Detail';
import Footer from '@core_modules/rma/pages/detail/components/Footer';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProduct={ItemProduct}
        ListMessage={ListMessage}
        ItemFieldView={ItemFieldView}
        FormComment={FormComment}
        Detail={Detail}
        Footer={Footer}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
