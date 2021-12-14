import Alert from '@material-ui/lab/Alert';

const AlertInfo = ({ variant, text }) => (
    <div>
        <Alert className="m-15" severity={variant}>
            {text}
        </Alert>
    </div>
);

export default AlertInfo;
