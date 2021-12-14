import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, WHITE } from '@theme_color';
import { FlexColumn } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
    },
    headContainer: {
        position: 'relative',
        backgroundColor: GRAY_PRIMARY,
        width: '100%',
        height: 'auto',
    },
    headContainerNoBanner: {
        backgroundColor: WHITE,
        height: '40vh',
    },
    header: {
        left: '50%',
        right: '50%',
        top: '11px',
        position: 'absolute',
        borderBottom: 'none',
        fontWeight: 'bold',
    },
    breadcrumbs: {
        padding: '16px 16px 0',
    },
    categoryName: {
        padding: '0px 16px 0',
        margin: 0,
    },
}));

export default useStyles;
