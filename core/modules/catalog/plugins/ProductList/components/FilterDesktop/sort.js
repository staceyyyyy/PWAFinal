import { modules } from '@config';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

export const generateCatalogSorting = (isSearch) => {
    let updatedSort;
    const baseSort = [
        { value: { key: 'name', value: 'ASC' }, label: 'Alphabetically (A to Z)' },
        { value: { key: 'name', value: 'DESC' }, label: 'Alphabetically (Z to A)' },
        { value: { key: 'price', value: 'ASC' }, label: 'Price (Low to High)' },
        { value: { key: 'price', value: 'DESC' }, label: 'Price (High to Low)' },
        { value: { key: 'random', value: 'ASC' }, label: 'Random' },
        { value: { key: 'new_old', value: 'DESC' }, label: 'Newest First' },
        { value: { key: 'new_old', value: 'ASC' }, label: 'Oldest First' },
        { value: { key: 'new', value: 'DESC' }, label: 'New Arrival' },
        { value: { key: 'bestseller', value: 'DESC' }, label: 'Best Seller' },
        { value: { key: 'onsale', value: 'DESC' }, label: 'On Sale' },
        { value: { key: 'mostviewed', value: 'DESC' }, label: 'Most Viewed' },
        { value: { key: 'wishlisttop', value: 'DESC' }, label: 'Wishlist Top' },
        { value: { key: 'toprated', value: 'DESC' }, label: 'Top Rated' },
        { value: { key: 'featured', value: 'DESC' }, label: 'Featured' },
        { value: { key: 'free', value: 'DESC' }, label: 'Free' },
    ];
    const catalogSort = [
        { value: { key: 'position', value: 'ASC' }, label: 'Most Relevance' },
    ];
    const searchSort = [
        { value: { key: 'relevance', value: 'DESC' }, label: 'Relevance' },
    ];

    if (isSearch) {
        updatedSort = [...searchSort, ...baseSort];
    } else {
        updatedSort = [...catalogSort, ...baseSort];
    }

    const { catalog } = modules;
    const sortList = catalog.productListing.sort;
    updatedSort = updatedSort.filter((sort) => sortList[sort.value.key]).map((updatedSortData) => ({
        ...updatedSortData,
        value: JSON.stringify({ key: updatedSortData.value.key, value: updatedSortData.value.value }),
    }));

    return updatedSort;
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
    },
    sortTitle: {
        marginTop: '16px',
        fontWeight: 'bold',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SortDesktop = (props) => {
    const {
        isSearch, defaultSort, filterValue, setFiltervalue, t,
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch), []);

    const classes = useStyles();
    const [value, setValue] = React.useState(defaultSort);
    const [selectedFilter] = React.useState(filterValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        const savedData = {
            selectedFilter,
        };
        if (event.target.value !== '') {
            savedData.sort = event.target.value;
        }

        setFiltervalue(savedData);
    };
    return (
        <div className={classes.container}>
            <span className={classes.sortTitle}>{t('common:title:short')}</span>
            <FormControl className={classes.formControl}>
                <NativeSelect value={value} onChange={handleChange} name="sort" className={classes.selectEmpty}>
                    {sortByData.map((val, idx) => (
                        <option key={idx} value={val.value}>
                            {val.label}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default SortDesktop;
