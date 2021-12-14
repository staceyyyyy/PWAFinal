# Description

Tabs is module commons to create custom top tabs view

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |

## How To Install

**1. Import module to your component**
```node
import Tabs from '@common_tabs';
```

or

```node
import Tabs from '{pathModule}/commons/Tabs';
```

**2. Place Tabs component on your component**

```node

....
    <CustomTabs
        data={yourdata}
        onChange={handleChange}
        value={value}
    />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `data`       | true    | data for render tabs item | `array` |
| `onChange`       | true    | function action eevery change or click item tabs | `function` |
| `value`       | true    | value of tabs position | `number` |
| `allItems`       | false    | condition for make `all items` for first item tabs | `bool` |
| `tabsProps`       | false    | object props tabs items, detail at [here](https://material-ui.com/api/tab/) | `object` |
| `containerProps`       | false    | object props app bar (container this tabs components), doc at [here](https://material-ui.com/api/app-bar/) | `object` |

