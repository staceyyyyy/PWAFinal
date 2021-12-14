import CustomRadio from '@common_radio';
// import SelectColor from '@common_forms/SelectColor';
// import SelectSize from '@common_forms/SelectSize';
import Typography from '@common_typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SelectOption from '@common_optionconfigurable';
import useStyles from '@plugin_productitem/components/ConfigurableProductItem/style';

const ConfigurableView = (props) => {
    const {
        option, selected, value, handleSelect,
    } = props;
    const styles = useStyles();
    const classItem = styles.stylesItemOption;

    if (option.isSwatch) {
        let selectedLabel = '';
        if (selected[option.attribute_code]) {
            selectedLabel = value.filter((val) => val.value === selected[option.attribute_code]);
            if (selectedLabel.length > 0) selectedLabel = selectedLabel[0].label;
        }
        const Label = () => (
            <div className={styles.labelContainer}>
                <Typography className="label-select" variant="label" type="bold" letter="uppercase">
                    {`${option.label.replace(/_/g, ' ')}`}
                </Typography>
                <span className="hidden-mobile label-select-value">
                    {selectedLabel}
                </span>
            </div>
        );
        return (
            <CustomRadio
                CustomLabel={Label}
                flex="row"
                CustomItem={SelectOption}
                value={selected[option.attribute_code]}
                valueData={value}
                onChange={(val) => handleSelect(val, option.attribute_code)}
                className={styles.label}
                classContainer={styles.classContainer}
                classItem={classItem}
                propsItem={{
                    className: styles.container,
                    labelClassName: styles.label,
                }}
            />
        );
    }

    return (
        <div className={styles.select}>
            <Typography className="label-select" variant="label" type="bold" letter="uppercase">
                {`${option.label}`}
            </Typography>
            <Select
                value={selected[option.attribute_code] || ''}
                onChange={(val) => handleSelect(val.target.value, option.attribute_code)}
            >
                {value.map((val, key) => (
                    <MenuItem key={key} value={val.value} disabled={val.disabled}>
                        {val.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default ConfigurableView;
