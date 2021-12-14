import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    listContainer: {
        height: 75,
        paddingTop: 10,
        width: '100%',
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    firstListContainer: {
        height: 100,
    },
    topTitle: {
        display: 'block',
        width: '100%',
        height: '20px',
        paddingLeft: '13px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '8px',
    },
    imageContainer: {
        float: 'left',
        marginRight: 20,
    },
    img: {
        width: '50px',
        height: 'auto',
    },
    title: {
        paddingTop: 10,
        paddingBottom: 5,
        textTransform: 'uppercase',
        fontSize: 10,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    listContainerCategory: {
        width: '100%',
        padding: 10,
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    topTitleCategory: {
        paddingLeft: 0,
    },
    breadcrumbs: {
        paddingBottom: 5,
        textTransform: 'uppercase',
        color: '#929292',
        fontSize: 10,
        fontStyle: 'italic',
    },
    titleCategory: {
        textTransform: 'uppercase',
        fontSize: 10,
    },
}));

export default useStyles;
