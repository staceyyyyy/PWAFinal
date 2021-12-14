# Description

RangeSlider is module commons to create input price with slider

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |


## How To Install

**1. Import module to your component**
```node
import RangeSlider from '@common_rangeslider';
```

or

```node
import RangeSlider from '{pathModule}/commons/RangeSlider';
```

**2. Place RangeSlider component on your component**

```node
...
 <RangeSlider
    label="Range Price"
    maxValue={1000}
    value={[100, 500]}
    onChange={handleChangeValue }
/>
...
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `label`    | fakse    | text label field slider | `string` |
| `maxValue`    | true    | max value can render number price | `number` |
| `value`    | true    | array value min and max number price, example `[10, 50]` its mean minimum price `10` and max price `50` | `array` |
| `onChange`    | true    | function handle change value | `function` |

