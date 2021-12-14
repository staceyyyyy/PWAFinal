# Description
Module `slug` is module to generate url resolver. In this module have 3 pages or other module like `category product page`, `product detail page` dan `cms page`. 


## Use default template and no overide
####1. Make dynamic route route under root `pages` and must name file `[...slug].js`
####2. import default components on route file 
example

```node
import Page from '@core_modules/slug/index';  // use point to default components module

export default Page;

```


## Use Custom Components

#### 1. Make dynamic route route under root `pages` and must name file `[...slug].js`
#### 2. import default components on route file 
example

```node
import Page from '@custom/slug';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/slug/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example loader LoadingView uses default
....
import LoadingView from '@core_modules/commons/Backdrop';
....

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

import { withApollo } from '@lib_apollo';
import CategoryPage from '@core_modules/catalog/pages/category'; // point to your custom page
import ProductPage from '@pages/slug/pages/product'; // point to your custom page
import CmsPage from '@pages/slug/pages/cms'; // point to your custom page
import Core from '@core_modules/slug/core';
import LoadingView from '@core_modules/commons/Backdrop';

const Page = (props) => (
    <Core
        CategoryPage={CategoryPage}
        ProductPage={ProductPage}
        CmsPage={CmsPage}
        LoadingView={LoadingView}
        {...props}
    />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
*/
Page.getInitialProps = async ({ query, req }) => ({
    slug: query.slug,
    namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
    url_key: req
        ? `${req.protocol}://${req.get('host')}`
        : `${window.location.protocol
        }//${
            window.location.hostname
        }${window.location.port ? `:${window.location.port}` : ''}`,
});

export default withApollo({ ssr: true })(Page);



```

### NOTE
#### * `withApollo` and `withTranslation` must be place on first routing for peformance
#### * module slug not have specifig page like other module, And if you want to overide component 3 pages [`category`, `product`, `cms`] you must overide this module. And nameSpaceRequired translation on 3 pages earlier must be declarade on this module


# Component

## 1. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `LoadinView`  |  `true`   | Component Loading get resolver | `Component`|
| `CategoryPage`  |  `false`   | Component module catalog page category | `Component`|
| `ProductPage`  |  `false`   | Component module catalog page product detail | `Component`|
| `CmsPage`  |  `false`   | Component module Cms page | `Component`|




#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 