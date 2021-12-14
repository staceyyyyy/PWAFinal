import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

/*
    for detail docs visit:
    - https://material-ui.com/styles/basics/
    - https://material-ui.com/customization/breakpoints/

    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 960px
    lg, large: 1280px
    xl, extra-large: 1920px
*/

const useStyles = makeStyles((theme) => ({
    skeleton: ({
        xsStyle, smStyle, mdStyle, lgStyle, xlStyle,
    }) => ({
        ...xsStyle,
        [theme.breakpoints.up('sm')]: smStyle,
        [theme.breakpoints.up('md')]: mdStyle,
        [theme.breakpoints.up('lg')]: lgStyle,
        [theme.breakpoints.up('xl')]: xlStyle,
    }),
}));

const CustomSkeleton = ({
    xsStyle, smStyle, mdStyle, lgStyle, xlStyle, className, ...props
}) => {
    const classes = useStyles({
        xsStyle, smStyle, mdStyle, lgStyle, xlStyle,
    });

    return (
        <Skeleton {...props} className={classNames(className, classes.skeleton)} />
    );
};

export default CustomSkeleton;
