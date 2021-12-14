# Description

This is a thanks page module that is used to redirect page after success place order checkout.

# How to install
First, enable your module on swift config with key ````thanks````

copy `thanks.json` under locales folder and paste tp `static/locales` en and id

this module use `common.json` so if custom, write on namespace required


## Use default template and no overide
####1. Make route under root `pages` 
example `{pages}/checkout/onepage/success.js`
####2. import default components on route file 
example

```node
import Page from '@core_modules/thanks/pages/default';  // use point to default components module

export default Page;

```


## Use Custom Components

### 1. Make route under root `pages` 
example `{pages}/checkout/onepage/success.js`
### 2. import default components on route file 
example

```node
import Page from '@pages/thanks';     //point to your custom page components

export default Page;

```

### 3. import core modules
```node
import CoreBase from '@core_modules/thanks/pages/default/core'; // must import and uses core base
....... 
// write other code
```

### 4. if not all custom you can import component on module

```node
// for example loader skeleton uses default
....
import Skeleton from '@core_modules/thanks/pages/default/components/Skeleton';
....

```

### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code


```node

import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import { getCheckoutDataFromRequest } from '@helper_cookies';
import Core from './core';
import Skeleton from './components/Loader';
import Content from './components';
import ErrorInfo from './components/ErrorInfo';

const Page = (props) => (
    <Core
        Skeleton={Skeleton}
        Content={Content}
        ErrorInfo={ErrorInfo}
        {...props}
    />
);

Page.getInitialProps = async (ctx) => {
    const checkoutData = getCheckoutDataFromRequest(ctx); //this line must be write on you customize
    if (!checkoutData) redirect(ctx, '/'); //this line must be write on you customize
    return {
        query: ctx.query,
        checkoutData, //this line must be write on you customize
        namespacesRequired: ['common', 'thanks'],
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));


```

### NOTE
#### * `withApollo` and `withTranslation` must be place on first routing for peformance
##### * if you want to overide module please add logic condition check checkout data and redirection`. 


# Component

## 1. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `ErrorInfo`  |  `false`   | Component Alert/Error Info     | `Component`|
| `Skeleton`  |  `false`   | Component Skeleton view     | `Component`|
| `pageConfig`  |  `false`   | Object configuration from component `Layout`    | `Object`|
| `Content`  |  `true`   | Component Content (for List view blog)     | `Component`|

## Override Config
### pageConfig

```node
const pageConfig = {
    title: 'example title,
    headerTitle: 'example header title,
    bottomNav: false,
    pageType: 'purchase', // this pageType must be write if you custome pageConfig
    ....
    // you can add some here
};
```

# Properties sent to the component

### 1. `<ErrorInfo />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `message`     |  message of error      | `String`|
| `type`        |  type of error      | `String`|

### 1. `<Content />`
| Props       | Description | Type |
| :---        | :---        |:---  |
| `t`     |  functiin `i18n` translation     | `function`|
| `isLogin`     |  Boolean idicate user login or not      | `Bool`|
| `checkoutData`     |  object data form cookies checkout data      | `object`|
| `handleCotinue`     |  function redirect to contine button      | `function`|
| `ordersFilter`     |  object data detail orders      | `object`|

