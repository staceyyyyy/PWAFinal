# Description

Module cart can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Cart module and place on your routing
````
import Page from '@core_modules/cart/pages/default';
export default Page;


````

## Use ustom template or overide logic
### 1. import core brand module

````
import Brand from '@core_modules/cart/pages/default/core';
````

### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template
import Skeleton from '@core_modules/cart/pages/default/components/skeleton';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import Layout from '@layout';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import ItemView from '@core_modules/cart/pages/default/components/item';
import EmptyView from '@core_modules/cart/pages/default/components/empty';
import CrossSellView from '@core_modules/cart/pages/default/components/crosssell';
import SkeletonCart from '@core_modules/cart/pages/default/components/skeleton';
import EditDrawerView from '@core_modules/cart/pages/default/components/editDrawer';
import CheckoutDrawerView from '@core_modules/cart/pages/default/components/checkoutBox';
import Core from '@core_modules/cart/pages/default/core'

const Page = (props) => (
    <Core
        {...props}
        ItemView={ItemView}
        EmptyView={EmptyView}
        CrossSellView={CrossSellView}
        SkeletonView={SkeletonCart}
        EditDrawerView={EditDrawerView}
        CheckoutDrawerView={CheckoutDrawerView}
    />
);


Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
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
| SkeletonView      |  true    |  loading view | Component |
| ItemView      |  true    | Component to show list item product | Component  |
| EmptyView      |  true    | Component to handle empty cart | Component |
| CrossSellView      |  true    | component to thos crosssell product | Component |
| EditDrawerView      |  true    | Component to handle edit cart | Component |
| CheckoutDrawerView      |  true    | Component to handle continue checkout proccess and sho final price | Component |
| Content | true | Component to render all components props | component |

## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````


# Properties sent to the component
1. ItemView

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data cart     | Object |
| t     |  function to translate      | Function |
| toggleEditMode     |  function to change edit mode valur     | Function |
| editMode     |  edit mode value true or false      | Boolean |
| deleteItem     |  function to delete item      | Function |
| handleFeed     |  function to handle feed atau add wishlist      | Function |
| toggleEditDrawer     |  function to change edit drawer value      | Function |

function `toggleEditMode` , `toggleEditDrawer` not required params to send, only call this function

function `deleteItem` need params to send if call function, example:

````
{
    id: 2,
    product: {
        id: 1,
        name: 'xxx',
        ...
    },
    quantity: 1,
    prices: {
        min: 12,
        ....
    },
}
````

function `handleFeed` need params to send if call function, example:

````
{
    id: 2,
    product: {
        id: 1,
        name: 'xxx',
        ...
    },
    quantity: 1,
    prices: {
        min: 12,
        ....
    },
}
````

2. CrossSellView

| Props       | Description | Type |
| :---        | :---        |:---  |
| editMode     |  edit mode value      | Boolean |
| data     |  data cart      | Object |

3. EditDrawerView

| Props       | Description | Type |
| :---        | :---        |:---  |
| open     |   value detect edit drawer open or not    | Boolean |
| toggleOpen     |  function to toogle open      | Function |
| updateItem     |  function to update item      | Function |

function `toggleOpen` not required params, only call this function
function `updateItem` need params to send example :

````
{
    cart_item_id: 1,
    quantity: 2,
}
````

4. CheckoutDrawerView

| Props       | Description | Type |
| :---        | :---        |:---  |
| editMode     |  edit mode value       | Boolean |
| t     |  function to translate      | Array |
| updateItem     |  function to update item      | Function |
| data     |  data cart     | Object |

function `updateItem` need params to send example :

````
{
    cart_item_id: id,
    quantity: qty,
}
````

# Default Components

1. ItemView `@core_modules/cart/pages/default/components/item`
2. CrossSellView `@core_modules/cart/pages/default/components/crossell`
3. EditDrawerView `@core_modules/cart/pages/default/components/editDrawer/view`
4. CheckoutDrawerView `@core_modules/cart/pages/default/components/checkoutBox/view`
5. SkeletonVIew `@core_modules/cart/pages/default/components/skeleton`
6. EmptyView `@core_modules/cart/pages/default/components/empty`