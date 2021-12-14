/* eslint-disable react/no-danger */
const SocialView = (props) => {
    const { data } = props;
    return (
        <>
            <style jsx>
                {`
                    .cms-container {
                        text-align: center;
                        padding: 48px;
                        font-size: 24px;
                    }
                    .cms-container :global(.social-media-links) {
                        display: inline-block;
                        background-color: #f2f2f2;
                        padding: 8px 12px;
                        border-radius: 8px;
                    }
                `}
            </style>
            <div
                className="cms-container"
                dangerouslySetInnerHTML={{ __html: data && data.cmsBlocks ? data.cmsBlocks.items[0].content : '' }}
            />
        </>
    );
};

export default SocialView;
