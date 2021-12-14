import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/rewardpoint/pages/default/style';

const ErrorView = ({ message, t }) => {
    const styles = useStyles();
    return (
        <div className={styles.account_point}>
            <Alert className="m-15" severity="error">
                { message || t('common:error:fetchError')}
            </Alert>
        </div>
    );
};

export default ErrorView;
