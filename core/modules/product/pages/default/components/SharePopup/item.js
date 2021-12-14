/* eslint-disable no-nested-ternary */
import { shareIcon } from '@config';
import { getHost } from '@helper_config';
import {
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
    EmailIcon,
    EmailShareButton,
} from 'react-share';

const ItemShare = (props) => {
    const { link = getHost() } = props;
    const data = Object.entries(shareIcon);
    return (
        <>
            {data.map((item, key) => (item[0] === 'facebook' && item[1] === true ? (
                <FacebookShareButton url={link} key={key}>
                    <FacebookIcon size={30} round />
                </FacebookShareButton>
            ) : item[0] === 'twitter' && item[1] === true ? (
                <TwitterShareButton url={link} key={key}>
                    <TwitterIcon size={30} round />
                </TwitterShareButton>
            ) : item[0] === 'line' && item[1] === true ? (
                <LineShareButton url={link} key={key}>
                    <LineIcon size={30} round />
                </LineShareButton>
            ) : item[0] === 'pinterest' && item[1] === true ? (
                <PinterestShareButton url={link} key={key}>
                    <PinterestIcon size={30} round />
                </PinterestShareButton>
            ) : item[0] === 'telegram' && item[1] === true ? (
                <TelegramShareButton url={link} key={key}>
                    <TelegramIcon size={30} round />
                </TelegramShareButton>
            ) : item[0] === 'email' && item[1] === true ? (
                <EmailShareButton url={link} key={key}>
                    <EmailIcon size={30} round />
                </EmailShareButton>
            ) : (
                item[0] === 'linkedin'
                    && item[1] === true && (
                    <LinkedinShareButton url={link} key={key}>
                        <LinkedinIcon size={30} round />
                    </LinkedinShareButton>
                )
            )))}
        </>
    );
};

export default ItemShare;
