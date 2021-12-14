import React from 'react';
import { withTranslation } from '@i18n';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { WHITE } from '@theme_color';
import Newsletter from '@plugin_newsletter';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        boxShadow: 'none',
        '& .MuiFormControl-marginNormal': {
            marginTop: 10,
            marginBottom: 30,
        },
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: '#000',
    },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const NewsletterMobile = (props) => {
    const { open, handleClose, t } = props;
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {t('common:newsletter:title')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Newsletter />
        </Dialog>
    );
};

export default (withTranslation()(NewsletterMobile));
