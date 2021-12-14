# Description

ConfirmDialog is module coomons to create all

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |

## How To Install

**1. Import module to your component**
```node
import ConfirmDialog from '@common_confirmdialog';
```

or

```node
import ConfirmDialog from '{pathModule}/commons/ConfirmDialog';
```

**2. Place button component on your component**

```node

<ConfirmDialog
    open={open} // variable boolean for condition is open or not
    handleYes={handleYes} // fuction if yes confirm
    hadleCancel={handleCancel} // fuction if cancel confirm
    message="TesMessage" // tex message dialog confirmation
/>
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `open`       | `true`    | boolean condition for show or hide confirm dialog | `bool` |
| `handleYes`       | `true`    | Function handle yes confirmation | `function` |
| `handleCancel`       | `true`    | FUnction handle cancel confirmation | `function` |
| `message`       | `false`    | Tes Message dialog confirmation | `String` |

