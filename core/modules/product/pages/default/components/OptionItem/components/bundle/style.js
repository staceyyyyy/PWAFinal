import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    WHITE,
} from '@theme_color';

export default makeStyles(() => ({
    customizeContainer: {
        width: '100%',
        height: 'auto',
        padding: '10px 7px',
        '& .required-label': {
            color: 'red',
            paddingLeft: 5,
        },
        '& .options-container': {
            display: 'flex',
            padding: '5px 0px',
        },
        '& .label-options': {
            fontWeight: 'normal',
            cursor: 'pointer',
        },
        '& .item-list': {
            padding: '10px 0px',
            borderBottom: '1px solid #e6dddd',
        },
    },
    btnAddToCard: {
        width: '100%',
        marginTop: 15,
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
    },
    selectItem: {
        display: 'flex',
        margin: '15px 0px',
    },
}));
