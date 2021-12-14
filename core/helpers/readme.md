# Auth
auth helpers have function to handle all abput authentication

## Usage

```
import {setLastPathWithoutLogin, getLastPathWithoutLogin, removeLastPathWithoutLogin, setLogin} from '@helper_auth'
```

1. setLastPathWithoutLogin
    
    function to handle save last path
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | path  |  true   | path to save on cookies      | string|

2. getLastPathWithoutLogin
    
    function to handle get last path without login authentication
    
    no params required

3. removeLastPathWithoutLogin
    
    function to handle remove last path without login authentication
    
    no params required

4. setLogin
    
    function to handle save login
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | isLogin  |  true   | flagging login or not 0 or 1      | number|
    | expired  |  false   | date expired token     | date|

5. getLoginInfo
    
    function to check is login or not
    
    no params required


6. removeIsLoginFlagging
    
    function to handle remove flagging login
    
    no params required

# Cart ID

helpers to handle cart id on client side

## Usage

```
import {getCartId, setCartId, removeCartId} from '@helper_cartid'
```

1. getCartId
    
    function to get cart id
    
    no params required

2. setCartId
    
    function to handle save login
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | cartid  |  true   | calue cart id      | string|
    | expired  |  false   | date expired token     | date|

3. removeCartId
    
    function to remove cart id from cookie
    
    no params required

# Check Component

helpers to handle cart id on client side

## Usage

```
import {isClassComponent, isFunctionComponent, isReactComponent} from '@helper_checkcomponent'
```

1. isClassComponent
    
    function to check is class component or not
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | component  |  true   | component to check      | Component|

2. isFunctionComponent
    
    function to check is function component or not
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | component  |  true   | component to check      | Component|

3. isReactComponent

    function to check is react component component or not
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | component  |  true   | component to check      | Component|


# Check Image Src

helpers to handle check image link is undefined  or not

## Usage

```
import {setDefaultWhenEmpty} from '@helper_checkimgsrc'
```

1. setDefaultWhenEmpty
    
    function to check is class component or not
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | img link  |  true   | string img url     | string|


# Config

helpers to handle get host config

## Usage

```
import {getHost, getStoreHost} from '@helper_config'
```

1. getHost

    function to get host config
    
    no params required

2. getStoreHost

    function to get store host config
    
    no params required


# Cookies

helpers to handle all about usage cookies

## Usage

```
import {getCheckoutData, ...} from '@helper_cookies'
```

1. getCheckoutData

    function to get checkout data from client
    
    no params required

2. getCheckoutDataFromRequest

    function to set chackout data
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | ctx  |  true   | contex from node request     | Object|

3. setCheckoutData

    function to set chackout data
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | data  |  true   | data to save in cookies     | no type spesific|

4. removeCheckoutData

    function to remove checkout data
    
    no params required
5. getCookies
    function to get cookies from client side
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | key  |  true   | string key     | string|
6. getCookiesFromRequest
    function to get cookies from server side
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | ctx  |  true   | contex from node request     | Object|
    | key  |  true   | string key     | string|
7. setCookies

    function to set cookies
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | key  |  true   | string key     | string|
    | data  |  true   | value cookies to save     | no spesific type|
    
8. removeCookies
    
    function to remove cookies

    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | key  |  true   | string key     | string|

# Currency

helpers to handle all about usage currency

## Usage

```
import {formatPrice} from '@helper_currentcy'
```

1. formatPrice

    function to format price
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | value  |  true   | string currency to format    | string|
    | currency  |  true   | currency type     | string|


# Date

helpers to handle all about usage date

## Usage

```
import {formatDate} from '@helper_date'
```

1. formatDate

    function to format date
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | date  |  true   | string date    | string|
    | format  |  true   | string format     | string|


# Encryption

helpers to handle all about usage Ecryption

## Usage

```
import {encrypt, decrypt} from '@helper_encryption'
```

1. encrypt

    function to encrypt text
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | text  |  true   | string    | string|

2. decrypt

    function to decrypt text
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | text  |  true   | string    | string|
    

# Fonts

helpers to handle inject fonts

## Usage

```
import {Fonts} from '@helper_fonts'
```

1. Fonts

    function to inject fonts on page
    
    no params required


# Generate Query

helpers to handle get query form path

## Usage

```
import {getQueryFromPath} from '@helper_generatequery'
```

1. getQueryFromPath

    function to get query from path
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | router  |  true   | router fromnext router    | object|


# get path

helpers to handle get path from complete url

## Usage

```
import {getPath} from '@helper_getpath'
```

1. getPath

    function to get path from complete url
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | link  |  true   |   string url  | string|

# No reload

helpers to handle no reload click wit spesific class link

## Usage

```
import {noReload} from '@helper_noreload'
```

1. noReload

    function to handle no reload link from cms with spesific class 'pwa-link'

# Password Strength

helpers to get password score strength

## Usage

```
import {getScore} from '@helper_passwordstrength'
```

1. getScore

    function to get password strength score
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | password  |  true   |   string url  | string|
    | minValue  |  true   |   minimal value length  | number|
    | numberOfRequiredClass  |  true   |   number class count required  | number|

# Product Variant

helpers to handle configurable product

## Usage

```
import {CheckAvailableStock , getCombinationVariants, CheckAvailableOptions, productByVariant} from '@helper_productvariant'
```

1. CheckAvailableStock

    function to get available stock from json product
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | attribute  |  true   |   spesific attribute product  | object|
    | variants  |  true   |   array variants  | array|


2. getCombinationVariants

    function to get combination variants
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | selected  |  true   |   spesific selected variant  | object|
    | variants  |  true   |   array variants  | array|


3. CheckAvailableOptions

    function to get combination variants
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | availableCombination  |  true   |   array combination  | array|
    | value  |  true   |   string value combinatino  | string|

4. getCombinationVariants

    function to get combination variants
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | options  |  true   |  options combination selected  | object|
    | variants  |  true   |   array variants  | array|


# Regex

helpers to get regex config phone

## Usage

```
import {regexPhone} from '@helper_regex'
```

# Text

helpers to remove all tags on string

## Usage

```
import {StripHtmlTags} from '@helper_text'
```

1. StripHtmlTags

    function remove all tags on string
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | text  |  true   |   string to check  | string|

# Theme

helpers to handle about styling

## Usage

```
import {breakPointsUp} from '@helper_theme'
```

1. breakPointsUp

    function to check screen on breakpoint up or not
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | breakpoint  |  true   |   string break point ('s', 'm', ......)  | string|

# Url Parser

helpers to normalize url

## Usage

```
import {urlParser} from '@helper_url'
```

1. breakPointsUp

    function to check screen on breakpoint up or not
    
    | Params       | Required | Description | Type |
    | :---        | :---     | :---        |:---  |
    | url  |  true   |   url string  | string|
    | tag  |  true   |   tag usage url   | string|
