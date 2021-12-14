import Alert from '@material-ui/lab/Alert';

const ErrorInfo = ({ variant = 'error', text = '' }) => (
    <div className="cms-container">
        <Alert className="m-15" severity={variant}>
            {text}
        </Alert>
    </div>
);

export default ErrorInfo;
