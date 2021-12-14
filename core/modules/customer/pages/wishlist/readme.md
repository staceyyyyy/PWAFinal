# Description

Module customer wishlist can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import wishlist module and place on your routing
````
import Page from '@core_modules/customer/pages/wishlist';

export default Page;
````

## Use ustom template or overide logic
### 1. import core wishlist module

````
import Core from '@core_modules/customer/pages/wishlist/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/wishlist/core';
import Skeleton from '@core_modules/customer/pages/wishlist/components/skeleton';

// import yout custom content
import Content from './components';


const Page = (props) => <Core {...props} Content={Content} Skeleton={Skeleton} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/wishlist/components/index`

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
| Content      |  true    | views component, you can use default component or custom | Function |
| Skeleton      |  true    | views component, you can use default component or custom | Function |


# Properties sent to the component

1. Content

    this default content for wishlist


    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - | 
    | wishlist     |  aray list wishlist   | Array | - | 
    | handleRemove     |  function to handle remove wishlist | Function | - | 
    | handleToCart     |  function to handle add to cart  wishlist   | Function | - | 
    | handleAddAlltoBag     |  function to add all wishlish to cart  | Function | - | 
    | loading     |  value to notif loading or not get wishlist list     | Boolean | - | 


# Default Components

1. Skeleton `@core_modules/customer/pages/wishlist/components/skeleton`
