#### | RMA modules documentations pages `detail`
# Description
This documentation page category module `rma`.
Module `detail page` can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules. <br>
this module under directory '@core_modules/rma/pages/detail`


## Use default template and no overide
####1. Make dynamic route under root `pages` 
example `{pages}/rma/customer/view/id/[id].js`
####2. import default components on route file 
example

```node
import Page from '@core_modules/rma/pages/history/default';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make dynamic route under root `pages` 
example `{pages}/rma/customer/view/id/[id].js`
### 2. import default components on route file 
example

```node
import Page from '@pages/rma/detail';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/rma/pages/detail/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example loader skeleton uses default
....
import Skeleton from '@core_modules/rma/pages/detail/Skeleton';
....

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

import CoreBase from '@core_modules/rma/pages/detail/core'; //must import and uses core base
import Skeleton from '@core_modules/rma/pages/detail/components/Skeleton'; // import your custom component
import WarningInfo from '@core_modules/rma/pages/detail/components/Info'; // import your custom component
import ItemProduct from '@core_modules/rma/pages/detail/components/ItemProduct'; // import your custom component
import ListMessage from '@core_modules/rma/pages/detail/components/ListMessage';  // import your custom component
import ItemField from '@core_modules/rma/pages/detail/components/ItemField';  // import your custom component
import FormComment from '@core_modules/rma/pages/detail/components/FormComment';  // import your custom component
import Detail from '@core_modules/rma/pages/detail/components/Detail';  // import your custom component
import Footer from '@core_modules/rma/pages/detail/components/Footer';  // import your custom component
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProduct={ItemProduct}
        ListMessage={ListMessage}
        ItemField={ItemField}
        FormComment={FormComment}
        Detail={Detail}
        Footer={Footer}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));




```

### NOTE
#### * `withApollo` and `withTranslation` must be place on first routing for peformance


# Component

## 1. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `WarningInfo`  |  `false`   | Component Alert/Warning Info     | `Component`|
| `Loader`  |  `false`   | Component Loader view     | `Component`|
| `pageConfig`  |  `false`   | Object configuration from component `Layout`    | `Object`|
| `Content`  |  `true`   | Component Content (for List view blog)     | `Component`|

## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````

# Properties sent to the component

### 1. `<WarningInfo />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `message`     |  message of error      | `String`|
| `type`        |  type of error      | `String`|

### 2. `<ItemProduct />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `name`        |  name of product      | `String`|
| `qty_rma`        |  quantity can return      | `Float`|
| `price`        |  price of item product     | `Float`|
| `image_url`        | link image url | `String`|
| `currency`        |  currency code      | `String`|
| `custom_fields`        |  array of selected reason returnable      | `String`|


### 3. `<ItemFieldView />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `name`        |  name for item field can be `input`, `select` or `other`      | `String`|
| `label`        |  label title of item field      | `String`|
| `options`        |  array data options for item field      | `array`|
| `item`        |  object from looping data item field returnable rma     | `object`|
| `select`        |  data selected from option itemFiled      | `any`|
| `handleSelect`        |  handle selectend function      | `function`|
| `errorMessage`        |  text message from logic rma     | `String`|
| `error`        |  boolean  indicator error     | `bool`|
| `fieldValue`        |  object data from filter `item` by `item->id`     | `object`|


### 4. `<ListMessage />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `data`        |  array data list message customer & admin      | `array`|


### 5. `<FormComment />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `commentValue`        |  value of field input comment      | `string`|
| `handleChangeComment`  |  handle change value field input comment| `function`|
| `fileAccept`        |  list string extension accpeted file example `'.jpg,.png, .gif'`    | `string`|

if you uses commons components `<DropZone />` you can include this properties from dropZone

| Props       | Description | Type |
| :---        | :---        |:---  |
| `dropValue`        |  value data file dropzone     | `array`|
| `handleDrop`        |  function handle drop file dropzone      | `function`|
|`handleGetBase64`| function handle get array file with base64 encode file  | `function`|

if you wont custom selected file for comments pleas make parsing file data with encode base64 to function `handleGetBase64` with params array object and must have value object :
```objc 
    [
        {
        "file": "original file from input",
        "baseCode": "encode base64 file from input"`,
        }
    ]
```


### 6. `<Detail />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `detail_rma`        |  Object detail info request RMA     | `object`|


### 2. `<Footer />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `detail_rma`        |  Object detail info request RMA     | `object`|
| `cancelButton`        |  indicator condition show button cancel     | `bool`|
| `updateButton`        |  indicator condition show button update   | `bool`|
| `updateStatusButton`        |  indicator condition show button update status/ button confirm shipping     | `bool`|
| `confirmCancel`        |  function confirm dialog cancel & action cancel     | `function`|
| `actionUpdateStatus`        |  action function for button update status/ button confirm shipping    | `function`|
| `handleUpdate`        |  action  function form button update  | `function`|


#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 