/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';

const MagezonVideoPlayer = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, disable_element,
        line_color, line_width, show_line,
        title, title_align, title_color, title_tag,
        link, video_title, video_type,
        controls, autoplay, loop, mute,
    } = props;
    const { t } = useTranslation(['common']);

    let classVideoPlayer = '';
    if (xs_hide) classVideoPlayer += 'hidden-mobile ';
    if (sm_hide) classVideoPlayer += 'hidden-sm ';
    if (md_hide) classVideoPlayer += 'hidden-md ';
    if (lg_hide) classVideoPlayer += 'hidden-lg ';

    const MgzVideoHeader = () => {
        if (title) {
            if (show_line) {
                return (
                    <div className="mgz-video-header">
                        {(title_align === 'center' || title_align === 'right') ? <hr /> : null}
                        <Typography
                            variant={title_tag || 'h1'}
                            className="mgz-video-title"
                        >
                            {title || ''}
                        </Typography>
                        {(title_align === 'center' || title_align === 'left') ? <hr /> : null}
                        <style jsx>
                            {`
                                .mgz-video-header > hr {
                                    flex: 1;
                                    height: ${line_width}px;
                                    background: ${line_color};
                                    border: unset;
                                }
                            `}
                        </style>
                    </div>
                );
            }
            return (
                <div className="mgz-video-header">
                    <Typography
                        variant={title_tag || 'h1'}
                        className="mgz-video-title"
                    >
                        {title || ''}
                    </Typography>
                </div>
            );
        }
        return null;
    };
    const MgzVideoPlayer = () => {
        let videoLink = link.replace('{{mgzlink ', '').replace('}}', '');
        let videoId = '';
        const parameters = {};
        if (controls) parameters.controls = true;
        if (mute) parameters.muted = true;
        if (autoplay) parameters.autoPlay = true;
        if (loop) parameters.loop = true;
        if (video_type === 'local') {
            return (
                <div className="mgz-video-content">
                    <video {...parameters}>
                        <source src={videoLink} />
                        {t('common.error.videoNotSupported')}
                    </video>
                </div>
            );
        }
        if (video_type === 'vimeo') {
            videoId = videoLink.split('/');
            videoLink = `https://player.vimeo.com/video/${videoId[3]}`;
        }
        if (video_type === 'youtube') {
            const videoUrl = link && link.split('=')[1];
            videoLink = `https://www.youtube.com/embed/${videoUrl}`;
        }
        return (
            <div className="mgz-video-content">
                <iframe
                    src={`${videoLink}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    title={video_title}
                />
            </div>
        );
    };

    if (!disable_element) {
        return (
            <div className={classVideoPlayer}>
                <MgzVideoHeader />
                <MgzVideoPlayer />
                <style jsx global>
                    {`
                        .mgz-video-header {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 5px;
                            width: 100%;
                            margin-bottom: 10px;
                        }
                        .mgz-video-title {
                            color: ${title_color};
                            text-transform: uppercase;
                        }
                        .mgz-video-content {
                            text-align: center;
                        }
                        .mgz-video-content iframe {
                            width: 100%;
                            aspect-ratio: 16/9;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default MagezonVideoPlayer;
