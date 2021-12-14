/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@common_typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RangeSlider from '@common_rangeslider';
import CheckBox from '@common_checkbox';
import CheckBoxSize from '@common_forms/CheckBoxSize';
import CheckBoxColor from '@common_forms/CheckBoxColor';
import RadioGroup from '@common_radio';
import Skeleton from '@common_skeleton';
import useStyles from '@plugin_productlist/components/Filter/style';

let globalTimeout = null;

const ViewFilter = (props) => {
    const {
        itemProps = {},
        elastic = false,
        t,
        tabs,
        loading,
        priceRange,
        setPriceRange,
        selectedFilter,
        setCheckedFilter,
        setSelectedFilter,
        handleSave,
        handleClear,
        category,
        onChangeTabs,
        isSearch,
        filter,
    } = props;
    const styles = useStyles();
    const checkedFilter = (field, value) => {
        if (globalTimeout) {
            clearTimeout(globalTimeout);
        }
        setCheckedFilter(field, value);
        globalTimeout = setTimeout(() => {
            handleSave();
        }, 1000);
    };

    const selectFilter = (field, value) => {
        if (globalTimeout) {
            clearTimeout(globalTimeout);
        }
        setSelectedFilter(field, value);
        globalTimeout = setTimeout(() => {
            handleSave();
        }, 1000);
    };

    const setPrice = (value) => {
        if (globalTimeout) {
            clearTimeout(globalTimeout);
        }
        setPriceRange(value);
        globalTimeout = setTimeout(() => {
            handleSave();
        }, 1000);
    };
    const generateFilter = (data, itemFilter, idx) => {
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
                const price = priceRange;
                price[1] = price[1] || parseInt(itemFilter.value[itemFilter.value.length - 1].value);
                return (
                    <div key={idx} style={{ width: '100%' }}>
                        <RangeSlider
                            noLabel
                            label={itemFilter.label}
                            maxValue={parseInt(itemFilter.value[itemFilter.value.length - 1].value)}
                            value={price}
                            onChange={
                                itemProps.priceRangeChange
                                || setPrice
                            }
                        />
                    </div>
                );
            } if (itemFilter.field === 'color') {
                return (
                    <div key={idx}>
                        <CheckBox
                            name={itemFilter.field}
                            noLabel
                            label={itemFilter.label || t('catalog:title:color')}
                            data={ItemValueByLabel}
                            value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                            flex={itemProps.selectSizeFlex || 'row'}
                            CustomItem={itemProps.selectColorItem || CheckBoxColor}
                            onChange={(val) => checkedFilter(itemFilter.field, val)}
                        />
                    </div>
                );
            } if (itemFilter.field === 'size') {
                return (
                    <div key={idx}>
                        <CheckBox
                            name={itemFilter.field}
                            noLabel
                            label={itemFilter.label || t('catalog:title:size')}
                            data={ItemValueByLabel}
                            value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                            flex={itemProps.selectSizeFlex || 'row'}
                            CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                            onChange={(val) => checkedFilter(itemFilter.field, val)}
                        />
                    </div>
                );
            } if ((itemFilter.field === 'cat' || itemFilter.field === 'category_id') && !isSearch) {
                return (
                    <span key={idx} />
                );
            }
            return (
                <div key={idx}>
                    {elastic ? (
                        <CheckBox
                            field={itemFilter.field}
                            noLabel
                            label={itemFilter.label || ''}
                            data={ItemValueByLabel}
                            value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                            flex="column"
                            onChange={(val) => checkedFilter(itemFilter.field, val)}
                        />
                    )
                        : (
                            <RadioGroup
                                noLabel
                                name={itemFilter.field}
                                label={itemFilter.label || ''}
                                valueData={itemFilter.value || []}
                                value={selectedFilter[itemFilter.field]}
                                onChange={(value) => selectFilter(itemFilter.field, value)}
                            />
                        )}
                </div>
            );
        }
        return null;
    };
    return (
        <div className={styles.root}>
            {loading ? <Skeleton variant="rect" width="100%" height={705} /> : null}
            {tabs && tabs.length > 0 ? (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={styles.heading}>{t('catalog:title:category')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {tabs.map((val, idx) => {
                                if (val !== 'attribute_set_id') {
                                    return (
                                        <li onClick={(e) => onChangeTabs(e, idx + 1)} className={styles.listCategory} key={idx}>
                                            <Typography variant="span" letter="capitalize">
                                                {val.replace(/_/g, ' ')}
                                            </Typography>
                                        </li>
                                    );
                                }

                                return null;
                            })}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            ) : null}

            {filter.map((itemFilter, idx) => {
                if ((itemFilter.field === 'cat' || itemFilter.field === 'category_id' || itemFilter.field === 'attribute_set_id') && !isSearch) {
                    return (
                        <span key={idx} />
                    );
                }
                return (
                    <Accordion key={idx} defaultExpanded={typeof selectedFilter[itemFilter.field] !== 'undefined'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                className={styles.heading}
                                variant="span"
                                letter="capitalize"
                            >
                                {itemFilter.label.replace(/_/g, ' ')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {generateFilter(filter, itemFilter, idx)}
                        </AccordionDetails>
                    </Accordion>
                );
            })}

        </div>
    );
};

export default ViewFilter;
