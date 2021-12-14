#### | RMA modules documentations pages `history`
# Description
This documentation page category module `rma`.
Module `history page` can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules. <br>
this module under directory '@core_modules/rma/pages/history`


## Use default template and no overide
####1. Make route under root `pages` 
example `{pages}/rma/customer/index.js`
####2. import default components on route file 
example

```node
import Page from '@core_modules/rma/pages/history/default';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make route under root `pages` 
example `{pages}/rma/customer/index.js`
### 2. import default components on route file 
example

```node
import Page from '@pages/rma/history';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/rma/pages/history/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example loader skeleton uses default
....
import Skeleton from '@core_modules/rma/pages/history/Skeleton';
....

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

import CoreBase from '@core_modules/rma/pages/history/core'; // must import and uses core base
import Skeleton from '@core_modules/rma/pages/history/components/Skeleton'; // point to your custom component
import WarningInfo from '@core_modules/rma/pages/history/components/Info';  // point to your custom component
import Content from '@core_modules/rma/pages/history/components';  // point to your custom component
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

const Page = (props) => (
    <CoreBase
        Content={Content}
        Loader={Skeleton}
        WarningInfo={WarningInfo}
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

### 2. `<Content />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `handleLoadMore`     |  function handle load more data      | `function`|
| `loadMore`     |  boolean indicator loadmore data      | `bool`|
| `loading`     |  boolead indicator loading get data     | `bool`|
| `data`     |  data item blog      | `object` or `array`|
| `page`     |  page position current list     | `number`|
| `pageSize`     |  limitiaon of list per page    | `number`|
| `handleChangePage`     |  function for handle change number of page    | `function`|
| `handleChangePageSize`     | function for handle change limitiaon of list per page    | `function`|



#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 