import React from 'react';

const MagezonFlickrCore = (props) => {
    const {
        View, flickr_api_key, flickr_album_id, ...other
    } = props;

    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        // eslint-disable-next-line max-len
        const url = `https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photosets.getPhotos&api_key=${flickr_api_key}&photoset_id=${flickr_album_id}&per_page=200&_=1627352514569`;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading . . .</div>;
    if (error) return <div>Error . . .</div>;
    return (
        <View
            data={data}
            {...other}
        />
    );
};

export default MagezonFlickrCore;
