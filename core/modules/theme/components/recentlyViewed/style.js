import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    skeletonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        '& span': {
            margin: '0 5px',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    skeletonContainerMobile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        '& span': {
            margin: '0 5px',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    wrapperBtn: {
        '& .button-title': {
            color: 'black',
            textTransform: 'uppercase',
            fontSize: '12px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '3vw',
            },
        },
    },
    GridItem: {
        width: '500px',
        margin: '0 20px',
        '& .item-product': {
            margin: '0 10px',
            [theme.breakpoints.up('md')]: {
                margin: '0 30px',
            },
        },
    },
}));

export default useStyles;
