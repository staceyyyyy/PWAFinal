# Description

This components for footer desktop

# how To install

this module use `common.json` so if custom, write on namespace required

## Use default template and no overide

import footer and place on your layout

```
import Header from '@common_footer`;
```
## use custom template

`@common_footer` is alias from `.babelrc` if you need to custom, change the alias src to your custom folder

you can use the core header with import

`import Core from '@core_modules/theme/components/footer/desktop/core'`

### Props

#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |

#### Props sent on content

| Name       | Description | Type |
| :---       | :---        |:---        |
| t      | function to translate| Function |
| loading     | value to notif loading or not| Boolean |
| storeConfig     | object store config value| Object |
| error       | boolean  indicator error | Boolean | - |
| data        | function to get data cms page | Function | - |

