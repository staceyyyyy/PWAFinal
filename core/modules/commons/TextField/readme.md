# Description

TextField is module commons to create input field.

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |
| `classnames`   | dependency for merge className | exterlnal dependency |


## How To Install

**1. Import module to your component**
```node
import TextField from '@common_textfield';
```

or

```node
import TextField from '{pathModule}/commons/TextField';
```

**2. Place TextField component on your component**

```node
...
    <TextField
        placeholder="Search ..."
        value={value}
        onChange={handleChangeValue}
    />
...
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `label`    | false    | text label field input | `string` |
| `placeholder`    | false    | text placeholder field input | `string` |
| `disabled`    | false    | disabled input field | `bool` |
| `value`    | true    | value input field | `string` |
| `onChange`    | true    | function change value input field | `function` |
| `fullWidth`    | false    | boolean to style input full width screen or not | `bool` |
| `error`    | false    | show hide error message | `bool` |
| `errorMessage`    | false    | text error message | `string` |
| `footer`    | false    | custom footer componets on bootn after field input | `component` |
| `shrink`    | false    | shrink label on center or top input field | `bool` |
| `...other`    | false    | all props input field material-ui | `props` |

