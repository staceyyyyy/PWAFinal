import React from 'react';
import Typography from '@common_typography';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonSeparator = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, title, title_tag,
        title_align, line_weight, title_color, style,
        add_icon, el_width, icon, icon_position, color, ...other
    } = props;
    const classes = useStyles(other);

    let classSeparator = 'magezon-separator ';
    if (xs_hide) classSeparator += 'hidden-mobile ';
    if (sm_hide) classSeparator += 'hidden-sm ';
    if (md_hide) classSeparator += 'hidden-md ';
    if (lg_hide) classSeparator += 'hidden-lg ';

    const justifyContent = (align) => {
        switch (align) {
        case 'center':
            return 'center';
        case 'left':
            return 'flex-start';
        case 'right':
            return 'flex-end';
        default:
            return '';
        }
    };

    return (
        <div className={`${classSeparator}${classes.container}`}>
            <div className="magezone-separator-box">
                <Typography
                    variant={title_tag}
                    align={title_align}
                    className="magezon-separator-title"
                    letter="uppercase"
                >
                    {
                        add_icon && icon_position === 'left' && icon !== '' && (
                            <MagezonIcon icon={icon} icon_size="lg" />
                        )
                    }
                    {title}
                    {
                        add_icon && icon_position === 'right' && icon !== '' && (
                            <MagezonIcon icon={icon} icon_size="lg" />
                        )
                    }
                </Typography>
            </div>
            <div className="mgz-element-separator-line" />
            <style jsx global>
                {`
                    .magezon-separator {
                        width: 100%;
                        margin-bottom: 20px;
                        position: relative;
                    }
                    .magezone-separator-box {
                        width:100%;
                        text-align:${title_align}; 
                        position: relative;
                        margin-bottom: 10px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: ${justifyContent(title_align)};
                    }
                    .magezon-separator-title {        
                        position:relative; 
                        padding:12px;
                        color: ${title_color} !important;
                        background: #fff;
                        z-index: 1;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    .mgz-element-separator-line {
                        -webkit-transform: translate(0%, -50%);
                        -moz-transform: translate(0%, -50%);
                        -ms-transform: translate(0%, -50%);
                        -o-transform: translate(0%, -50%);
                        position: absolute;
                        left: 5px;
                        right: 5px;
                        top: 50%;
                        height: 1px;
                        border-top: ${line_weight}px solid transparent;
                        margin: 0 auto;
                        width: calc(${el_width || '100%'} - 10px);
                        border-color: ${color};
                        border-top-style: ${style};
                        border-top-width: ${line_weight}px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonSeparator;
