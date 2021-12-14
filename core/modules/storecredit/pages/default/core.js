import Layout from '@layout';
import { getStoreCredit } from '@core_modules/storecredit/services/graphql';

const PageStoreCredit = (props) => {
    const {
        t, Content, pageConfig, rowsPerPage = 10,
    } = props;
    const config = {
        title: t('storecredit:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('storecredit:title'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(0);
    const [perPage, setRowsPerPage] = React.useState(rowsPerPage);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };
    let storeCredit = {
        current_balance: {
            value: 0,
            currency: 'USD',
        },
        transaction_history: {
            items: [],
        },
    };
    const { data, loading } = getStoreCredit(
        {
            pageSizeStoreCredit: perPage,
            currentPageStoreCredit: page + 1,
        },
    );
    if (data) {
        storeCredit = data.customer.store_credit;
    }
    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                storeCredit={storeCredit}
                loading={loading}
                rowsPerPage={perPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Layout>
    );
};

export default PageStoreCredit;
