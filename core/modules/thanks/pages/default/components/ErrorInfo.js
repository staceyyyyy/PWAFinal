import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/thanks/pages/default/components/style';

const ErrorInfo = ({ variant, text }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Alert className="m-15" severity={variant}>
                {text}
            </Alert>
        </div>
    );
};
export default ErrorInfo;
