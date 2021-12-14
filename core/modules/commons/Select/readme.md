# Description

Select is module commons to create input select. this components overide of `<TextField />` components material-ui

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |
| `classnames`   | dependency for merge className | exterlnal dependency |


## How To Install

**1. Import module to your component**
```node
import Select from '@common_select';
```

or

```node
import Select from '{pathModule}/commons/Select';
```

**2. Place Select component on your component**

```node
...
  <Select
        options={arrayOptions}
        name="example name"
        label="example label"
        value={exampleValue}
        onChange={handleSelect}
        error={error}
        errorMessage={errorMessage}
    />
...
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `label`    | false    | text label field select | `string` |
| `options`    | true    | array options mus be have key `label` and `value`. example `[{ label: 'select1', value: 1 }]` | `string` |
| `value`    | true    | value of selected options | `string` |
| `onChange`    | true    | function handle select option input | `function` |
| `name`    | false    | string name of field select | `string` |
| `error`    | false    | show hide error message | `bool` |
| `errorMessage`    | false    | text error message | `string` |
| `helperText`    | false    | text placeholder select | `string` |
| `showLabel`    | false    | show hide label select | `bool` |

