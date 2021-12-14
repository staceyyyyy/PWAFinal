import React from 'react';
import { getPageBuilderTemplate } from '@core_modules/cms/services/graphql';
import Alert from '@material-ui/lab/Alert';
import Loading from '@common_loaders/Backdrop';
import MagezonRenderer from '@core_modules/cms/components/cms-renderer/MagezonRenderer';

const MagezonPagebuilderTemplate = (props) => {
    const { template_id } = props;
    // const { t } = props;
    const { data, loading, error } = getPageBuilderTemplate({ identifier: template_id });
    if (loading) {
        return <Loading open={loading} />;
    }
    if (error) {
        return (
            <Alert severity="error">{error}</Alert>
        );
    }
    if (data && data.getPageBuilderTemplate.data && data.getPageBuilderTemplate.data.length > 0) {
        const content = data.getPageBuilderTemplate.data;
        return <MagezonRenderer content={content} {...props} />;
    }
    return null;
};

export default MagezonPagebuilderTemplate;
