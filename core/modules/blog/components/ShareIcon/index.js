/* eslint-disable no-nested-ternary */
import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';
import { shareIcon } from '@config';
import useStyles from '@core_modules/blog/components/ShareIcon/style';

const ShareComp = ({ url }) => {
    const styles = useStyles();
    const icons = Object.entries(shareIcon);
    return (
        <div className={styles.listShareIcon}>
            {icons.map((item, key) => (item[0] === 'facebook' && item[1] === true ? (
                <FacebookShareButton url={url} key={key} className={styles.iconShare}>
                    <FacebookIcon size={16} />
                </FacebookShareButton>
            ) : item[0] === 'twitter' && item[1] === true ? (
                <TwitterShareButton url={url} key={key} className={styles.iconShare}>
                    <TwitterIcon size={16} />
                </TwitterShareButton>
            ) : item[0] === 'line' && item[1] === true ? (
                <LineShareButton url={url} key={key} className={styles.iconShare}>
                    <LineIcon size={16} />
                </LineShareButton>
            ) : item[0] === 'pinterest' && item[1] === true ? (
                <PinterestShareButton url={url} key={key} className={styles.iconShare}>
                    <PinterestIcon size={16} />
                </PinterestShareButton>
            ) : item[0] === 'telegram' && item[1] === true ? (
                <TelegramShareButton url={url} key={key} className={styles.iconShare}>
                    <TelegramIcon size={16} />
                </TelegramShareButton>
            ) : item[0] === 'email' && item[1] === true ? (
                <EmailShareButton url={url} key={key} className={styles.iconShare}>
                    <EmailIcon size={16} />
                </EmailShareButton>
            ) : (
                item[0] === 'linkedin'
                    && item[1] === true && (
                    <LinkedinShareButton url={url} key={key} className={styles.iconShare}>
                        <LinkedinIcon size={16} />
                    </LinkedinShareButton>
                )
            )))}
        </div>
    );
};

export default ShareComp;
