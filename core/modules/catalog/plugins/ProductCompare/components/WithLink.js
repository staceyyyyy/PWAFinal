/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

const useStyles = makeStyles({
    root: {
        margin: 5,
        cursor: 'pointer',
    },
});

const WithLink = ({ compareList, handleLink }) => {
    const styles = useStyles();
    if (compareList && compareList.compareList && compareList.compareList.item_count) {
        return (
            <div className={styles.root} onClick={handleLink}>
                {compareList ? (
                    <Badge color="secondary" badgeContent={compareList.compareList.item_count > 0 ? compareList.compareList.item_count : 0}>
                        <CompareArrowsIcon color="secondary" />
                    </Badge>
                ) : (
                    <Badge color="secondary" badgeContent={0}>
                        <CompareArrowsIcon color="secondary" />
                    </Badge>
                )}
            </div>
        );
    }
    return (
        <div className={styles.root} onClick={handleLink}>
            <Badge color="secondary" badgeContent={0}>
                <CompareArrowsIcon color="secondary" />
            </Badge>
        </div>
    );
};

export default WithLink;
