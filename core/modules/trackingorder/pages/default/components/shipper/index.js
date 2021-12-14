/* eslint-disable operator-linebreak */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import Typography from '@core_modules/commons/Typography';
import formatDate from '@helper_date';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';

const ShipperView = (props) => {
    // prettier-ignore
    const {
        data, type, styles, t,
    } = props;

    const isJNE = type.toLowerCase().includes('jne');
    const isSAP = type.toLowerCase().includes('sap');
    const isShipperid = type.toLowerCase().includes('shipperid');
    const isAnteraja = type.toLowerCase().includes('anteraja');
    const histories = isJNE ? data.history : isSAP || isShipperid ? data : isAnteraja ? data.content.history : [];
    const detail = isJNE ? data : isSAP || isShipperid ? data[data.length - 1] : isAnteraja ? data.content.order : {};
    const shipperData = {
        detail: {
            receiver_name: '',
            shipper_name: '',
            description: '',
            update_date: '',
            last_status: '',
            live_tracking: '',
        },
    };

    if (isJNE) {
        shipperData.detail = {
            ...shipperData.detail,
            receiver_name: detail.detail[0].cnote_receiver_name || '',
            shipper_name: detail.detail[0].cnote_shipper_name || '',
            description: detail.cnote.keterangan || '',
            update_date: detail.detail[0].cnote_date || '',
            last_status: detail.cnote.last_status || '',
        };
    }

    if (isSAP) {
        shipperData.detail = {
            ...shipperData.detail,
            receiver_name: detail.receiver_name || '',
            description: detail.description || '',
            update_date: detail.create_date || '',
            last_status: detail.rowstate_name || '',
        };
    }

    if (isShipperid) {
        shipperData.detail = {
            ...shipperData.detail,
            description: <span dangerouslySetInnerHTML={{ __html: detail.logisticStatus[0].description }} /> || '',
            update_date: formatDate(detail.createdDate, 'DD-MM-YYYY HH:mm') || '',
            last_status: detail.trackStatus.description || '',
            live_tracking: detail.trackURL && detail.trackURL !== '' ? detail.trackURL : '',
        };
    }

    if (isAnteraja) {
        shipperData.detail = {
            ...shipperData.detail,
            receiver_name: detail?.receiver.name || '',
            shipper_name: detail?.shipper.name || '',
            update_date: histories ? formatDate(histories[histories.length - 1].timestamp, 'DD-MM-YYYY HH:mm') : '',
            last_status: histories ? histories[histories.length - 1].message.id : '',
        };
    }

    return (
        <div className={styles.containerList}>
            <div className="trackingorder-detail">
                <Typography type="bold" variant="h3">
                    Detail
                </Typography>
                <div style={{ marginBottom: 30 }}>
                    {shipperData.detail.receiver_name !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:receiverName')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.receiver_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.shipper_name !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:shipperName')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.shipper_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.description !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:description')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.description}</Typography>
                        </div>
                    )}
                    {shipperData.detail.update_date !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:updateDate')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.update_date}</Typography>
                        </div>
                    )}
                    {shipperData.detail.last_status !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:lastStatus')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.last_status}</Typography>
                        </div>
                    )}
                    {shipperData.detail.live_tracking !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">Live Tracking</Typography>
                            <div className="list-item__desc track-link">
                                <Link href={shipperData.detail.live_tracking || '#'}>
                                    <a>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span>{t('trackingorder:track')}</span>
                                            <LaunchIcon fontSize="small" />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="trackingorder-history">
                <Typography type="bold" variant="h3">
                    {t('trackingorder:history')}
                </Typography>

                {histories &&
                    histories.map((history, index) => {
                        let dateTime;
                        if (isJNE) dateTime = history.date.split(' ');
                        if (isSAP) dateTime = history.create_date.split(' ');
                        if (isShipperid) {
                            dateTime = formatDate(history.createdDate, 'DD-MM-YYYY HH:mm').split(' ');
                        }
                        if (isAnteraja) dateTime = formatDate(history.timestamp, 'DD-MM-YYYY HH:mm').split(' ');

                        return (
                            <div key={index} style={{ marginBottom: 10 }}>
                                <Typography type="bold">{`${dateTime[0]}, ${dateTime[1]}`}</Typography>
                                <Typography>
                                    {isJNE ? (
                                        history.desc
                                    ) : isSAP ? (
                                        history.description
                                    ) : isShipperid ? (
                                        <span dangerouslySetInnerHTML={{ __html: history.logisticStatus[0].description }} />
                                    ) : isAnteraja ? (
                                        history.message.id
                                    ) : (
                                        ''
                                    )}
                                </Typography>
                            </div>
                        );
                    })}
            </div>
            <style jsx>
                {`
                    .trackingorder-detail :global(a:hover),
                    .trackingorder-history :global(a:hover) {
                        text-decoration: underline;
                    }
                    .list-item :global(.track-link) {
                        display: flex;
                        align-items: center;
                    }
                    .list-item :global(.track-link > *) {
                        background-color: #eee;
                        padding: 5px;
                        text-decoration: none !important;
                        border-radius: 5px;
                    }
                `}
            </style>
        </div>
    );
};

export default ShipperView;
