import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';

const Copyright = (props) => {
    const {
        t, loading, error, storeConfig,
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return <Loading open={loading} />;
    return (
        <div className="copyright">
            <span>{storeConfig.copyright}</span>
            <style jsx global>
                {`
                    .copyright {
                        text-align: center;
                        background-color: #6e716e;
                        padding: 10px;
                    }
                    .copyright span {
                        color: #ffffff;
                        letter-spacing: 0.03em;
                    }
                `}
            </style>
        </div>
    );
};

export default Copyright;
