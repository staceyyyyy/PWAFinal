# Description

Module customer address can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import address module and place on your routing
````
import Page from '@core_modules/customer/pages/address';

export default Page;
````

## Use ustom template or overide logic
### 1. import core address module

````
import Core from '@core_modules/customer/pages/address/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/address/core';

// import yout custom content
import Content from './components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/address/components/index`

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

    this default content for address


    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - | 
    | address     |  aray list address   | Array | - | 
    | selectedAddressId     |  id default address   | Number | - |
    | handleChange     |  function to change default address | Function | - | 
    | handleOpenNew     |  function to handle show or not form add new address   | Function | - | 
    | handleAddress     |  function to handle save new or update address  | Function | - | 
    | loadingAddress     |  value to notif success save new or edit address   | Boolean | - | 
    | success     |  value to notif success get list address | Boolean | - | 
    | openNew     |  value to notif dialog new address open or not open or not   | Boolean | - | 
    | setOpenDialogNew     |  value to notif detail open or not   | Function | - | 
    | loading     |  value to notif loading or not get address list     | Boolean | - | 


# Default Components

1. Skeleton `@core_modules/customer/pages/address/components/skeleton`
2. ItemAddress `@core_modules/customer/pages/address/components/item`
