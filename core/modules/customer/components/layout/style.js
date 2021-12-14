import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    listMenuContainer: {
        backgroundColor: '#f5f5f5',
        padding: '10px 10px 10px 0px',
    },
    listMenu: {
        padding: 0,
        listStyle: 'none',
    },
    listMenuItem: {
        padding: 10,
        fontSize: 12,
    },
    listMenuItemActive: {
        borderLeft: '3px solid',
        paddingLeft: '7px',
    },
    titleContent: {
        paddingLeft: '0',
    },
}));

export default useStyles;
