import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme/mixins';

export default makeStyles((theme) => ({
    container: {
        padding: 20,
        width: '100%',
        Height: '100&',
    },
    right: {
        marginLeft: 30,
        display: 'flex',
        flexDirection: 'row',
        width: '30%',
    },
    footer: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        borderRadius: 20,
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            fontSize: 30,
        },
    },
    titleContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titlePriceContainer: {
        ...FlexColumn,
        marginBottom: 10,
        flex: 1,
        fontSize: 20,
        '& .price_text': {
            fontSize: 30,
        },
        [theme.breakpoints.down('sm')]: {
            '& .price_text': {
                fontSize: 18,
            },
        },
    },
    shareContainer: {
        ...FlexRow,
        justifyContent: 'flex-end',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            '& button span': {
                fontSize: 9,
            },
        },
    },
    bannerProduct: {
        width: '99%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            height: '572px',
        },
    },
}));
