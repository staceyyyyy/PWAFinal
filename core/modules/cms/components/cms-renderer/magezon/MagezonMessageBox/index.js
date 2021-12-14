import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import classnames from 'classnames';

const MagezonMessageBox = (props) => {
    // prettier-ignore
    const {
        content, icon, icon_size,
        message_box_color, message_box_background_color,
        message_icon_color, message_icon_background_color,
        message_box_border_radius, message_box_border_width, message_box_border_color,
    } = props;

    const classes = useStyles({
        message_icon_color,
        message_icon_background_color,
        icon_size: icon_size ? `${icon_size}px` : '1.7em',
    });

    return (
        <>
            <div className={classnames(classes.mgzMessageBox, 'mgz-message-box')}>
                {icon && (
                    <MagezonIcon icon={icon} icon_size={`${icon_size ? `${icon_size}px` : '1.7em'}`} />
                )}
                {/* eslint-disable-next-line react/no-danger */}
                <div className="mgz-message-box-content" dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            <style jsx>
                {`
                    .mgz-message-box {
                        padding: 1em 1em 1em 4em;
                        margin: 0;
                        display: block;
                        position: relative;
                        overflow: hidden;
                        border-radius: ${message_box_border_radius || '3px'};
                        border-width: ${message_box_border_width || '1px'};
                        border-color: ${message_box_border_color};
                        background-color: ${message_box_background_color};
                    }
                    .mgz-message-box-content {
                        color: ${message_box_color};
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-message-box .mgz-message-box-content p:last-child {
                        margin-top: 0;
                        margin-bottom: 0;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonMessageBox;
