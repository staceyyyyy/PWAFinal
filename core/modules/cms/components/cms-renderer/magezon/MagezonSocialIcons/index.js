import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';

const MagezonSocialIcons = (props) => {
    const {
        items, link_target, icon_radius, icon_size, follow_button,
    } = props;

    const generatebgColor = (icon) => {
        let backgroundColor;
        if (icon.includes('facebook')) backgroundColor = '#3b5998';
        else if (icon.includes('twitter')) backgroundColor = '#00aced';
        else if (icon.includes('linkedin')) backgroundColor = '#007bb6';
        else if (icon.includes('instagram')) backgroundColor = '#517fa4';
        else if (icon.includes('youtube')) backgroundColor = '#a82400';
        else if (icon.includes('pinterest')) backgroundColor = '#cb2027';
        else if (icon.includes('tumblr')) backgroundColor = '#32506d';
        else if (icon.includes('skype')) backgroundColor = '#12a5f4';
        else if (icon.includes('flickr')) backgroundColor = '#ff0084';
        else if (icon.includes('dribbble')) backgroundColor = '#ea4c8d';
        else if (icon.includes('vimeo')) backgroundColor = '#45bbff';
        else if (icon.includes('rss')) backgroundColor = '#ff8a3c';
        else if (icon.includes('behance')) backgroundColor = '#191919';

        return backgroundColor;
    };

    return (
        <>
            <div className="magezon-social-icons">
                {items.map((item, index) => {
                    const {
                        background_color, hover_background_color, icon, link,
                    } = item;
                    const backgroundColor = background_color || generatebgColor(icon);

                    return (
                        <div className="magezon-social-icons-inner">
                            <MagezonIcon
                                key={index}
                                icon={item.icon}
                                icon_size="xs"
                                link_url={link}
                                link_target={link_target}
                                icon_color="#ffffff"
                                icon_background_color={backgroundColor}
                                icon_border_radius={`${icon_radius ? `${icon_radius}px` : '3px'}`}
                                icon_hover_background_color={hover_background_color}
                            />
                            {follow_button && (
                                <span className="magezon-social-icons-follow-button">
                                    <MagezonLink link={link} link_target={link_target}>
                                        Follow
                                    </MagezonLink>
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            <style jsx>
                {`
                    .magezon-social-icons {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                    }
                    .magezon-social-icons-inner {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        margin-bottom: 8px;
                    }
                    .magezon-social-icons-follow-button {
                        color: #00000080;
                        background-color: #0000001a;
                        padding: 0 12px;
                        margin-right: 25px;
                    }
                    .magezon-social-icons-follow-button:hover {
                        cursor: pointer;
                    }
                    .magezon-social-icons-follow-button :global(a) {
                        color: #00000080;
                    }
                    .magezon-social-icons :global(i) {
                        ${icon_size && `font-size: ${icon_size}px;`}
                    }
                    .magezon-social-icons :global(.magezon-icon-inner) {
                        ${icon_size
                        && `
                          width: ${icon_size * 2}px;
                          height: ${icon_size * 2}px;
                        `}
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSocialIcons;
