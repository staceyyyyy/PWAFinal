import React from 'react';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import MagezonButton from '@core_modules/cms/components/cms-renderer/magezon/MagezonButton';
import Accordion from '@material-ui/core/Accordion';

const MagezonToggle = (props) => {
    const {
        icon, active_icon, toggle_title, toggle_content,
    } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles(props);

    const openToggle = () => {
        setOpen(!open);
    };

    return (
        <div className={`${classes.container}`}>
            <div className="toggle-wrapper">
                <MagezonButton icon={open ? active_icon : icon} title={toggle_title} onClick={openToggle} />
                {open ? (
                    <Accordion disabled={false} expanded={open}>
                        <div dangerouslySetInnerHTML={{ __html: toggle_content }} />
                    </Accordion>
                ) : null}
            </div>
            <style jsx global>
                {`
                    .toggle-wrapper {
                        display: flex;
                        flex-direction: column;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonToggle;
