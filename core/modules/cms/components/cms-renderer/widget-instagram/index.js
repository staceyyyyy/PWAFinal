/* eslint-disable no-return-assign */
import React, { useEffect, useState, useRef } from 'react';

import { getUserFeed, getTagFeed } from '@core_modules/cms/services/rest/instagram';

const WidgetInstagram = (props) => {
    const {
        feed_type, resolution, user_name, limit, tag_name,
    } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const mount = useRef();
    const size = resolution === 'original' ? '100%' : `${resolution}px`;
    const limitData = limit === undefined ? 12 : limit;
    /**
     * [useEffect]
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            const getInstagramFeed = async () => {
                setLoading(true);
                if (feed_type === 'user') {
                    const dataInstagram = await getUserFeed(user_name, limitData);
                    setData(dataInstagram);
                } else if (feed_type === 'tagged') {
                    const dataInstagram = await getTagFeed(tag_name, limitData);
                    setData(dataInstagram);
                }
                setLoading(false);
            };

            getInstagramFeed();
        }

        return () => (mount.current = false);
    }, []);

    if (loading) return <div>Loading Widget...</div>;

    // prettier-ignore
    return data.length < 1 ? 'not found images' : data.map((item, index) => (
        <a href={item.url} target="__blank" key={item.src + index}>
            <img style={{ width: size }} src={item.src} alt={item.alt} />
        </a>
    ));
};

export default WidgetInstagram;
