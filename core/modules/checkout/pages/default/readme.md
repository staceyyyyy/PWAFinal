# Description

Module checkout can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Checkout module and place on your routing
````
import Page from '@core_modules/checkout/pages/default';
export default Page;
````


### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template
import CashbackInfo from '@core_modules/checkout/pages/default/components/CashbackInfo';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import Layout from '@layout';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Head from 'next/head';
import { modules } from '@config';
import Core from './core';
import CashbackInfo from '@core_modules/checkout/pages/default/components/CashbackInfo';
import EmailView from '@core_modules/checkout/pages/default/components/email/view';
import DeliveryView from '@core_modules/checkout/pages/default/components/delivery/view';
import DeliverySkeleton from '@core_modules/checkout/pages/default/components/delivery/skeleton';
import SummaryView from '@core_modules/checkout/pages/default/components/summary/view';
import AddressView from '@core_modules/checkout/pages/default/components/address/view';
import ShippingView from '@core_modules/checkout/pages/default/components/shipping/view';
import PaymentView from '@core_modules/checkout/pages/default/components/payment/view';
import GiftCardView from '@core_modules/checkout/pages/default/components/giftcard/view';

// example only change FieldPoint
import FieldPointView from './components/fieldcode';


import RewardPointView from '@core_modules/checkout/pages/default/components/rewardpoint/view';
import StoreCreditView from '@core_modules/checkout/pages/default/components/credit/view';

const Page = (props) => (
    <Core
        {...props}
        containerStyle={{ paddingBottom: '150px' }}
        CashbackInfoView={CashbackInfo}
        EmailView={EmailView}
        DeliveryView={DeliveryView}
        DeliverySkeleton={DeliverySkeleton}
        SummaryView={SummaryView}
        AddressView={AddressView}
        ShippingView={ShippingView}
        PaymentView={PaymentView}
        PromoView={FieldPointView}
        GiftCardView={GiftCardView}
        RewardPointView={RewardPointView}
        StoreCreditView={StoreCreditView}
    />
);


Page.getInitialProps = async (ctx) => {
    const cartId = cookies(ctx).nci || null;

    if (!cartId) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', '/checkout/cart');
            return { props: {}, namespacesRequired: ['common', 'checkout', 'customer', 'validate'] };
        }
        Router.push('/checkout/cart');
    }

    return {
        namespacesRequired: ['common', 'checkout', 'validate'],
        cartId,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));


````

### Note
#### * this module use cartId, so need get from cookies first on getInitialProps
#### * this module use redirex, so need get from next redirect or use node redirect first on getInitialProps
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
| containerStyle  |  false   | object configuration custom style container      | Object|
| CashbackInfoView| true | template show how many cashback get by customer| Function Component |
| EmailView| true | template show how many cashback get by customer| Function Component |
| DeliveryView| true | template show delivery option| Function  Component|
| DeliverySkeleton| true | template show how many cashback get by customer| Function  Component|
| SummaryView| true | template show summary | Function  Component|
| AddressView| true | template handle address | Function  Component|
| ShippingView| true | template handle shipping | Function  Component|
| PaymentView| true | template handle payment | Function  Component|
| PromoView| true | template handle promo | Function  Component|
| GiftCardView| true | template handle giftcard | Function  Component|
| RewardPointView| true | template handle reward point | Function  Component|
| StoreCreditView| true | template handle store credit | Function  Component|
| config | false | config checkout module value| Object|
|Content| true | components to render all components & view | components|

## example configuration props `config`

````
{
    successRedirect: {
        link: 'https://swiftpwa-be.testingnow.me/pwacheckout/onepage/success',
        orderId: true
    },
    cartRedirect : {
        link: 'https://swiftpwa-be.testingnow.me/checkout/cart'
    },
    loginRedirect : {
        link: 'https://swiftpwa-be.testingnow.me/customer/account/login'
    }
}
````

# Properties sent to the component
1. CashbackInfo

