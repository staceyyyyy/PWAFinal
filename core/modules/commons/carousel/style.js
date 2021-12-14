import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme_color';
import {
    Centering, CreateMargin,
} from '@theme_mixins';

const itemContainerWidth = {
    xs: '60vw',
    sm: '300px',
    md: '270px',
};

const caraouselPadding = {
    xs: `0 calc((100vw - ${itemContainerWidth.xs})/2)`,
    sm: `0 calc((100vw - ${itemContainerWidth.sm})/2)`,
    md: `0 calc((960px - ${itemContainerWidth.md})/2)`,
};

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: WHITE,
    },
    caraousel: {
        padding: caraouselPadding.xs,
        [theme.breakpoints.up('sm')]: {
            padding: caraouselPadding.sm,
        },
        [theme.breakpoints.up('md')]: {
            padding: caraouselPadding.md,
        },
    },
    slideContainer: {
    },
    itemContainer: {
        padding: '0 8px',
        margin: 'auto',
        height: '100%',
        overflow: 'hidden',
        width: itemContainerWidth.xs,
        [theme.breakpoints.up('sm')]: {
            width: itemContainerWidth.sm,
        },
        [theme.breakpoints.up('md')]: {
            width: itemContainerWidth.md,
        },
    },
    title: {
        ...CreateMargin(0, 0, 15, 0),
        ...Centering,
    },
}));

export default useStyles;
