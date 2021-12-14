# Description

this module reward point to show history of reward point

# How To Install
## Use default template and no overide
### 1 import reward point module and place on your routing


````
import Page from '@core_modules/rewardpoint/pages/default';

export default Page;
````


## if not all custom you can import component and some component custom

### 1 import default component to use
````
// for example skeleton not overide and use default template

import Skeleton from '@core_modules/rewardpoint/pages/default/components/skeleton';
````
## 2. create your custom template
## 3. import your template
## 4. Place it in your page
### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

// import your custom template
import Content from './template'

import Core from '@core_modules/rewardpoint/pages/default/core';
import Item from '@core_modules/rewardpoint/pages/default/components/item';
import ErrorView from '@core_modules/rewardpoint/pages/default/components/error';

const RewardPoint = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

RewardPoint.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(RewardPoint));

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
| Skeleton      |  true    |  views component, you can use default 
| ErrorView      |  true    |  views component, you can use default component or custom | Component |
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
| data     |  data list detail reward point      | Object |
| loading        |  variable to notif is loadmore or not      | Boolean |
| getPath        |     function to get path url from array object   | Function |
| getId        |  function to get id from array object  | Function |
| rowsPerPage        |  hay many list per page to show      | Number|
| page        |  current page      | Number|
| handleChangePage        |  function to change page      | Function|
| handleChangeRowsPerPage        |  function to change count rows per page      | Function|