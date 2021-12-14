import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    bottomButtons: {
        textAlign: 'left',
    },
    tColContent: {
        padding: '14px 0',
    },
    skeletonForm: {
        marginBottom: 20,
    },
    detail: {
        textAlign: 'right',
        maxWidth: '60%',
    },
    label: {
        textAlign: 'left',
        maxWidth: '40%',
    },

    listItem: {
        [theme.breakpoints.down('xs')]: {
            borderBottom: `1px solid ${GRAY_PRIMARY}`,
        },
    },
    title: {
        marginLeft: '25px !important',
        marginBottom: 20,
    },
    labelTable: {
        width: '40%',
        background: GRAY_PRIMARY,
        padding: '10px 20px 10px 20px',
    },
    valueTable: {
        padding: '10px 20px 10px 20px',
    },
    tableContainer: {
        borderRadius: 5,
        border: `1px solid ${GRAY_PRIMARY}`,
        marginTop: 15,
    },
    table: {
        width: '100%',
    },
    btnTrackOrder: {
        padding: 0,
        marginLeft: -10,
    },
    btnSeacrh: {
        textAlign: 'left',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    containerList: {
        '& .list-item': {
            display: 'flex',
            '&__title': {
                width: '30%',
            },
            '&__desc': {
                width: '70%',
            },
        },
    },
}));
