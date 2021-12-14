#### | RMA modules documentations pages `new request `
# Description
This documentation page category module `rma`.
Module `new request page` can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules. <br>
this module under directory `@core_modules/rma/pages/new`


## Use default template and no overide
####1. Make dynamic route under root `pages` 
example `{pages}/rma/customer/new/order_id/[id].js`
####2. import default components on route file 
example

```node
import Page from '@core_modules/rma/pages/new/index.js';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make dynamic route under root `pages` 
example `{pages}/rma/customer/new/order_id/[id].js`
### 2. import default components on route file 
example

```node
import Page from '@pages/rma/new';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/rma/pages/new/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example loader skeleton uses default
....
import Skeleton from '@core_modules/rma/pages/new/Skeleton';
....

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

import CoreBase from '@core_modules/pages/new/core'; //must import core & uses
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Skeleton from '@core_modules/pages/new/components/Skeleton';  //point to your custom components
import WarningInfo from '@core_modules/pages/new/components/Info'; //point to your custom components
import ItemProductView from '@core_modules/pages/new/components/ItemProduct/views'; //point to your custom components
import ItemFieldView from '@core_modules/pages/new/components/ItemField/view'; //point to your custom components
import OtherRmaLink from '@core_modules/pages/new/components/ItemProduct/views/OtherRmaLink'; //point to your custom components

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProductView={ItemProductView}
        ItemFieldView={ItemFieldView}
        OtherRmaLink={OtherRmaLink}
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
| `ItemProductView`  |  `true`   | Component checkbox with detail product    | `Component`|
| `ItemFieldView`  |  `true`   | Component field select reason or detail rma    | `Component`|
| `OtherRmaLink`  |  `true`   | Component link list other id rma    | `Component`|

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

### 2. `<ItemProductView />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `name`        |  name of product      | `String`|
| `price`        |  price of item product     | `Float`|
| `image_url`        | link image url | `String`|
| `currency`        |  currency code      | `String`|
| `checked`        |  condition product item is selected      | `bool`|
| `disabled`        |  condition product disable selected      | `bool`|
| `handleChange`        |  function handle checked and disceked product item      | `function`|


### 3. `<ItemFieldView />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `name`        |  name for item field can be `input`, `select` or `other`      | `String`|
| `label`        |  label title of item field      | `String`|
| `options`        |  array data options for item field      | `array`|
| `select`        |  data selected from option itemFiled      | `any`|
| `handleSelect`        |  handle selectend function      | `function`|
| `errorMessage`        |  text message from logic rma     | `String`|
| `error`        |  boolean  indicator error     | `bool`|


### 4. `<OtherRmaLink />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `other_rma_request`        |  list data other rma request from one product item     | `array`|

#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 