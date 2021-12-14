# Description

Module customer profile can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install

this module use `regexPhone` helper, so you need install regex helper. 
 
## Use default template and no overide
### import profile module and place on your routing
````
import Page from '@core_modules/customer/pages/profile';

export default Page;
````

## Use ustom template or overide logic
### 1. import core profile module

````
import Core from '@core_modules/customer/pages/profile/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/profile/core';
import Skeleton from '@core_modules/customer/pages/profile/components/skeleton';

// import yout custom content
import Content from './components';

const Page = (props) => <Core {...props} Content={Content} Skeleton={Skeleton}/>;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/profile/components/index`

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
| Skeleton      |  true    | views loading component, you can use default component or custom | Function |


# Properties sent to the component

1. Content

    this default content for profile


    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - |
    | formik   |  Object formik value     | Object | - |
    | handleChangePhone   |  function to change phone number value      | Function | onchange event |
    | handleWa   |  function to toogle phone number is wa or not      | Function | - |
    | phoneIsWa   |  value to notif phone is wa or not  | Boolean | - |
    | setEditEmail   |  function to toogle edit email or not   | Function | - |
    | editEmail   |  value to notif need to edit email or not      | Boolean | - |
    | setEditPass   |  function to toogle edit password or not      | Function | - |
    | editPass   |  value to notif need to edit password or not  | Boolean | - |
    | updateCustomerStatus   |  object status update customer      | Object | - |
    | changeCustomerPasswordStatus   |  object status update customerpassword     | Object | - |


# Default Components

1. Skeleton `@core_modules/customer/pages/profile/components/skeleton`
    