import useStyles from '@common_slick/Banner/style';

const generateVideo = (props) => {
    const styles = useStyles();
    const { videoUrl } = props;
    const urlVideo = videoUrl && videoUrl.video_url.split('=')[1];
    if (urlVideo) {
        return (
            <div className={styles.productVideo}>
                <iframe
                    width="100%"
                    height="572"
                    src={`https://www.youtube.com/embed/${urlVideo}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded Video"
                />
            </div>
        );
    }
    return null;
};

export default generateVideo;
