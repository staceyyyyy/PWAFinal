import { makeStyles } from '@material-ui/core/styles';
import { CreatePadding, CreateMargin, CenterAbsolute } from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        ...CreatePadding(10, 10, 10, 10),
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...CreateMargin(0, 0, 18, 0),
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        [theme.breakpoints.up('md')]: {
            maxWidth: 960,
            ...CenterAbsolute,
        },
    },
    leftContainer: {
        position: 'absolute',
        left: 0,
    },
    rightContainer: {
        position: 'absolute',
        right: 0,
    },
    centerContainer: {
        alignItems: 'center',
        textAlign: 'center',
        flexGrow: 1,
        ...CreatePadding(0, '20%', 0, '20%'),
    },
    backIcon: {
        fontSize: 30,
    },
    headerAbsolute: {
        position: 'absolute',
        zIndex: 1,
        borderBottom: 'none',
    },
    headerRelative: {
        position: 'relative',
    },
    title: {
        fontSize: 12,
    },
}));

export default useStyles;
