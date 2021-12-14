# Description

Button is module coomons to create all

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `classnames`   | dependency for merge className | external dependency |

## How To Install

**1. Import module to your component**
```node
import Button from '@common_button';
```

or

```node
import Button from '{pathModule}/commons/Button';
```

**2. Place button component on your component**

```node
<Button variant="outlined">
    TEST BUTTON
</Button>
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| children       | true    | props children can be text or html component | any |
| rootClassName       | false    | className for root layout button | string |
| className       | false    | classname for button | string |
| variant       | false    | variant button from `@material-ui` | string |
| color       | false    | variant color button from `@material-ui` | string |
| disabled       | false    | bool for disable clik button | bool |
| loading       | false    | bool for show loader button & disable | bool |
| onClick       | false    | head title carousel | string |
| customRootStyle       | false    | overide hard styles root layout button | object |
| href       | false    | link page if button action to link other pages | string |
| all props buttoon       | false    | all property button component html | any |

