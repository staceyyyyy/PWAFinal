import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import RadioGroup from '@common_radio';
import Typography from '@common_typography';
import RangeSlider from '@common_rangeslider';
import CheckBox from '@common_checkbox';
import CheckBoxSize from '@common_forms/CheckBoxSize';
import CheckBoxColor from '@common_forms/CheckBoxColor';
import Button from '@common_button';
import Loading from '@common_loaders';
import { useTranslation } from '@i18n';
import useStyles from '@common_filterdialog/style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const FilterDialog = ({
    open,
    setOpen,
    itemProps = {},
    data = {},
    elastic = false,
    loading = false,
    sortByData = [],
    getValue = () => {},
    filterValue = {},
    defaultSort,
}) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const [selectedFilter, setFilter] = React.useState(filterValue);
    const [sort, setSort] = React.useState(filterValue.sort ? filterValue.sort : '');
    const [priceRange, setPriceRange] = React.useState(filterValue.priceRange ? filterValue.priceRange.split(',') : [0, 0]);
    const handleClear = () => {
        // reset value for sort component
        setSort(defaultSort || '');

        // reset value for price range component
        setPriceRange([0, 0]);

        // new filter with clear/reset value
        const newFilter = {
            q: selectedFilter.q,
            sort: defaultSort,
            priceRange: [0, 0],
        };

        // delete params when empty value, ex: ...?q=undefined...
        Object.keys(newFilter).forEach((key) => {
            const emptyValues = [undefined, null, '', 'undefined', 'null'];
            if (emptyValues.includes(newFilter[key])) {
                delete newFilter[key];
            }
        });

        setFilter(newFilter);
    };

    const handleSave = () => {
        if (selectedFilter.priceRange) {
            delete selectedFilter.priceRange;
        }

        if (selectedFilter.sort) {
            delete selectedFilter.sort;
        }
        const savedData = {
            selectedFilter,
        };
        if (sort !== '') {
            savedData.sort = sort;
        }
        if (priceRange[1] !== 0) {
            savedData.priceRange = priceRange;
        }
        getValue(savedData);
        setOpen();
    };

    const setCheckedFilter = (name, value) => {
        let selected = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < value.length; index++) {
            selected += `${index !== 0 ? ',' : ''}${value[index]}`;
        }
        selectedFilter[name] = selected;
        setFilter({ ...selectedFilter });
    };

    const setSelectedFilter = (code, value) => {
        selectedFilter[code] = value;
        setFilter({ ...selectedFilter });
    };

    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
        >
            <AppBar className={styles.appBar}>
                <IconButton
                    className={styles.btnClose}
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography
                    variant="label"
                    type="bold"
                    align="center"
                    letter="uppercase"
                    className={styles.title}
                >
                    {t('common:title:shortFilter')}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                {itemProps && itemProps.sortBy === false ? null : (
                    <div className={styles.fieldContainer}>
                        <RadioGroup
                            label={itemProps.labelSortBy || t('common:title:short')}
                            valueData={sortByData || []}
                            value={itemProps.sortByValue || sort}
                            onChange={itemProps.sortByChange || setSort}
                        />
                    </div>
                )}
                {loading ? <Loading size="20px" /> : null}
                {data.map((itemFilter, idx) => {
                    const ItemValueByLabel = [];
                    // eslint-disable-next-line no-plusplus
                    for (let index = 0; index < itemFilter.value.length; index++) {
                        ItemValueByLabel.push({
                            label: itemFilter.value[index].label,
                            value: itemFilter.value[index].label,
                        });
                    }
                    if (itemFilter.field !== 'attribute_set_id') {
                        if (itemFilter.field === 'price') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <RangeSlider
                                        label={itemFilter.label}
                                        maxValue={itemFilter.maxprice}
                                        value={priceRange}
                                        onChange={
                                            itemProps.priceRangeChange
                                            || setPriceRange
                                        }
                                    />
                                </div>
                            );
                        } if (itemFilter.field === 'size') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <CheckBox
                                        name={itemFilter.field}
                                        label={itemFilter.label || t('common:title:size')}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex={itemProps.selectSizeFlex || 'row'}
                                        CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                </div>
                            );
                        } if (itemFilter.field === 'color') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <CheckBox
                                        name={itemFilter.field}
                                        label={itemFilter.label || t('common:title:color')}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex={itemProps.selectSizeFlex || 'row'}
                                        CustomItem={itemProps.selectColorItem || CheckBoxColor}
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                </div>
                            );
                        } if (itemFilter.field === 'cat' || itemFilter.field === 'category_id') {
                            return <span key={idx} />;
                        }
                        return (
                            <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                {elastic ? (
                                    <CheckBox
                                        field={itemFilter.field}
                                        label={itemFilter.label || ''}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex="column"
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                )
                                    : (
                                        <RadioGroup
                                            name={itemFilter.field}
                                            label={itemFilter.label || ''}
                                            valueData={itemFilter.value || []}
                                            value={selectedFilter[itemFilter.field]}
                                            onChange={(value) => setSelectedFilter(itemFilter.field, value)}
                                        />
                                    )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            <div className={styles.footer}>
                <Button
                    variant="outlined"
                    className={styles.btnSave}
                    onClick={handleClear}
                >
                    {t('common:button:clear')}
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>
                    {t('common:button:save')}
                </Button>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
