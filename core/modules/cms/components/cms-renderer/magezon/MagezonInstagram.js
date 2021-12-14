import React from 'react';
import Typography from '@common_typography';
import Link from '@material-ui/core/Link';

const MagezonInstagram = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, title, title_tag,
        title_align, line_position, line_color, line_width, title_color,
        link_text, instagram_username,
    } = props;
    let classInstagram = 'magezon-instagram ';
    if (xs_hide) classInstagram += 'hidden-mobile ';
    if (sm_hide) classInstagram += 'hidden-sm ';
    if (md_hide) classInstagram += 'hidden-md ';
    if (lg_hide) classInstagram += 'hidden-lg ';
    return (
        <div className={classInstagram}>
            <div className="magezone-title-instagram-box">
                <Typography
                    variant={title_tag}
                    align={title_align}
                    className="magezon-title-instagram"
                >
                    {title}
                </Typography>
            </div>

            <Link
                href={`https://instagram.com/${instagram_username}`}
                target="_blank"
                color="inherit"
                underline="none"
            >
                <Typography
                    variant="span"
                    letter="capitalize"
                    size="14"
                >
                    {link_text}
                </Typography>
            </Link>
            <style jsx global>
                {`
                    .magezon-instagram {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                    .magezone-title-instagram-box {
                        width:100%;
                        text-align:${title_align}; 
                        position: relative;
                        margin-bottom: 10px;
                    }
                    .magezon-title-instagram {        
                        position:relative; 
                        padding:12px;
                        color: ${title_color};
                        background: #fff;
                        display: inline-block;
                        text-transform: uppercase;
                        z-index: 1
                    }
                    .magezone-title-instagram-box::after {
                        content:'';
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: ${line_position === 'center' ? '50%' : '100%'};
                        height: ${line_width}px;
                        background: ${line_color};
                        z-index:0;
                     } 
                `}
            </style>
        </div>
    );
};

export default MagezonInstagram;
