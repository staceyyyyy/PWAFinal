/* eslint-disable react/no-danger */
import React from 'react';
import Button from '@common_button';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import classNames from 'classnames';

const MagezonButton = (props) => {
    const {
        title, link, icon, icon_position, onClick = () => {},
        button_align, button_color,
    } = props;
    const classes = useStyles(props);
    const wrapper = 'mgz-button';
    let isLeftIconPosition = '';

    if (icon_position) {
        if (icon_position === 'left') {
            isLeftIconPosition = true;
        } else {
            isLeftIconPosition = false;
        }
    }

    return (
        <div className={wrapper}>
            {link && link !== '' ? (
                <MagezonLink link={link}>
                    <Button className={classNames(classes.button, 'mgz-btn')} type="button" align={`${button_align || 'left'}`} onClick={onClick}>
                        {icon && isLeftIconPosition ? <MagezonIcon icon={icon} icon_color={button_color} /> : null}
                        {title || ''}
                        {icon && !isLeftIconPosition ? <MagezonIcon icon={icon} icon_color={button_color} /> : null}
                    </Button>
                </MagezonLink>
            ) : (
                <Button className={classes.button} type="button" align={`${button_align || 'left'}`} onClick={onClick}>
                    {icon && isLeftIconPosition ? <MagezonIcon icon={icon} icon_color={button_color} /> : null}
                    {title || ''}
                    {icon && !isLeftIconPosition ? <MagezonIcon icon={icon} icon_color={button_color} /> : null}
                </Button>
            )}
            <style jsx>
                {`
                    .mgz-btn {
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonButton;
