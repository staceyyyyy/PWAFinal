import React from 'react';
import Layout from '@layout';
// import CancelSubscribe from '../../../commons/CancelSubscribe';
import CancelSubscribe from '@common_unSubscribe'
// import CancelSubscribe from '@common_cancelSubscribe/'
const Country = (props)=> {
    const { t, pageConfig, Content } = props;
    const Config = {
        title: "Unsubscribe",
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: false,
        pageType: 'other',
        header: 'relative',
    };
    return(
        <Layout {...props} pageConfig={Config}>
            <CancelSubscribe/>
        </Layout>
    )
}
export default Country