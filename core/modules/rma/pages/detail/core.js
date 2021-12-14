/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { useRouter } from 'next/router';
import { getUpdateFormRma, getCustomer } from '@core_modules/rma/services/graphql';
import Content from '@core_modules/rma/pages/detail/components';

const CoreLanding = (props) => {
    const {
        t, Loader, WarningInfo, pageConfig = {}, ...other
    } = props;
    const router = useRouter();
    const { id } = router.query;

    const config = {
        title: `${t('rma:view:label')} #${id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('rma:view:label')} #${id}`,
        bottomNav: false,
        ...pageConfig,
    };

    let objectData = {};
    let customerData = {
        email: '',
    };
    const loadCustomerData = getCustomer();
    if (loadCustomerData.data && loadCustomerData.data.customer) {
        customerData = loadCustomerData.data.customer;
    }
    const paramsFormRma = {
        variables: {
            email: customerData.email || '',
            increment_id: id,
        },
        skip: typeof window === 'undefined' || loadCustomerData.loading,
    };

    const {
        loading, data, error, refetch,
    } = getUpdateFormRma(paramsFormRma);

    if (!loading && data && data.getUpdateFormDataAwRma) {
        // eslint-disable-next-line prefer-destructuring
        objectData = data.getUpdateFormDataAwRma;
    }

    const contentprops = {
        t,
        Loader,
        WarningInfo,
        data: objectData,
        loading,
        refetch,
        customerData,
        error,
        loadCustomerData,
    };

    return (
        <DefaultLayout {...props} pageConfig={config}>
            <Content
                {...other}
                {...contentprops}
            />
        </DefaultLayout>
    );
};

CoreLanding.propTypes = {
    Loader: propTypes.func.isRequired,
    WarningInfo: propTypes.func.isRequired,
    ItemProduct: propTypes.func.isRequired,
    ListMessage: propTypes.func.isRequired,
    ItemFieldView: propTypes.func.isRequired,
    FormComment: propTypes.func.isRequired,
    Detail: propTypes.func.isRequired,
    Footer: propTypes.func.isRequired,
};

export default CoreLanding;
