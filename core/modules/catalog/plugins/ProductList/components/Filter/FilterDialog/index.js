/* eslint-disable radix */
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
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
import { BREAKPOINTS } from '@theme/vars';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction={window.innerWidth >= BREAKPOINTS.sm ? 'left' : 'up'} ref={ref} {...props} />
));

const FilterDialog = ({
    open,
    setOpen,
    itemProps = {},
    elastic = false,
    loading = false,
    sortByData = [],
    t,
    sort,
    setSort,
    priceRange,
    setPriceRange,
    selectedFilter,
    setCheckedFilter,
    setSelectedFilter,
    handleSave,
    handleClear,
    filter,
    storeConfig,
}) => {
    const styles = useStyles();
    const data = filter;
    return (
        <Drawer
            anchor={typeof window !== 'undefined' && window.innerWidth >= BREAKPOINTS.sm ? 'right' : 'bottom'}
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            classes={{
                paper: styles.drawerPaper,
            }}
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
                    {t('catalog:title:shortFilter')}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                {itemProps && itemProps.sortBy === false ? null : (
                    <div className={`${styles.fieldContainer}`}>
                        <RadioGroup
                            label={itemProps.labelSortBy || t('catalog:title:short')}
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
                                        maxValue={parseInt(itemFilter.value[itemFilter.value.length - 1].value)}
                                        value={priceRange}
                                        storeConfig={storeConfig}
                                        onChange={itemProps.priceRangeChange || setPriceRange}
                                    />
                                </div>
                            );
                        } if (itemFilter.field === 'color') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <CheckBox
                                        name={itemFilter.field}
                                        label={itemFilter.label || t('catalog:title:color')}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex={itemProps.selectSizeFlex || 'row'}
                                        CustomItem={itemProps.selectColorItem || CheckBoxColor}
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                </div>
                            );
                        } if (itemFilter.field === 'size') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <CheckBox
                                        name={itemFilter.field}
                                        label={itemFilter.label || t('catalog:title:size')}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex={itemProps.selectSizeFlex || 'row'}
                                        CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                </div>
                            );
                        } if (itemFilter.field === 'cat' || itemFilter.field === 'category_id') {
                            return <span key={idx} />;
                        }
                        return (
                            <div
                                className={`${styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']}`}
                                key={idx}
                            >
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
                    {t('catalog:button:clear')}
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>
                    {t('catalog:button:save')}
                </Button>
            </div>
        </Drawer>
    );
};

export default FilterDialog;
