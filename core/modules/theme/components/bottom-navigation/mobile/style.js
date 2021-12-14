import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    navigation: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 99,
        boxShadow: '0px 0 3px #0000001A',
    },
    navAction: {
        paddingTop: '8px !important',
        paddingBottom: '8px !important',
    },
}));

export default useStyles;
