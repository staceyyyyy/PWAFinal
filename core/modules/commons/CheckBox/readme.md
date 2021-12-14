# Description

CheckBox is module commons to create custom CheckBox list view

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |
| `classnames`   | dependency for merge className | exterlnal dependency |

## How To Install

**1. Import module to your component**
```node
import CheckBox from '@common_checkbox';
```

or

```node
import CheckBox from '{pathModule}/commons/CheckBox';
```

**2. Place CheckBox component on your component**

```node
....
    <CheckBox
        data={data} // your array data
        label="tes label" //label list checkbox
        value={selectItem} // value all selected checkbox list
        onChange={handleSelect} // handle change select checkbox
        flex="column" // direction list checkbox
        CustomItem={CustomItem} // your custom item selected checkbox
    />
....
```

**3. make customItems checkbox**
if you want to create custom item checkbox, your components must have props
- `value` = value item is selected or not
- `dataValues` = all values list selected checkbox
- `onChange` = handle change selected item checkbox
- `label` = optional label item checkbox

example
```node

// follow this code for make custom items
const Customitem = ({
    label = '',
    name = '',
    value = '',
    dataValues = [],
    onChange = () => {},
}) => {
    const checked = dataValues.indexOf(value) !== -1;
    const handleChange = () => {
        onChange(value);
    };
    return (
        <FormControlLabel
            control={(
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="primary"
                    size="small"
                />
            )}
            label={label}
        />
    );
};

```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `data`       | true    | array data for render list item checkbox | `array` |
| `label`       | false    | text label title checkbox list | `string` |
| `value`       | true    | data values selected item checkbox | `array` |
| `flex`       | false    | direction render list item checkbox, one of [`row`, `column`] default `row` | `string` |
| `Customitem`       | true    | custom items list checkbix| `components` |
| `onChange`       | true    | function handle selected value checkbox | `function` |
