# Description

RatingStar is module commons to create view start rating

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/icons` | depedency icon UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |

## How To Install

**1. Import module to your component**
```node
import RatingStar from '@common_ratingstar';
```

or

```node
import RatingStar from '{pathModule}/commons/RatingStar';
```

**2. Place RatingStar component on your component**

```node
....
<RatingStar value={10} maxValue={5} />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `value`       | true    | number value of range | `number` |
| `maxValue`       | false    | max value of range | `number` |
| `sizeIcon`       | false    | number size icon star | `number` |

