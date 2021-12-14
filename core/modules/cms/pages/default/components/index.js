import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const CmsPage = (props) => {
    const {
        data, t, loading, error, storeConfig, onlyCms, ...other
    } = props;
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }

    if (loading) return <Loading open={loading} />;
    if (onlyCms) return <CmsRenderer {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />;

    return (
        <div className="cms-container">
            {/* eslint-disable-next-line react/no-danger */}
            <h4 className="title center" dangerouslySetInnerHTML={{ __html: data.cmsPage.title }} />
            <CmsRenderer {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />
        </div>
    );
};

export default CmsPage;
