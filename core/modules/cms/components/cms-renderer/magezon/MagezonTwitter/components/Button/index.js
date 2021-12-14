const Share = (props) => {
    const {
        share_via,
        share_hashtag,
        share_recommend,
        large_button,
        share_text_page_title,
        share_text_custom_text,
        share_use_custom_url,
        show_followers_count,
        lang,
    } = props;

    return (
        <>
            <a
                href="https://twitter.com/intent?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-text={share_text_page_title === false ? share_text_custom_text : ''}
                data-url={share_use_custom_url}
                data-hashtags={share_hashtag}
                data-via={share_via}
                data-related={share_recommend}
                data-size={large_button && 'large'}
                data-lang={lang}
                data-show-count={show_followers_count}
            >
                Tweet
            </a>
        </>
    );
};

const Follow = (props) => {
    const {
        follow_show_username, follow_user, large_button, show_followers_count, lang, t,
    } = props;

    return (
        <>
            <a
                href={`https://twitter.com/${follow_user}?ref_src=twsrc%5Etfw`}
                className="twitter-follow-button"
                data-show-screen-name={follow_show_username}
                data-size={large_button && 'large'}
                data-lang={lang}
                data-show-count={show_followers_count}
            >
                {follow_show_username && `${t('common:twitter:follow')} @${follow_user}`}
            </a>
        </>
    );
};

const Hashtag = (props) => {
    const {
        hashtag_recommend_1,
        hashtag_recommend_2,
        hashtag_tweet_url,
        hashtag_hash,
        hashtag_tweet_text,
        large_button,
        show_followers_count,
        lang,
    } = props;

    return (
        <>
            <a
                href={`https://twitter.com/intent/tweet?button_hashtag=${hashtag_hash}&ref_src=twsrc%5Etfw`}
                className="twitter-hashtag-button"
                data-text={hashtag_tweet_text}
                data-url={hashtag_tweet_url}
                data-related={`${hashtag_recommend_1},${hashtag_recommend_2}`}
                data-size={large_button && 'large'}
                data-lang={lang}
                data-show-count={show_followers_count}
            >
                {`${hashtag_tweet_text} ${hashtag_hash}`}
            </a>
        </>
    );
};

const Mention = (props) => {
    const {
        mention_recommend_1, mention_recommend_2, mention_tweet_text, mention_tweet_to, large_button, show_followers_count, lang, t,
    } = props;

    return (
        <>
            <a
                href={`https://twitter.com/intent/tweet?screen_name=${mention_tweet_to}&ref_src=twsrc%5Etfw`}
                className="twitter-mention-button"
                data-text={mention_tweet_text}
                data-related={`${mention_recommend_1},${mention_recommend_2}`}
                data-size={large_button && 'large'}
                data-lang={lang}
                data-show-count={show_followers_count}
            >
                {mention_tweet_to && `${t('common:tweetTo')} ${mention_tweet_to}`}
            </a>
        </>
    );
};

const MagezonTwitterButton = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, button_type, t,
    } = props;
    let content;
    let className = 'magezon-twitter';

    if (xs_hide) className += ' hidden-mobile ';
    if (sm_hide) className += ' hidden-sm ';
    if (md_hide) className += ' hidden-md ';
    if (lg_hide) className += ' hidden-lg ';

    if (button_type === 'share') content = <Share {...props} />;
    if (button_type === 'follow') content = <Follow t={t} {...props} />;
    if (button_type === 'hashtag') content = <Hashtag {...props} />;
    if (button_type === 'mention') content = <Mention t={t} {...props} />;

    return (
        <>
            <div className={className}>{content}</div>
        </>
    );
};

export default MagezonTwitterButton;
