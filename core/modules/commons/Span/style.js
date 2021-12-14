import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    span: {
        width: '100%',
        height: 375,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GRAY_PRIMARY,
    },
}));

export default useStyles;
