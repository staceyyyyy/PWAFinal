#### | Blog modules documentations pages `landing`
# Description
This documentation page landing module `blog`.
Module `landing page` can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules. <br>
this module under directory `@core_modules/blog/pages/landing`


## Use default template and no overide
### 1. Make route under root `pages` 
example `{pages}/blog/index.js`
### 2. import default components on route file 
example

```node
import Page from '@core_modules/blog/landing/default';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make route under root `pages` 
example `{pages}/blog/index.js`
### 2. import default components on route file 
example

```node
import Page from '@pages/blog/pages/landing';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/blog/pages/landing/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example Skeleton skeleton uses default

import Skeleton from '@core_modules/components/Skeleton';

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import CoreBase from '@core_modules/blog/landing/core'; // must import and uses core base
import DefaultContent from '@core_modules/blog/components/Landing';  //import your custom layout content
import Skeleton from '@core_modules/blog/landing/components/Skeleton'; //import your Skeleton component
import WarningInfo from '@core_modules/blog/components/Info'; // import your warning/ alert info eror component
import ContentCategory from '@core_modules/blog//components/ModalCategory'; // import your category list component
import ContentItem from '@core_modules/blog/components/Details'; // import your item list components

const Page = (props) => {
    const pageConfig = {
        title: 'Contents Blog',
        header: 'relative', 
        headerTitle: 'New Contents',
        bottomNav: false,
    };

    return (
        <CoreBase
            Content={DefaultContent}
            ContentCategory={ContentCategory}
            ContentItem={ContentItem}
            Skeleton={Skeleton}
            WarningInfo={WarningInfo}
            pageConfig={pageConfig}
            {...props}
        />
    );
}

Page.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
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
| `Skeleton`  |  `false`   | Component Skeleton view     | `Component`|
| `pageConfig`  |  `false`   | Object configuration from component `Layout`    | `Object`|
| `Content`  |  `true`   | Component Content (for List view blog)     | `Component`|
| `ContentCategory`  |  `true`   | Component for list category can be modal or list     | `Component`|
| `ContentItem`  |  `true`   | Component item list content blog     | `Component`|


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
| `loadCategory`     |    object response query graphql get list category  <br> [`loading`, `data`, `error`]  | `object`|


### 3. `<ContentItem />`
| Props       |  Description | Type |
| :---         |:---        |:---  |
| `short`  | boolean for condition render `content` or `short_content`    | `Boolean`|
| `title` | title blog    | `String`|
| `publish_date`  | date published blog    | `String`|
| `featured_image_url`  | link image content blog    | `String`|
| `featured_image_alt`  |  alt image content blog   | `String`|
| `url_key`  | uniq key blog content   | `String`|
| `content` or `short_content`  | html content from data **if** `short` = **true** `content ` is required  **else** `short_content` required  | `HTML`|


### 3. `<ContentCategory />`
| Props       |  Description | Type |
| :---         |:---        |:---  |
| `loadCategory`     |    object response query graphql get list category   <br> [`loading`, `data`, `error`] | `object`|


#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 