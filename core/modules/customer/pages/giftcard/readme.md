# Description

Module customer giftcard can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install

before install enable modules on swift config with key `giftcard`
 
## Use default template and no overide
### import giftcard module and place on your routing
````
import Page from '@core_modules/customer/pages/giftcard';

export default Page;
````

## Use ustom template or overide logic
### 1. import core giftcard module

````
import Core from '@core_modules/customer/pages/giftcard/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/giftcard/core';

// import yout custom content
import Content from './components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer']
});

export default withApollo({ ssr: false })(withTranslation()(Page));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/giftcard/components/index`

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


# Properties sent to the component

1. Content

    this default content for giftcard


    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - |
    | storeConfig     |  object config from backend      | Object | - | 
    | openDetail     |  value to notif detail open or not   | Boolean | - | 
    | handleCloseDetail     | function to  close detail     | Function | - | 
    | handleOpenDetail     |  unction to  open detail      | Function | - | 
    | selectedCode     |  value code giftcard      | String | - | 
    | data     |  object data giftcard list      | Object | - | 
    | search     |  object value search giftcard     | Object | - | 
    | handleTextSearch     |  handle onchange text field search      | Function | - | 
    | handleSearch     |  handle search giftcard  | Function | - | 
    | loading     |  value to notif loading or not get detail gift card      | Boolean | - | 
    | error     |  object error get data detail    | Object | - | 


2. Detail
   
   this detail you can use to show detail giftcard, you can import from `@core_modules/customer/pages/giftcard/components/detail`, this components used on Content

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - |
    | open     |   value to notif detail open or not     | Boolean | - |
    | close     |  functio to close     | Function | - |
    | storeConfig     |  object config from backend      | Object | - | 
    | code     |  value code giftcard      | String | - | 
    | DetailView     |  component detail view      | Function | - |

# Default Components

1. Skeleton `@core_modules/customer/pages/giftcard/components/skeleton`
2. DetailView `@core_modules/customer/pages/giftcard/components/detail/view`

    this component use for show detail giftcard
    props send on this component

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - | 
    | loading     |  value to notif loading or not get detail gift card      | Boolean | - | 
    | error     |  object error get data detail    | Object | - | 
    | data     |  data gifcard defail      | Object | - | 
    | open     |  value to detect open or not detail giftcard      | Boolean | - | 
    | close     |  function to close detail      | Function | - | 
    | storeConfig     |  object config from backend      | Object | - | 
    | code     |  value code giftcard      | String | - | 
    