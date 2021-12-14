
# Description

Module order detail can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules

# How to install
## Use default template and no overide
### import order detail module and place on your routing


````
import Page from '@core_modules/order/pages/detail';

export default Page;
````


## Use ustom template
### 1. import core module

````
import Page from '@core_modules/order/pages/detail/core';
````

### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Page from '@core_modules/order/pages/detail/core';
// import custom template
import Content from './template';
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';

const DefaultOrderDetail = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

DefaultOrderDetail.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrderDetail));


````

## Note
### * withapollo and withtranslation must be place on first routing for peformance

# Components
## 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|

## 2. Core
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |
| Skeleton      |  true    |  views component, you can use default component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|

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
| detail     |  data item order      | Object |
| currency     |  type o currency string      | String |

2. ProductItem

| Props       | Description | Type |
| :---        | :---        |:---  |
| detail     |  data item product      | Object |

# Default Template
1. Skeleton '@core_modules/order/pages/detail/components/skeleton`
2. ProductItem '@core_modules/order/pages/detail/components/product`
3. Footer '@core_modules/order/pages/detail/components/footer`