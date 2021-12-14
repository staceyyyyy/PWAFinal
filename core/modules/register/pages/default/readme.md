# Description

Module register can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Register module and place on your routing
````
import Page from '@core_modules/register/pages/default';
export default Page;


````

## Use ustom template or overide logic
### 1. import core register module

````
import Core from '@core_modules/register/pages/default/core';
````

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/register/pages/default/core';

// import your custom view
import Content from './components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'validate', 'register'],
    withAuth: true,
    query: ctx.query,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
 
````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * if you  need custom template please copy `index.js` on `@core_modules/register/pages/default/components/index.js` to your custom folder and change this

# Components

### 1. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
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
| t      | function to translate| Function |
| formik     | formik  function handle validation and value| Function |
| otpConfig     | Value data about graphql otp | Object |
| setdisabled     | function to toogle disabled or not| Function |
| disabled     | value to notif button login disabled or not | Boolean |
| handleChangePhone     | function to change phone number | Function |
| handleWa     | function to toogle phone is wa or not | Function |
| phoneIsWa     | value this phone is wa or not | Boolean |
| recaptcha     | value recapcha from google | Object |
| sitekey     | google site key Recapthca | String |
| handleChangeCaptcha     | value to notif button login disabled or not | Function |
| recaptchaRef     | referenc recaptcha field | Const |
