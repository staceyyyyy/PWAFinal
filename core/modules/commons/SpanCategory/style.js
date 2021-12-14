import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, PRIMARY, WHITE } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: WHITE,
        padding: 0,
        '& img.has-error': {
            height: 'auto !important',
            maxHeight: 'fit-content !important',
        },
    },
    imageContainer: {
        minWidth: 345,
        maxWidth: '100%',
        height: 168,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GRAY_PRIMARY,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 15px',
    },
    textBtn: {
        paddingBottom: 5,
        borderBottom: `2px solid ${PRIMARY}`,
    },
}));

export default useStyles;
