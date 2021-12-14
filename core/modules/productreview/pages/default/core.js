import Layout from '@layout';
import { getReview } from '@core_modules/productreview/services/graphql';

const PageReview = (props) => {
    const {
        t, Content, pageConfig, rowsPerPage = 10,
    } = props;
    const config = {
        title: t('productreview:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('productreview:title'),
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
    let reviewCustomer = null;
    const { data, loading } = getReview(
        {
            pageSizeReview: perPage,
            currentPageReview: page + 1,
        },
    );
    if (data) {
        reviewCustomer = data.customer.reviews;
    }
    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                reviewCustomer={reviewCustomer}
                loading={loading}
                rowsPerPage={perPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Layout>
    );
};

export default PageReview;
