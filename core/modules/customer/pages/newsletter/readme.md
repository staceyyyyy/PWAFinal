# Description

Module customer setting can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Settings module and place on your routing
````
import Page from '@core_modules/customer/pages/setting';
export default Page;


````

## Use ustom template or overide logic
### 1. import core settng module

````
import Core from '@core_modules/customer/pages/setting/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/setting/core';

// create your custom template
import Content from './components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));


````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/setting/components/index`

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
| Content      |  true    | views component, you can use default component or custom | Component |component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|

### 3. Checkbox

this component use to handle subscribe settings, this component use on content component

| Props       | Description | Type | Params to send |
| :---        | :---        |:---  | :---  |
| t     |  function to translate      | Function | - |
| value     |  value checkbox     | Array | - |
| data     |  data value item      | Array | - |
| setSettings     |  function to set settings      | Function | ```` {is_subscribed: false}```` |
| name     |  name of checkbox      | string | - |
| CheckboxView     |  function component View      | Function | - |


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

| Props       | Description | Type | Params to send |
| :---        | :---        |:---  | :---  |
| t     |  function to translate      | Function | - |
| customer     |  data object customer      | Object | - |
| setSettings     |  type o currency string      | Function | ```` {is_subscribed: false}```` |
| dataLang     |  array data language      | Array | - |
| lang     |  value language      | String | - |
| setLang     |  function to set language     | Function |`en` |
| handleSave     |  function to handle save settings     | Function | - |

2. CheckboxView

this component to render checkbox design

| Props       | Description | Type | Params to send |
| :---        | :---        |:---  | :---  |
| t     |  function to translate      | Function | - |
| data    |  array data      | Array | - |
| value    |  array value item      | Array | - |
| handleChange    |  function change value      | Function | `['subscribed']` |
