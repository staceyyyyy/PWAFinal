import { makeStyles } from '@material-ui/core/styles';
import {
    Centering, CreateMargin,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    title: {
        ...CreateMargin(0, 0, 15, 0),
        ...Centering,
    },
    listBrand: {
        textAlign: 'left',
        fontSize: '10px',
    },
    allContainer: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 20,
            paddingRight: 20,
        },
    },
    wrapperBrands: {
        marginBottom: '40px',
    },
}));

export default useStyles;
