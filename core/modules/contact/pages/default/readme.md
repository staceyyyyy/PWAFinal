# Description

This is a contact module that handle display contact us.

# How to install
## 1 import contact module and place on your routing

````
import Page from '@core_modules/contact/pages/default';

export default Page;
````

## Use ustom template or overide logic
### 1. import core contact module

````
import Core from '@core_modules/contact/pages/default/core';
````

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';

// import yout custom content
import Content from './components';


const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'contact', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/default/components/index`

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

    this default content for Contact

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t           | function to translate      | Function | - | 
    | formik      | Object Formik data validation      | Object | - |
    | error       | boolean  indicator error | Boolean | - |
    | loading     | value to notif loading or not get cms page| Boolean | - |
    | data        | function to get data cms page | Function | - |
    | message     | String to handle message field | String | - |
    | sitekey     | google site key Recapthca | String | - |
    | recaptchaRef | get reference object from parent | Function | - |
    |handleChangeCaptcha | value to notif button login disabled or not | Function | - |