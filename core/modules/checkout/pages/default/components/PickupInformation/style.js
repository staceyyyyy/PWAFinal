import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    card: {
        marginBottom: 15,
        marginLeft: 0,
        marginRight: 0,
        '& strong': {
            fontWeight: '500',
        },
        '& td': {
            fontSize: 12,
        },
    },
}));
