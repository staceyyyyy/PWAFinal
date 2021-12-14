import Typography from '@common_typography';
import Button from '@common_button';
import Tune from '@material-ui/icons/Tune';
import AppsIcon from '@material-ui/icons/Apps';
import ListAltIcon from '@material-ui/icons/ListAlt';
import useStyles from '@plugin_productlist/components/style';

const FilterView = (props) => {
    const {
        products, t, setOpenFilter, setGrid,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.filterContainer}>
            <div className={styles.leftWrapperFilter}>
                <Button
                    variant="text"
                    customRootStyle={{ width: 'fit-content' }}
                    className={styles.btnFilter}
                    onClick={() => setGrid(true)}
                >
                    <AppsIcon className={styles.iconGrid} />
                </Button>
                <Button
                    variant="text"
                    customRootStyle={{ width: 'fit-content' }}
                    className={styles.btnFilter}
                    onClick={() => setGrid(false)}
                >
                    <ListAltIcon className={styles.iconList} />
                </Button>
                <Typography variant="p" type="regular" className={styles.countProductText}>
                    {products.total_count}
                    {' '}
                    {t('catalog:product:name')}
                </Typography>
            </div>
            <div className={styles.filterBtnContainer}>
                <Button
                    variant="text"
                    customRootStyle={{ width: 'fit-content' }}
                    className={styles.btnFilter}
                    onClick={() => setOpenFilter(true)}
                >
                    <Tune className={styles.iconFilter} />
                </Button>
                <Typography type="bold" variant="span" letter="capitalize">
                    {t('catalog:title:shortFilter')}
                </Typography>
            </div>
        </div>
    );
};

export default FilterView;
