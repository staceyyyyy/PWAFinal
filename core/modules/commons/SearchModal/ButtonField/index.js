import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '@common_searchmodal/ButtonField/style';

const ButtonField = ({ placeholder = '', onClick }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Button
                variant="text"
                onClick={onClick}
                className={styles.searchButton}
            >
                <Typography
                    variant="span"
                    type="semiBold"
                    className={styles.placeholder}
                >
                    {placeholder}
                </Typography>
            </Button>
        </div>
    );
};

export default ButtonField;
