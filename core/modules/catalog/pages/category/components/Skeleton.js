import Skeleton from '@common_skeleton';
import { modules } from '@config';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';
import useStyles from '@core_modules/catalog/pages/category/components/style';

const SkeletonCategory = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Skeleton
                variant="rect"
                xsStyle={{ width: '100vw', height: '60vw' }}
                mdStyle={{ width: '100%', height: '577px' }}
                lgStyle={{ width: '100%', height: '577px' }}
            />
            <Skeleton variant="text" width={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" style={{ marginBottom: 20 }} />
            <div className="row">
                {modules.catalog.productListing.drawerFilterOnDesktop.enabled
                    ? (
                        <div className="hidden-mobile col-lg-2">
                            <Skeleton variant="rect" width="100%" height={705} />
                        </div>
                    ) : null }
                <div className={`col-xs-12 col-lg-${modules.catalog.productListing.drawerFilterOnDesktop.enabled ? '10' : '12'}`}>
                    <ProductListSkeleton />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCategory;
