# Description

this module store credit to show history of store credit

# How To Install
## Use default template and no overide
### 1 import store credit module and place on your routing


````
import Page from '@core_modules/productreview/pages/default';

export default Page;
````


## if not all custom you can import component and some component custom

### 1 import Core module to use
````
import Core from '@core_modules/productreview/pages/default/core';
````
## 2. create your custom template
## 3. import your template
## 4. Place it in your page
### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

import Content from './components';
import Core from '@core_modules/productreview/pages/default/core';

const StoreCredit = (props) => <Core {...props} Content={Content} rowsPerPage={20} />;

StoreCredit.getInitialProps = async () => ({
    namespacesRequired: ['common', 'productreview'],
});

export default withApollo({ ssr: true })(withTranslation()(StoreCredit));

````

## Note
### * withapollo and withtranslation must be place on first routing for peformance


# Components
## 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|
| rowsPerPage       |  false   | number how many list show per page     | Number|

## 2. Core
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|
| rowsPerPage       |  false   | number how many list show per page     | Number|

# Override Config
## pageConfig

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
| t     |  function to translate      | Function |
| loading        |  variable to notif is loadmore or not      | Boolean |
| rowsPerPage        |  how many list per page to show      | Number|
| page        |  current page      | Number|
| handleChangePage        |  function to change page      | Function|
| handleChangeRowsPerPage        |  function to change count rows per page      | Function|
| storeCredit        |  Object store credit data      | Object|


function `handleChangePage` and `handleChangeRowsPerPage` need to send params with integer value

