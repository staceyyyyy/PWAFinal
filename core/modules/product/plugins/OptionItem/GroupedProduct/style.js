import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT, GRAY_PRIMARY } from '@root/core/theme/colors';
import { CreatePadding, FlexColumn, FlexRow } from '@root/core/theme/mixins';

export default makeStyles((theme) => ({
    container: {

    },
    itemsBox: {
        ...FlexColumn,
        marginBottom: 30,
    },
    item: {
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        borderBottom: `2px solid ${GRAY_LIGHT}`,
        ...CreatePadding(10, 0, 10, 0),
    },
    header: {
        borderBottom: `2px solid ${GRAY_PRIMARY}`,
    },
    itemName: {
        ...FlexColumn,
        '& span': {
            marginLeft: 5,
        },
    },
    inputQty: {
        minHeight: 30,
        maxWidth: 60,
        textAlign: 'center',
        '&::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
        },
        '&::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
        },
        WebkitAppearance: 'textfield',
        [theme.breakpoints.down('sm')]: {
            minHeight: 20,
            maxWidth: 50,
            marginRight: 5,
        },
    },
}));
