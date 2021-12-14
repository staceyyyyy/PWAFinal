# Description

This is a confirmpayment module that handle display confirmpayment page.

# How to install
## 1 import contact module and place on your routing

````
import Page from '@core_modules/confirmpayment/pages/default';

export default Page;
````

# Components
## Properties
### 1. Default

| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  | false    | object configuration page layout | Object|

### 2. core

| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|
| Content     |  true    | views component, you can use default component or custom | Function |

# Properties sent to the component

1. Content

    this default content for confirmpayment page

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t           | function to translate      | Function | - | 
    | formik      | Object Formik data validation      | Object | - |
    | handleChangeDate | Function change Date | Function | - |
    | handleDropFile | | Funtion handle file | Funtion | - |