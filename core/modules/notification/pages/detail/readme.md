# Description

Module customer Notification Detail can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Settings module and place on your routing
````
import Page from '@core_modules/notification/pages/detail';
export default Page;
````

## Use ustom template or overide logic
### 1. import core account module

````
import Core from '@core_modules/notification/pages/detail/core';
````


### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/notification/pages/detail/core';

// import from your custom template
import Content from './components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'notification'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));



````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance
#### * for example you can copy content and change on `@core_modules/notification/pages/detail/components/index.js`

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
| Content      |  true    | views component, you can use default component or custom | Component |component or custom | Component |


# Params sent to the component
  
1. Content

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | t     |  function to translate      | Function | - |
    | data   |  Object data notification     | Object | - |
    | localDateString   |  function to create date on week days     | Function | stringTime example: `2020-05-11 09:52:06` |
    | loading   |  Value to notif loading or not     | Boolean | - |
    | error   |  Object Error type and message     | Object | - |

# Default Components

1. Skeleton `@core_modules/notification/pages/detail/components/Skeleton`