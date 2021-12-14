import Typography from '@common_typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import Help from '@material-ui/icons/Help';
import Button from '@common_button';
import Spiner from '@material-ui/core/CircularProgress';
import useStyles from '@core_modules/checkout/pages/default/components/style';

const EmailView = (props) => {
    const {
        t, formik, setAnchorEl, anchorEl, idButton, open, config,
        handleBlur, load,
    } = props;
    const styles = useStyles();

    let isExternalLoginLink = false;
    if (config && config.loginRedirect && config.loginRedirect.link) {
        if (config.loginRedirect.link.indexOf('http') > -1) {
            isExternalLoginLink = true;
        }
    }
    const generateLoginRedirect = () => {
        if (config && config.loginRedirect && config.loginRedirect.link) {
            return config.loginRedirect.link;
        }
        return '/customer/account/login?redirect=/checkout';
    };

    return (
        <div className={styles.block} id="checkoutEmailSetup">
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:emailAddress')}
            </Typography>
            <div className={styles.emailContainer}>
                <FormControl
                    fullWidth
                    error={!!(formik.errors.email && formik.touched.email)}
                    className={styles.customFormControl}
                >
                    <Input
                        name="email"
                        placeholder="john.doe@gmail.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        endAdornment={(
                            <>
                                {
                                    load ? (
                                        <Spiner size="1rem" />
                                    ) : null
                                }
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-describedby={idButton}
                                        aria-label="toggle password visibility"
                                        onClick={(event) => {
                                            setAnchorEl(event.currentTarget);
                                        }}
                                    >
                                        <Help />
                                    </IconButton>
                                    <Popover
                                        id={idButton}
                                        open={open}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        onClose={() => {
                                            setAnchorEl(null);
                                        }}
                                    >
                                        <Typography variant="p">{t('checkout:emailHelper')}</Typography>
                                    </Popover>
                                </InputAdornment>
                            </>
                        )}
                    />
                    {/* { !saved && formik.values.email !== '' && (<FormHelperText>{t('checkout:message:unsavedEmail')}</FormHelperText>) } */}
                    {(formik.touched.email && formik.errors.email)
                        ? <FormHelperText>{formik.errors.email || null}</FormHelperText> : null}
                </FormControl>
            </div>
            {!isExternalLoginLink
                ? (
                    <Button align="left" variant="text" href={generateLoginRedirect()} className="clear-margin-padding">
                        <Typography variant="span" type="regular" decoration="underline" size="14">
                            {t('checkout:haveAccount')}
                        </Typography>
                    </Button>
                )
                : (
                    <Button
                        align="left"
                        variant="text"
                        className="clear-margin-padding"
                        onClick={() => { window.location.href = generateLoginRedirect(); }}
                    >
                        <Typography variant="span" type="regular" decoration="underline" size="14">
                            {t('checkout:haveAccount')}
                        </Typography>
                    </Button>
                )}
        </div>
    );
};

export default EmailView;
