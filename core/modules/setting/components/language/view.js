import React, { useRef } from 'react';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

/**
 * useStyle
 */
const useStyles = makeStyles(() => ({
    listItemText: {
        fontSize: '.6rem', // Insert your required size
        textTransform: 'uppercase',
    },
}));

const ViewSwitcherLanguage = (props) => {
    const {
        t, title, id, open, anchorEl, handleClick, handleClose, dataLang, lang, onClickLanguage,
    } = props;
    const buttonRef = useRef();
    const classes = useStyles();

    const anchorOrigin = { vertical: 'bottom', horizontal: 'right' };
    const transforOrigin = { vertical: 'top', horizontal: 'right' };
    const styleTitle = { fontSize: 12, textTransform: 'uppercase' };
    const styleButton = { fontFamily: 'Montserrat', padding: '0px', fontSize: title ? '12px' : '1em' };

    /**
     * rendering
     */
    return (
        <div>
            {/* [CURRENCY] TITLE */}
            {title && (
                <div>
                    <strong style={styleTitle}>{title}</strong>
                </div>
            )}

            {/* [CURRENCY] BUTTON */}
            <Button ref={buttonRef} onClick={handleClick} style={styleButton}>
                {t('common:setting:language')}
                :&nbsp;
                <strong>{lang?.label}</strong>
            </Button>

            {/* [CURRENCY] LIST */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transforOrigin}
                container={buttonRef.current}
            >
                <List component="nav">
                    {dataLang !== undefined
                        && dataLang.map((item, index) => {
                            const isCurrent = item.value === lang.value;
                            return isCurrent ? null : (
                                <ListItem button key={`language-${index}`} onClick={() => onClickLanguage({ item })}>
                                    <ListItemText classes={{ primary: classes.listItemText }} primary={`${item.label}`} />
                                </ListItem>
                            );
                        })}
                </List>
            </Popover>
        </div>
    );
};

export default ViewSwitcherLanguage;
