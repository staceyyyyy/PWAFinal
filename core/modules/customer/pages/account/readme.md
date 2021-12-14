# Description

Module customer setting can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Settings module and place on your routing
````
import Page from '@core_modules/customer/pages/account';
export default Page;


````

## Use ustom template or overide logic
### 1. import core account module

````
import Core from '@core_modules/customer/pages/account/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/account/core';

// use default component
import CustomerView from '@core_modules/customer/pages/account/components/Customer/view';
import GuestView from '@core_modules/customer/pages/account/components/Guest';

// create your custom template example skeleton
import Skeleton from './components/Skeleton';

const Page = (props) => (
    <Core
        {...props}
        CustomerView={CustomerView}
        Skeleton={Skeleton}
        GuestView={GuestView}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));


````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/customer/pages/account/components/Customer`

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
| CustomerView      |  true    | views component, you can use default component or custom | Component |component or custom | Component |
| Skeleton      |  true    | views component, you can use default component or custom | Component |component or custom | Component |
| GuestView      |  true    | views component, you can use default component or custom | Component |component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|


# Default Components

1. GuestView `@core_modules/customer/pages/account/components/Guest`
2. CustomerView `@core_modules/customer/pages/account/components/Customer/view`
3. Skeleton `@core_modules/customer/pages/account/components/Skeleton`
4. Footer `@core_modules/customer/pages/account/components/Footer`
5. FooterView `@core_modules/customer/pages/account/components/Footer/view`

    this component use on Guest or customer view if use Footer Component, to show menu after wishlist or global menu.

    props send on this component

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - | 
    | blog     |  value to detect enabled r not blog feature      | Number | - | 
    | isLogin     |  value to detect login or not      | Number | - | 
    | handleLogout     |  function to toogle logout      | Function | - | 
    | modules     |  Object config disabled or enabled module      | Object | - | 