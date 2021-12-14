# Description

Radio is module commons to create custom Field Radio Group view

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `classnames`   | dependency for merge className | exterlnal dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |


## How To Install

**1. Import module to your component**
```node
import Radio from '@common_radio';
```

or

```node
import Radio from '{pathModule}/commons/Radio';
```

**2. Place Radio component on your component**

```node
....
     <Radio
        value={vakue}
        onChange={handleSelect}
        valueData={data}
        CustomItem={Customitem}
        propsItem={{
            color: 'red'
        }}
    />
....
```
**3. make CustomItems radio**
if you want to create custom item radio, your components must have props
- `selected` = boolean item is selected or not
- `value` = value items
- `label` = text label items
- `onChange` = handle change selected item radio
- `disabled` = boolean disabled selected item radio
- `className` = (optional) custom classname container customitems radio

example
```node 
const SelectSize = ({
    selected,
    value = '',
    label = '',
    className = '',
    onChange = () => {},
    disabled = false,
}) => {
    const styles = useStyles();
    const handleChange = () => {
        // eslint-disable-next-line no-unused-expressions
        !disabled && onChange(value);
    };

    const containerStyle = selected && !disabled
        ? classNames(styles.container, styles.active, className)
        : classNames(styles.container, className);
    const labelStyle = selected
        ? classNames(styles.label, styles.labelActive)
        : styles.label;

    return (
        <div className={containerStyle} onClick={handleChange}>
            <Typograpy className={labelStyle}>{label}</Typograpy>
            { disabled && <div className={styles.disabled} /> }
        </div>
    );
};
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `label`       | false    | label input Radio | `string`|
| `valueData`       | true    | array data for render item radio | `array`|
| `onChange`       | true    | function selected item radio | `function`|
| `value`       | true    | value of selected item | `string`|
| `name`       | false    | name radio field | `string`|
| `CustomItem`       | false    | custom component item radio | `components`|
| `flex`       | false    | direction list item radio one of [`row`, `column`] default `column` | `string`|
| `error`       | false    | show hide error message | `bool`|
| `errorMessage`       | false    | text error message| `string`|
| `propsItem`       | false    | object properties for radio item componnets | `object`|
| `disabled`       | false    | disabled all selected item radio | `bool`|
| `className`       | false    | custom classname div container | `string`|
| `classContainer`       | false    | custom className RadioGroup material-ui | `string`|