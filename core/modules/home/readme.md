# Description

This is a home page module that is used to first load sites.

# How to install
First, enable your module on swift config with key ````home````

copy `home.json` under locales folder and paste tp `static/locales` en and id

this module use `common.json` so if custom, write on namespace required


## Use default template and no overide
####1. Make route under root `pages` 
example `{pages}/index.js`
####2. import default components on route file 
example

```node
import Page from '@core_modules/home/pages/default';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make route under root `pages` 
example `{pages}/index.js`
### 2. import default components on route file 
example

```node
import Page from '@core_modules/home/pages/default';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/home/pages/default/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example loader skeleton uses default
....
import Skeleton from '@core_modules/home/pages/default/components/Skeleton';
....

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

import FeaturedSkeleton from '@common_slider/Carousel/Skeleton';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import BannerSliderSkeleton from './components/Skeleton/BannerSkeleton';
import ErrorInfo from './components/ErrorInfo';
import BannerView from './components/Banner/view';
import Content from './components';
import CategoryListView from './components/CategoryList/view';
import CategoryListSkeleton from './components/Skeleton/CategoryListSkeleton';
import FeaturedView from './components/FeaturedProducts/view';
import Core from './core';

const Page = (props) => (
    <Core
        FeaturedSkeleton={FeaturedSkeleton}
        BannerSliderSkeleton={BannerSliderSkeleton}
        ErrorInfo={ErrorInfo}
        BannerView={BannerView}
        Content={Content}
        CategoryListSkeleton={CategoryListSkeleton}
        CategoryListView={CategoryListView}
        FeaturedView={FeaturedView}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });

export default withApollo({ ssr: true })(withTranslation()(Page));



```

### NOTE
#### * `withApollo` and `withTranslation` must be place on first routing for peformance
##### * if you want to overide module please add logic condition check checkout data and redirection`. 


# Component

## 1. Core
#### Properties
| Props       | Description | Type |
| :---        | :---     | :---        |:---  |
| `ErrorInfo`  |  Component Alert/Error Info     | `Component`|
| `FeaturedSkeleton`  |  Component Sekeleon fetured product| `Component`|
| `BannerSliderSkeleton`  |  Component Sekeleton banner slider   | `Component`|
| `BannerView`  |   Component View Banner slider   | `Component`|
| `Content`  |   Componen for rendereing featured, banner & category list    | `Component`|
| `CategoryListSkeleton`  |  Component view skeleton category list    | `Component`|
| `CategoryListView`  | Component view category list     | `Component`|
| `FeaturedView`  |  Component view fetrued products   | `Component`|

## Override Config
### pageConfig

```node
const pageConfig = {
    title: 'Home page,
    header: false
    bottomNav: 'home',
    pageType: 'home',
    schemaOrg,
    ....
    // you can add some here
};
```

# Properties sent to the component

### 1. `<ErrorInfo />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `message`     |  message of error      | `String`|
| `type`        |  type of error      | `String`|

### 2. `<Content />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `storeConfig`     |  object store config     | `object`|
| `...other`     |  All props from core      | `props`|

### 2. `<BannerView />`
| Props       | Description | Type |
| :---        | :---        |:---  |
|`logoUrl`| link image logo | `string`|
|`images`| array images for render banner slider | `array`|

### 2. `<FeaturedView />`
| Props       | Description | Type |
| :---        | :---        |:---  |
|`url_path`| url path for redirect link category | `string`|
|`products`| array data to render caraousel product | `array`|
|`category_images`| link image category | `string`|
|`name`| name of category | `string`|

### 2. `<CategoryListView />`
| Props       | Description | Type |
| :---        | :---        |:---  |
|`storeConfig`| object store config  | `object`|
|`imageSrc`| link image category | `string`|
|`name`| name category | `string`|
|`description`| content desciption category| `string`|
|`url`| link path category | `string`|



