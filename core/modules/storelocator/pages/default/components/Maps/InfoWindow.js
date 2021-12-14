import { InfoWindow } from 'react-google-maps';

const InfoWindowComp = (({ store, onCloseClick, t }) => (
    <>
        <style jsx>
            {`
                .info-window {
                    background-color: #fff;
                    padding: 8px 0;
                    width: 250px;
                    max-width: 50vw;
                    color: #000;
                    border-radius: 8px;
                }
                .info-window .left {
                    display: inline-block;
                    padding-right: 10px;
                    width: 60px;
                    vertical-align: top;
                }
                .info-window .image {
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 4px;
                }
                .info-window .right {
                    display: inline-block;
                    width: calc(100% - 60px);
                }
                .info-window .title {
                    font-size: 16px;
                }
                .info-window .description {
                    line-height: 18px;
                    margin-top: 4px;
                }
                .direction-button {
                    float: right;
                    font-weight: bold;
                    font-size: 12px;
                }
                .direction-button:hover {
                    text-decoration: underline;
                }
            `}
        </style>
        <InfoWindow onCloseClick={onCloseClick}>
            <div className="info-window">
                <div className="left">
                    <div className="image">
                        <img alt={store.store_name} src={store.baseimage} width="100%" />
                    </div>
                </div>
                <div className="right">
                    <div className="title">
                        {store.store_name}
                    </div>
                    <div className="description">
                        {`${store.state}, ${store.city}, ${store.address}`}
                        <br />
                        {store.phone}
                        <div>
                            <a
                                className="direction-button"
                                href={`https://www.google.com/maps/dir/Current+Location/${store.lat},${store.lng}`}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {t('storelocator:direction')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </InfoWindow>
    </>

));

export default InfoWindowComp;