| Props       | Description | Type |
| :---        | :---        |:---  |
| message     |  message to show on template      | Array |
| currency     |  type  currency string      | String |
| price     |  amout cashback      | Number |

2. EmailView

| Props       | Description | Type |
| :---        | :---        |:---  |
| formik     |  Formik function     | Function |
| setAnchorEl     |  function to set anchorEl to set on popover material ui     | Function |
| anchorEl     |  anchorEl to set on popover material ui      | Array |
| open     |  value to notif anchor popover show or not      | Boolean |
| t     |  function to translation      | Function |

3. DeliveryView

| Props       | Description | Type |
| :---        | :---        |:---  |
| checkout     |  data checkout from be      | Object |
| handleSelect     |  function to select shiping method     | Function |


params to send on `handleSelect` method type `string` value `home` or `pickup` 

4. Summary View

| Props       | Description | Type |
| :---        | :---        |:---  |
| handlePlaceOrder     |  handle place order       | Function |
| loading     |   value to notif loading or no place order   | Boolean |
| data     |  data object checkout    | Object |
| total     |  total price summary    | number |
| t     |  function to translate     | Function |
| disabled     |  value to notif can place order or not     | Boolean |

`handlePlaceOrder` method not required params, only call this function

5. AddressView

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data checkout has been proccess       | Object |
| checkout     |  data checkout from be       | Function |
| setAddress     |  handle set address       | Function |
| setCheckout     |  function to handle set checkout data      | Function |
| t     |  function to handle translation      | Function |
| dialogProps     |  data address        | Object | 
| loading     |  value to notif loading or no place order       | Boolean |
| address     |  default address data       | Object |
| content     |  string message address       | String |

6. ShippingView

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data checkout has been proccess      | Object |
| checkout     |  data checkout from be      | Function |
| handleShiping     |  handle select shipping method, data send must be on example       | Function |
| storeConfig     | object variable config swift app       | Object |
| selected     |  object selected value       | Object |
| t     |  function to handle translation      | Function |
| loading     |  value to notif loading or no    | Boolean |

params to send on `handleShiping` method type `object` example: 
````
{
    "name": {
        "carrier_code":"flatrate",
        "method_code":"flatrate"
    },
    "price":"$10.00"
}
````

7. PaymentView

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data checkout has been proccess       | Object |
| checkout     |  data checkout from be       | Function |
| storeConfig     | object variable config swift app       | Object |
| selected     |  object selected value       | Object |
| t     |  function to handle translation      | Function |
| loading     |  value to notif loading or no    | Boolean |
| handlePayment |  function to set payment method    | Boolean |

params to send on `handlePayment` props `string` payment method example `snap_banktransfer_bca`

8. PromoView
   
| Props       | Description | Type |
| :---        | :---        |:---  |
|    value |  value input text code  | String |
|    placeholder |  place holder input text  | String |
|    action |  action apply code  | function |
|    onChange |  handle change input text  | function |
|    disabled |  value disabled or not input text  | Boolean|
|    id |  id input text  | String |
|    name |   name input text | String |
|    error | object error from formik   | Onject |
|    errorMessage |  message error  | String |
|    loading | valu to notif loading or not   | Boolean |



# Default Template
1. CashbackInfo `@core_modules/checkout/pages/default/components/CashbackInfo`
2. EmailView `@core_modules/checkout/pages/default/components/email`
3. DeliveryView `@core_modules/checkout/pages/default/components/delivery`
4. DeliverySkeleton `@core_modules/checkout/pages/default/components/delivery/skeleton`
5. SummaryView `@core_modules/checkout/pages/default/components/summary/view`
6. ShippingView `@core_modules/checkout/pages/default/components/shipping/view`
7. PaymentView `@core_modules/checkout/pages/default/components/payment/view`
8. FieldCode `@core_modules/checkout/components/fieldcode`
   
   - Field code can use on promo code view