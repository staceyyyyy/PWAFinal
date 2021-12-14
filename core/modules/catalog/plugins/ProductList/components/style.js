import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';
import { FlexRow, CreatePadding } from '@theme_mixins';
import { FONT_10 } from '@theme_typography';

const useStyles = makeStyles(() => ({
    filterContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...CreatePadding(15, 15, 15, 15),
    },
    countProductText: {
        ...FONT_10,
        marginLeft: 20,
        paddingTop: 3,
    },
    filterBtnContainer: {
        justifyContent: 'flex-end',
        ...FlexRow,
        alignItems: 'center',
        fontSize: 12,
    },
    btnFilter: {
        marginRight: -20,
        padding: 0,
    },
    iconFilter: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    iconGrid: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    iconList: {
        fontSize: 18,
        fontWeight: 'reguler',
    },
    leftWrapperFilter: {
        ...FlexRow,
        ...CreatePadding(2, 0, 2, 0),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
    productContainer: {
        overflow: 'hidden',
        ...CreatePadding(0, 0, 20, 0),
    },
    btnLoadmore: {
        cursor: 'pointer',
        width: '100%',
        padding: '20px',
        fontSize: '12px',
        background: '#fff',
        border: 'none',
        color: '#B4B4B4',
    },
    countProductTextDesktop: {
        justifyContent: 'flex-start',
        fontSize: 12,
        marginTop: -25,
    },
    divLoadMore: {
        width: '100%',
        textAlign: 'center',
        padding: 20,
    },
}));

export default useStyles;
