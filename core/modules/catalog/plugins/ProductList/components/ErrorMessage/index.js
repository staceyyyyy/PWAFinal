import Alert from '@material-ui/lab/Alert';

const AlertCustom = ({ variant, text }) => (
    <div>
        <Alert className="m-15" severity={variant}>
            {text}
        </Alert>
    </div>
);

export default AlertCustom;
