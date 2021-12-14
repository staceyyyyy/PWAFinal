# Description

Module login can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Login module and place on your routing
````
import Page from '@core_modules/login/pages/default';
export default Page;


````

## Use ustom template or overide logic
### 1. import core register module

````
import Core from '@core_modules/login/pages/default/core';
````

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/login/pages/default/core';

// import your custom view
import Content from './components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'validate', 'login'],
    withAuth: true,
    query: ctx.query,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
 
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
| Content      |  true    | views component, you can use default component or custom | Component |

## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````

# Properties sent to the component

| Name       | Description | Type |
| :---       | :---        |:---        |
| formik     | formik  function handle validation and value for login with email| Function |
| formikOtp     | formik  function handle validation and value for login with phone number (otp) | Function |
| otpConfig     | Value data about graphql otp | Object |
| isOtp     | value to notif use otp or email login| Boolean |
| setIsOtp     | function to toogle use otp or email login | Function |
| setDisabled     | function to toogle disabled or not| Function |
| disabled     | value to notif button login disabled or not | Boolean |
| loading     | value to notif loading or not | Boolean |
| t      | function to translate| Function |