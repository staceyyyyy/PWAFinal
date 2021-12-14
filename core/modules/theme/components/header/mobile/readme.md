# Description

Header is module commons to create header layout

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `@material-ui/icons` | depedency icon UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `classnames`   | dependency for merge className | external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |

## How To Install

**1. Import module to your component**
```node
import Header from '@Header';
```

or

```node
import Header from '{pathModule}/commons/Header';
```

**2. Place Header component on your component**

```node
....
<Header
    LeftComponents={{
        onClick: () => Route.push('/pages')
    }}
    centetCoponents={(<span>Tes</span>)}
/>
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `pageConfig`       | false    | object config header must have one of key `[header (false|absolute|relative), headerBackIcon (string), headerTitle (title)]` | `object` |
| `LeftComponent`       | false    | left componnets can be react componnets, or Object with key `onClick`  | `components` or `object` |
| `CenterComponent`       | false    | custom center components  | `components` |
| `RightComponent`       | false    | custom rigth components | `components` |
| `className`       | false    | custom container classname header  | `string` |

