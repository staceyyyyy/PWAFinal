# Description
`category page` is pages under module `catalog`.

## Installation
`category page` must directly from module `slug`. reason in module `slug` have query  `get resolver` to route in category page. Detail about `slug` at [here](../../slug/readme.md)

###  use default
internally module `slug` have 3 pages `category`, `product` and `cms`.
you don't have to change anything to use this default `category page`.

### use custom components
if you wan to change components under `category page` you must change default import `slug module`. Show documentation about change pages slug module at [here](../../slug/readme.md)

#### 1. import core module
#### 2. if not all custom you can import component on module

```node
// for example loader skeleton uses default
....
import SkeletonView from '@core_modules/catalog/pages/category/components/Skeleton';
....

```

#### 3. create your custom template
#### 4. import your template
#### 5. Place it in custom `page category`
##### example code

```node
import Core from '@core_modules/catalog/pages/category/core';
import BannerView from '@common_slider';
import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import { withTranslation } from '@i18n';
import Sekeltonview from '@custom/category/components/Skeleton';

const CategoryPage = (props) => (
    <Core
        BannerView={BannerView}
        BreadcrumbView={BreadcrumbView}
        TabView={TabView}
        Sekeltonview={Sekeltonview}
        {...props}
    />
);

export default withTranslation()(CategoryPage);


```

## Component
### `<Core />`

#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `BannerView`  |  `false`   | components to render banner image    | `Component`|
| `BreadcrumbView`  |  `false`   | Component to render breadcrumb      | `Component`|
| `TabView`  |  `false`   | Component to render tabView category   | `Component`|
| `Sekeltonview`  |  `false`   | Component to render skeleton loader    | `Component`|
| `pageConfig`  |  `false`   | Object page config from layout component    | `object`|
| `...other`  |  `false`   | all props from moduel `slug`     | `props`|


## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````

# Properties sent to the component

###  `<TabView />`
| Props       | Description | Type |
| :---        |  :---        |:---  |
| `value` | value of tab condition | `any` |
| `onChange` | function handle change value | `function` |
| `data` | array data to render item tabs | `array` |


###  `<BreadcrumbView />`
| Props       | Description | Type |
| :---        |  :---        |:---  |
|data | to render item breadcrumb | array |


###  `<BannerView />`
| Props       | Description | Type |
| :---        |  :---        |:---  |
| data        | data to generate item image data must be object and have key `imageUrl` | array |
| width        | widht of image banner| number |
| height        | height of image banner| number |


#### Note
All components retrieved properties from `withTranslation` see documentation [i18n components api](https://react.i18next.com/latest/translation-render-prop) and `withApollo` see documentation [withApolo components api](https://www.apollographql.com/docs/react/api/react/hoc/#withapollocomponent) 