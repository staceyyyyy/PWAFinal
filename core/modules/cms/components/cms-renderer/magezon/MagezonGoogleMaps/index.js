/* eslint-disable no-nested-ternary */
import IcubeMaps from '@common_googlemaps';

const MagezonGoogleMaps = (props) => {
    // prettier-ignore
    const {
        infobox_background_color, infobox_opened, infobox_text_color, infobox_width,
        items, map_draggable, map_height, map_scrollwheel,
        map_type, map_ui, map_width, map_zoom,
        storeConfig,
    } = props;

    const elementDimension = {
        height:
            map_height && map_height.toString().includes('%') ? map_height : map_height.toString().includes('px') ? map_height : `${map_height}px`,
        width: map_width && map_width.toString().includes('%') ? map_width : map_width.toString().includes('px') ? map_width : `${map_width}px`,
    };
    const gmapKey = (storeConfig || {}).icube_pinlocation_gmap_key;
    const center = items.find((item) => item.center === '1') || items[0];
    const defaultOptions = {
        disableDefaultUI: map_ui,
        scrollwheel: map_scrollwheel,
        draggable: map_draggable,
        mapTypeId: map_type,
    };
    const infoBoxStyles = {
        width: `${infobox_width}px`,
        color: infobox_text_color,
    };
    const updatedItems = [...items.filter((item) => item.center !== '1'), center];

    return (
        <>
            <div className="mgz-google-maps">
                {gmapKey && (
                    <IcubeMaps
                        gmapKey={gmapKey}
                        containerElement={<div style={{ ...elementDimension }} />}
                        searchBox={false}
                        markers={updatedItems}
                        defaultZoom={map_zoom}
                        defaultOptions={defaultOptions}
                        infoBoxStyle={infoBoxStyles}
                        infoBoxDefaultOpen={infobox_opened}
                        secureUrl={storeConfig.secure_base_media_url}
                        center={{ lat: parseFloat(center.lat), lng: parseFloat(center.lng) }}
                    />
                )}
            </div>
            <style jsx>
                {`
                    .mgz-google-maps :global(div[role='dialog'][class*='gm-style-iw']) {
                        background-color: ${infobox_background_color || '#ffffff'};
                        max-height: none !important;
                        padding: 10px !important;
                    }
                    .mgz-google-maps :global(div[role='dialog'][class*='gm-style-iw'] > div) {
                        overflow: visible !important;
                        max-height: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonGoogleMaps;
