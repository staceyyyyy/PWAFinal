# Description

Password is module commons to create custom Field Password view

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `classnames`   | dependency for merge className | exterlnal dependency |
| `@material-ui/icons` | depedency icon UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
|`js-cookie`| dependency manage cookies <br/> link docs [here](https://github.com/js-cookie/js-cookie) | external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |
| `@common_textfield` | commons components input <br />from commons module | internal dependency |


## How To Install

**1. Import module to your component**
```node
import Password from '@common_password';
```

or

```node
import Password from '{pathModule}/commons/Password';
```

**2. Place Password component on your component**

```node
....
    <Password
        name="password"
        label="Password"
        placeholder="********"
        value={valuePassword}
        onChange={handleChange}
        error={errorPassword}
        errorMessage={errorMessage || null}
        showVisible
    />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `label`       | false    | label input password | `string`|
| `value`       | true    | value input password | `string`|
| `onChange`       | true    | function handle change input | `function`|
| `showPasswordMeter`  | false    |  w or hide password strength meter| `bool`|
| `showVisible`    | false    | show or hide visible icon password | `bool`|
| `error`       | false    | show or hide error message | `bool`|
| `errorMessage`       | false    | error message input | `string`|
| `...other`       | false    | all props `<Input />` components material-ui | `props`|
