import classNames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/order/pages/history/style';

const ErrorView = ({ type, message }) => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.container, styles.rowCenter)}>
            <Alert className="m-15" severity={type}>
                {message}
            </Alert>
        </div>
    );
};

export default ErrorView;
