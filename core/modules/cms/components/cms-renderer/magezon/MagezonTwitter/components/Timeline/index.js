const TwitterTimeline = (props) => {
    const {
        box_height, box_width, limit, theme, page_url, chrome, show_replies, t,
    } = props;

    return (
        <>
            <a
                className="twitter-timeline"
                data-width={box_width}
                data-height={box_height}
                data-theme={theme}
                data-tweet-limit={limit}
                data-chrome={chrome}
                show-replies={show_replies}
                href={`https://twitter.com/${page_url}?ref_src=twsrc%5Etfw`}
            >
                {`${t('common:twitter:tweetBy')} ${page_url}`}
            </a>
        </>
    );
};

export default TwitterTimeline;
