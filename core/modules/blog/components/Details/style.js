import makeStyles from '@material-ui/core/styles/makeStyles';
import { Centering, CreateMargin } from '@theme_mixins';

export default makeStyles((theme) => ({
    containerItemBlog: {
        padding: 15,
        width: '79%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    itemTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    dateShare: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    iconShare: {
        marginRight: 10,
    },
    imageBlogContainer: {
        width: '100%',
        height: 'auto',
        ...CreateMargin(10, 0, 10, 0),
        [theme.breakpoints.down('xs')]: {
            ...Centering,
        },
        [theme.breakpoints.up('xs')]: {
            maxHeight: 'auto',
        },
    },
    imageBlog: {
        width: '100%',
        height: 'auto',
    },
    shareBottom: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        marginTop: 30,
    },
    btnRead: {
        textAlign: 'left',
    },
    content: {
        fontSize: 12,
        '& img': {
            width: '100%',
            height: 'auto',
        },
        paddingBottom: 20,
    },
}));
