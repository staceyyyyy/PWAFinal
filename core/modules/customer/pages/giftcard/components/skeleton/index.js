import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/customer/pages/giftcard/components/skeleton/style';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <>
            <div className="row hidden-mobile">
                <div className="col-lg-10">
                    <Skeleton animation="wave" variant="rect" height={240} width="50%" style={{ marginBottom: 50 }} />
                </div>
            </div>
            <div className={classNames(styles.container, 'hidden-desktop')}>
                <Skeleton animation="wave" variant="rect" height={50} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
                <Skeleton animation="wave" variant="text" height={50} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
                <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            </div>
        </>
    );
};

export default SkeletonLoader;
