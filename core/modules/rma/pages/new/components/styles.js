import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding,
    CreateBorder,
    FlexColumn,
    FlexRow,
    CreateMargin,
} from '@theme_mixins';
import { GRAY_PRIMARY, GRAY_LIGHT } from '@theme_color';

export default makeStyles(() => ({
    block: {
        ...CreatePadding(30, 30, 30, 30),
        ...FlexColumn,
    },
    labelProduct: {
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
        ...CreateMargin(15, 0, 15, 0),
        ...CreatePadding(15, 15, 15, 15),
    },
    selectProductContainer: {
        ...FlexRow,
        ...CreatePadding(0, 30, 0, 30),
        '&> *': {
            marginRight: 15,
        },
    },
    detail: {
        paddingTop: 0,
        alignItems: 'center',
        textAlign: 'center',
    },

    labelDetail: {
        ...CreateMargin(30, 0, 0, 0),
    },

    itemContainer: {
        ...FlexRow,
        ...CreateMargin(10, 0, 20, 0),
    },

    productImgContainer: {
        width: 105,
        height: 130,
    },

    productImg: {
        width: 105,
        height: 'auto',
    },

    detailItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
    },
    textDetail: {
        ...CreateMargin(0, 0, 0, 5),
        padding: 0,
    },
    selectItemBox: {
        ...FlexColumn,
        justifyContent: 'center',
        backgroundColor: GRAY_LIGHT,
        padding: 10,
        height: 'auto',
        minHeight: 50,
        marginBottom: 20,
    },
    listOtherRma: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));
