import { getCmsBlocks } from '@core_modules/cart/services/graphql';

const GimmickBanner = (props) => {
    const { data = [] } = props;
    const identifiers = [];
    if (data && data.length > 0) {
        data.forEach(({ cms_block_identifier }) => {
            identifiers.push(cms_block_identifier);
        });
    }

    const { data: dataCms, loading, error } = getCmsBlocks({ identifiers });

    if (!loading && !error && dataCms && dataCms.cmsBlocks && dataCms.cmsBlocks.items && dataCms.cmsBlocks.items.length > 0) {
        return (
            <div className="gimmick-banner">
                {
                    dataCms.cmsBlocks.items.map((item) => (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    ))
                }
                <style jsx global>
                    {`
                        .gimmick-banner img {
                            max-height: initial;
                            max-width: 100%;
                            height: auto;
                            border: 0;
                        }
                    `}
                </style>
            </div>
        );
    }

    return null;
};

export default GimmickBanner;
