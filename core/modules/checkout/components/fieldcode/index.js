import classNames from 'classnames';
import TextField from '@common_forms/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '@core_modules/checkout/components/fieldcode/style';

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
    disabled = false,
    id = null,
    name = null,
    error,
    errorMessage = 'error',
    loading = false,
    toggleField = false,
    styleFrame = {},
    styleFrameText = {},
    styleTextField = {},
}) => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.block, styles.rmBorder)} id={id}>
            <div className={styles.fieldPoinContainer} style={styleFrame}>
                <TextField
                    id={`${id}Textfield`}
                    name={name}
                    styleFrameText={styleFrameText}
                    styleTextField={styleTextField}
                    disabled={!!(disabled || toggleField)}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    error={error}
                    errorMessage={error ? errorMessage : null}
                />
                <div>
                    <Button variant="outlined" className={styles.btnAplly} onClick={action} disabled={disabled || loading || value === ''}>
                        <Typography variant="p" color={loading || disabled || value === '' ? 'gray' : 'default'} type="bold" letter="uppercase">
                            {toggleField ? 'Remove' : 'Apply'}
                        </Typography>
                        {loading && <CircularProgress className={styles.smallCircular} size={16} />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FieldPoint;
