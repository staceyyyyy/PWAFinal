# Description

Module detail can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Detail module and place on your routing
````
import Page from '@core_modules/product/pages/default';
export default Page;


````

## Use ustom template or overide logic
### 1. import core brand module

````
import Core from '@core_modules/product/pages/default/core';
````
### 2. create your custom template
### 3. import your template
### 4. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import Content from './components';
import Page from '@core_modules/product/pages/default';

const Page = (props) => (
    <Core {...props} Content={Content} />
);

export default withTranslation()(Page);

````

for example components you can copy and  change up to you on  index.js components
````
'@core_modules/product/pages/default/components/index';
````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance


# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|


### 2. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|
| Content  |  true   | Component view content      | Function|

## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````


# Properties sent to the component
1. Content

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data product detail     | Object |
| t     |  function to translate      | Function |
| openOption     |  valu eto notif option show or not      | Boolean |
| setOpenOption     |  function to toogle option      | Function |
| handleOption     |  function to toogle open option with checking product available or not      | Function |
| setBanner     |  function to set banner image      | Function |
| setPrice     |  function to set price      | Function |
| openShare     |  value to notif share link show or not      | Boolean |
| setOpenShare     |  function to toogle share option show or not      | Function |
| route     |  roaute props from next js      | Object |
| banner     |  array banner image on pdp      | Array |
| openDrawer     |  value to notif drawer carousel product show or not      | Boolean |
| setOpenDrawer     |  function to toogle open drawer      | Function |
| breadcrumbsData     |  array breadcrumbsData to show      | Array |
| price     |  Object data current price      | Object |
| handleWishlist     |  function to handle add or remove wishlist      | Function |
| reviewValue     |  Number value average rating      | Number |
| wishlist     |  value to notif product on wishlist or not  | Boolean |
| expandData     |  data detail product on expand      | Array |
| relateData     |  array data related product      | Array |

# Child Components

1. ConfigurableCore

    Component to handle add to cart configurable product, this component on select and add to cart options,
    for detail see `@core_modules/product/pages/default/components/OptionItem` to usage

    ## properties

    | Props       | Description | Type |
    | :---        | :---        |:---  |
    | data     |  data product detail     | Object |
    | t     |  function to translate      | Function |
    | setBanner     |  function to set banner image      | Function |
    | setPrice     |  function to set price      | Function |
    | setOpen     |  function to open option or not      | Function |
    | loading     |  function to translate      | Boolean |
    | setLoading     |  function to set loading      | Function |
    | ConfigurableView     |  Component configurable view      | Function |

2. VirtualCore
    
    Component to handle add to cart virtual product, this component on select and add to cart options,
    for detail see `@core_modules/product/pages/default/components/OptionItem` to usage

     ## properties

    | Props       | Description | Type |
    | :---        | :---        |:---  |
    | data     |  data product detail     | Object |
    | t     |  function to translate      | Function |
    | setOpen     |  function to open option or not      | Function |
    | loading     |  function to translate      | Boolean |
    | setLoading     |  function to set loading      | Function |
    | Footer     |  Component footer view      | Function |


3. SimpleCore

    Component to handle add to cart simple product, this component on select and add to cart options,
    for detail see `@core_modules/product/pages/default/components/OptionItem` to  usage

    ## properties

    | Props       | Description | Type |
    | :---        | :---        |:---  |
    | data     |  data product detail     | Object |
    | t     |  function to translate      | Function |
    | setOpen     |  function to open option or not      | Function |
    | loading     |  function to translate      | Boolean |
    | setLoading     |  function to set loading      | Function |
    | Footer     |  Component footer view      | Function |

4. BundleCore

    Component to handle add to cart bundle product, this component on select and add to cart options,
    for detail see `@core_modules/product/pages/default/components/OptionItem/bundle` to  usage

    ## properties

    | Props       | Description | Type |
    | :---        | :---        |:---  |
    | data     |  data product detail     | Object |
    | t     |  function to translate      | Function |
    | setOpen     |  function to open option or not      | Function |
    | loading     |  function to translate      | Boolean |
    | setLoading     |  function to set loading      | Function |

5. Footer

    Component to select and add to cart product id, this component usage on ConfigurableCore, VirtualCore, and SimpleCore

    for detail see `@core_modules/product/pages/default/components/OptionItem/configurable` to  usage

    ## properties

    | Props       | Description | Type |
    | :---        | :---        |:---  |
    | t     |  function to translate      | Function |
    | loading     |  function to translate      | Boolean |
    | qty     |  function to translate      | Number |
    | handleQty     |  function to handle change quantity      | Function |
    | handleAddToCart     |  function to handle add to cart      | Function |

# Default Components Core
1. ConfigurableCore `@core_modules/product/pages/default/components/OptionItem/configurable`
2. ConfigurableView `@core_modules/product/pages/default/components/OptionItem/configurable/view`
3. SimpleCore `@core_modules/product/pages/default/components/OptionItem/simple`
4. SimpleView `@core_modules/product/pages/default/components/OptionItem/simple/view`
5. VirtualCore `@core_modules/product/pages/default/components/OptionItem/virtual`
6. VirtualView `@core_modules/product/pages/default/components/OptionItem/virtual/view`
7. Footer (bottom button and select qty) `@core_modules/product/pages/default/components/Footer`
8. BundleCore `@core_modules/product/pages/default/components/OptionItem/bundle`
9. BundleView `@core_modules/product/pages/default/components/OptionItem/bundle/view`