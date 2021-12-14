# Description

GridList is module commons to create grid list components

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| classnames   | dependency for merge className | external dependency |

## How To Install

**1. Import module to your component**
```node
import GridList from '@common_gridlist';
```

or

```node
import GridList from '{pathModule}/commons/GridList';
```

**2. Place GridList component on your component**

```node
...
const arrayData = ['tes', 'tes2']
const ItemComponents = (color = 'red', item) => (<p>{color, item}<p>)
....
<GridList
    data={arrayData}
    ItemComponent={ItemComponents}
    itemProps={{
        color: 'blue'
    }}
    gridItemProps={{ xs: 6, sm: 4, md: 3 }}
/>
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `data`       | true    | props for looping list data to grid  | `array` |
| `ItemComponent`       | true    |  components item for looping at grid item | `components` |
| `itemProps`       | false    | object props for `ItemComponents`  | `object` |
| `gridItemProps`       | false    | object props for `Grid` container <br> show detail [here](https://material-ui.com/api/grid/)  | `object` |
| `className`       | false    | custom className  | `string` |
| `gridContainerProps`       | false    |  object props for `Grid` items <br> show detail [here](https://material-ui.com/api/grid/)   | `object` |

