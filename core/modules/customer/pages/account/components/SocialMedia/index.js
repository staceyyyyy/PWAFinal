/* eslint-disable react/no-danger */
import {
    cmsSocialMediaLinkIdentifiers,
} from '@config';
import { getCmsBlocks } from '@core_modules/customer/services/graphql';

const SocialMediaLink = (props) => {
    const { SocialMediaView } = props;
    const { error, loading, data } = getCmsBlocks({ identifiers: [cmsSocialMediaLinkIdentifiers] });
    if (error) return <div>{`Error: ${JSON.stringify(error)}`}</div>;
    if (loading) return <div />;

    return <SocialMediaView data={data} />;
};

export default SocialMediaLink;
