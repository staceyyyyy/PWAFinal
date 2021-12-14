import IconButton from '@material-ui/core/IconButton';
import Star from '@material-ui/icons/Star';
import useStyles from '@common_ratingstar/style';

const RatingStar = ({
    value = 1,
    maxvalue = 5,
    onChange = () => {},
    disabled = true,
    sizeIcon = 14,
}) => {
    const styles = useStyles();
    const icon = [];
    const styleIcon = {
        fontSize: sizeIcon,
    };
    for (let ind = 1; ind <= maxvalue; ind += 1) {
        if (ind <= value) {
            icon.push(
                <IconButton
                    className={styles.iconBtn}
                    key={ind}
                    disabled={disabled}
                    onClick={() => onChange(ind)}
                >
                    <Star style={styleIcon} className={styles.iconActive} />
                </IconButton>,
            );
        } else {
            icon.push(
                <IconButton
                    className={styles.iconBtn}
                    key={ind}
                    disabled={disabled}
                    onClick={() => onChange(ind)}
                >
                    <Star style={styleIcon} className={styles.icon} />
                </IconButton>,
            );
        }
    }
    return (
        <div className={styles.container}>{icon.map((Item) => Item)}</div>
    );
};

export default RatingStar;
