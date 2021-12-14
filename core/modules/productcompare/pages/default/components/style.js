import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme_color';
import { CreateMargin } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        ...CreateMargin(5, 5, 60, 5),
    },
    tableBody: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    column: {
        minWidth: 296,
        '& .column__title': {
            marginLeft: 0,
        },
        '& .description-item': {
            '& img': {
                width: '100%',
                height: 'auto',
            },
        },
    },
    stickyColumn: {
        position: 'sticky',
        left: 0,
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        zIndex: 2,
        background: WHITE,
    },
    productImage: {
        position: 'relative',
        width: '300px',
        height: 'auto',
        '& .clearIcon': {
            position: 'absolute',
            width: 20,
            height: 20,
            top: 5,
            right: 5,
            zIndex: 100,
            cursor: 'pointer',
        },
    },
    sku: {
        textTransform: 'uppercase',
    },
}));

export default useStyles;
