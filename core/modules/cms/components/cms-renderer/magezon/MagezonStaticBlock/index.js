import React from 'react';
import View from '@core_modules/cms/components/cms-renderer/magezon/MagezonStaticBlock/view';
import { getCmsBlocks } from '@core_modules/cms/services/graphql';
import Alert from '@material-ui/lab/Alert';
import Loading from '@common_loaders/Backdrop';

const MagezonStaticBlock = (props) => {
    const { identifier, ...other } = props;
    const { t } = props;
    const { data, loading, error } = getCmsBlocks({ identifiers: [identifier] });
    if (loading) {
        return <Loading open={loading} />;
    }
    if (error) {
        return (
            <Alert severity="error">{t('common:error:fetchError')}</Alert>
        );
    }
    if (data && data.cmsBlocks && data.cmsBlocks.items && data.cmsBlocks.items.length > 0) {
        return (
            <View
                {...other}
                content={data.cmsBlocks.items[0].content}
            />
        );
    }
    return null;
};

export default MagezonStaticBlock;
