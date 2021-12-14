import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    caraousel: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    dots: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-arround',
        bottom: 33,
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    dotsItem: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: WHITE,
        margin: 5,
        cursor: 'pointer',
    },
    dotActive: {
        backgroundColor: PRIMARY,
        width: 10,
        height: 10,
    },
    hide: {
        display: 'none',
    },
    imageSlider: {
        display: 'flex',
        width: '100%',
    },
}));

export default useStyles;
