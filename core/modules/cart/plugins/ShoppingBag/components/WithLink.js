/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LocalMall from '@material-ui/icons/LocalMall';

const useStyles = makeStyles({
    root: {
        margin: 20,
        cursor: 'pointer',
    },
});

const WithLink = ({ cartData, handleLink }) => {
    const styles = useStyles();
    return (
        <div className={styles.root} onClick={handleLink}>
            <Badge color="secondary" badgeContent={cartData || 0}>
                <LocalMall color="secondary" />
            </Badge>
        </div>
    );
};

export default WithLink;
