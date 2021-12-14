import React from 'react';
import { checkBalance } from '@core_modules/customer/services/graphql';

const ModalDetail = ({
    open, close, code, storeConfig, t, DetailView,
}) => {
    let loading = false;
    let data = null;
    let error = null;
    if (open) {
        const getBalance = checkBalance(code);
        loading = getBalance.loading;
        data = getBalance.data;
        error = getBalance.error;
    }
    return (
        <DetailView
            t={t}
            loading={loading}
            data={data}
            error={error}
            open={open}
            close={close}
            storeConfig={storeConfig}
            code={code}
        />
    );
};

export default ModalDetail;
