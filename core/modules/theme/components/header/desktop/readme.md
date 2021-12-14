# Description

This components header desktop

# how To install

this module use `common.json` so if custom, write on namespace required


## Use default template and no overide

import header and place on your layout

```
import Header from '@common_headerdesktop`;
```

## use custom template

`@common_headerdesktop` is alias from `.babelrc` so if you need custom change the alias src to your custom folder

you can use the core header with import

`import Core from '@core_modules/theme/components/header/desktop/core'`

### Props

#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |

#### Props sent on content

| Name       | Description | Type |
| :---       | :---        |:---        |
| t      | function to translate| Function |
| isLogin     | value to detect login or not| Boolean |
| category     | object data category| Object |
| loading     | value to notif loading or not| Boolean |
| storeConfig     | object store config value| Object |
| handleSearch     | function to handle search by enter| Function |
| searchByClick     | function to search by click icon Function |
| customer     | object customer data| Object |
| handleLogout     | function to handle logout| Function |
| value     | value search input| string |


note `all function not required params to send, so only call this function`
