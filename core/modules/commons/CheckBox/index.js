import Typography from '@common_typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
import useStyles from '@common_checkbox/style';

const CheckDefault = ({
    label = '',
    name = '',
    value = '',
    dataValues = [],
    onChange = () => {},
    disabled,
}) => {
    const checked = dataValues.indexOf(value) !== -1;
    const handleChange = () => {
        onChange(value);
    };
    return (
        <FormControlLabel
            disabled={disabled}
            control={(
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="primary"
                    size="small"
                />
            )}
            label={label.replace(/_/g, ' ')}
        />
    );
};

const CustomCheckbox = ({
    label = 'label',
    data = [],
    value = [],
    flex = 'row',
    CustomItem,
    noLabel,
    disabled = false,
    onChange = () => {},
}) => {
    const styles = useStyles();
    const [selected, setSelected] = React.useState(value);
    const checkStyle = classNames('checkbox-container', styles.checkboxContainer, styles[flex]);

    // change value from parent => change state selected
    React.useEffect(() => { setSelected(value); }, [value]);

    // eslint-disable-next-line no-shadow
    const setCheckedFilter = (value) => {
        if (selected.indexOf(value) !== -1) {
            selected.splice(selected.indexOf(value), 1);
        } else {
            selected.push(value);
        }
        onChange(selected);
        setSelected([...selected]);
    };
    return (
        <div className={styles.container}>
            {!noLabel ? (
                <Typography variant="label" type="bold" letter="uppercase">
                    {label}
                </Typography>
            ) : null}

            <div className={checkStyle}>
                {data.map((item, index) => (CustomItem ? (
                    <CustomItem
                        label={item.label ? item.label : item}
                        value={item.value ? item.value : item}
                        dataValues={selected}
                        key={index}
                        onChange={(val) => !disabled && setCheckedFilter(val)}
                        {...item}
                    />
                ) : (
                    <CheckDefault
                        label={item.label ? item.label : item}
                        value={item.value ? item.value : item}
                        dataValues={selected}
                        disabled={disabled}
                        key={index}
                        onChange={(val) => !disabled && setCheckedFilter(val)}
                    />
                )))}
            </div>
        </div>
    );
};

export default CustomCheckbox;
