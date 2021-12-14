import StoreLocatorMaps from '@core_modules/storelocator/pages/default/components/Maps';
import SkeletonStoreLocator from '@core_modules/storelocator/pages/default/components/Skeleton';
import StoreList from '@core_modules/storelocator/pages/default/components/StoreList';

const StoreLocatorContent = ({ gmapKey, storeLocations, t }) => {
    // state
    const [centerPosition, setCenterPosition] = React.useState({});
    const [selectedStore, setSelectedStore] = React.useState();
    const [storeList, setStoreList] = React.useState(
        storeLocations.map((storeLocation) => ({
            ...storeLocation,
            lat: storeLocation.latitude,
            lng: storeLocation.longitude,
        })),
    );

    // effect
    React.useEffect(() => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lng = position.coords.longitude;
                const lat = position.coords.latitude;
                setCenterPosition({ lat, lng });
            });
        } else {
            setCenterPosition({ lat: -6.17539, lng: 106.82715 });
        }
    }, []);

    return (
        <div className="row" style={{ padding: '0 16px' }}>
            <div className="col-xs-12 col-sm-4 col-md-3 last-xs first-sm">
                <StoreList
                    t={t}
                    storeList={storeList}
                    totalAllStore={storeLocations.length}
                    onClickListItem={(store) => {
                        setCenterPosition({ lat: store.lat, lng: store.lng });
                        setSelectedStore(store);
                    }}
                />
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9">
                <StoreLocatorMaps
                    t={t}
                    centerPosition={centerPosition}
                    mapPositions={storeList}
                    gmapKey={gmapKey}
                    setStoreList={setStoreList}
                    selectedStore={selectedStore}
                />
            </div>
        </div>
    );
};

const StoreLocatorContentWrapper = (props) => {
    const {
        loading, storeLocations, storeConfig, t,
    } = props;
    return (
        <>
            {
                loading || typeof window === 'undefined'
                    ? <SkeletonStoreLocator />
                    : (
                        <StoreLocatorContent
                            t={t}
                            gmapKey={storeConfig.icube_pinlocation_gmap_key}
                            storeLocations={storeLocations}
                        />
                    )
            }
        </>
    );
};

export default StoreLocatorContentWrapper;
