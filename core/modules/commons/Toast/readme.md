# Description

Toast is module commons to create alert message

this component use some dependency and **required**, so you need to install

| Depedency           | Description                                                                                                        | Type                |
| :------------------ | :----------------------------------------------------------------------------------------------------------------- | :------------------ |
| `@material-ui/core` | depedency UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)        | external dependency |
| `@material-ui/lab`  | depedency componnets UI from material ui <br/> link docs [here](https://material-ui.com/components/about-the-lab/) | external dependency |

## How To Install

**1. Import module to your component**

```node
import Toast from '@common_toast';
```

or

```node
import Toast from '{pathModule}/commons/Toast';
```

**2. Place Toast component on your component**

```node
const [open, setOpen] = React.useState(false)

....
    <Toast
        open={open}
        setOpen={()=> setOpen(!open)}
        message="Text Message"
        variant="success"
        autoHideDuration={3000}
    />
....
```

### Properties

| Props              | Required | Description                                                                  | Type     |
| :----------------- | :------- | :--------------------------------------------------------------------------- | :------- |
| `open`             | true     | boolean show or hide toast                                                   | `bool`   |
| `setOpen`          | true     | funtion for update open                                                      | `funct`  |
| `message`          | true     | text message toast                                                           | `string` |
| `variant`          | true     | variant of toast , docs at [here](https://material-ui.com/components/alert/) | `string` |
| `autoHideDuration` | false    | second autohide toast                                                        | `number` |
