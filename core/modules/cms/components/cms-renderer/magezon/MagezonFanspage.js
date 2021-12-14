import React from 'react';
import {
    FacebookProvider, Page, Comments, Like,
} from 'react-facebook';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import { features } from '@config';

const MagezonFanspage = (props) => {
    const { page_url, btn_url, type } = props;
    const classes = useStyles(props);
    let contentType = '';
    let url = '';
    if (type === 'facebook_comments') {
        url = page_url;
        contentType = (
            <FacebookProvider appId={features.facebookMetaId.app_id}>
                <Comments href={url} />
            </FacebookProvider>
        );
    } else if (type === 'facebook_page') {
        url = page_url;
        contentType = (
            <FacebookProvider appId={features.facebookMetaId.app_id}>
                <Page href={url} tabs="timeline" />
            </FacebookProvider>
        );
    } else {
        url = btn_url;
        contentType = (
            <FacebookProvider appId={features.facebookMetaId.app_id}>
                <Like href={url} colorScheme="dark" showFaces share />
            </FacebookProvider>
        );
    }

    return <div className={`${classes.container}`}>{contentType}</div>;
};

export default MagezonFanspage;
