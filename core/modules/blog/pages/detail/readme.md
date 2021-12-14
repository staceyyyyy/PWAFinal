#### | Blog modules documentations pages `detail`
# Description
This documentation page detail module `blog`.
Module `detail page` can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules. <br>
this module under directory `@core_modules/blog/pages/detail`


## Use default template and no overide
### 1. Make dynamic route under root `pages` 
example `{pages}/blog/[id].js`
### 2. import default components on route file 
example

```node
import Page from '@core_modules/blog/pages/detail/index.js';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make dynamic route under root `pages` 
example `{pages}/blog/[id].js`
### 2. import default components on route file 
example

```node
import Page from '@pages/blog/pages/detail/index';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/blog/pages/detail/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example Skeleton skeleton uses default

import Skeleton from '@core_modules/blog/pages/detail/components/Skeleton';

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import CoreBase from '@core_modules/blog/detail/core'; // must import and uses core base
import DefaultContent from '@core_modules/blog/components/Details'; //import your custom layout content
import Skeleton from ''@core_modules/blog/pages/detail/components/Skeleton';   //import your Skeleton component
import WarningInfo from '@core_modules/blog/components/Info'; // import your warning/ alert info eror component

const DetailPage = (props) => {
     const pageConfig = {
        title: 'Detail Blog',
        header: 'relative', 
        headerTitle: 'Detail',
        bottomNav: false,
    };
    
    return (
        <CoreBase
            Content={DefaultContent}
            Skeleton={Skeleton}
            WarningInfo={WarningInfo}
            pageConfig={pageConfig}
            {...props}
        />
    );
};

DetailPage.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(DetailPage));



```

### NOTE
#### * `withApollo` and `withTranslation` must be place on first routing for peformance


# Component


## 1. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `WarningInfo`  |  `false`   | Component Alert/Warning Info     | `Component`|
| `Skeleton`  |  `false`   | Component Skeleton view     | `Component`|
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


### 1. `<Content />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `short`  | boolean for condition render `content` or `short_content`    | `Boolean`|
| `title` | title blog    | `String`|
| `publish_date`  | date published blog    | `String`|
| `featured_image_url`  | link image content blog    | `String`|
| `featured_image_alt`  |  alt image content blog   | `String`|
| `url_key`  | uniq key blog content   | `String`|
| `content` or `short_content`  | html content from data **if** `short` = **true** `content ` is required  **else** `short_content` required  | `HTML`|


#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 