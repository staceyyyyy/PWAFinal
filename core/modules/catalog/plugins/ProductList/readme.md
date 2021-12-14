# Description
`ProductList` is plugin to get and render list product.

## How to use
### 1. Use Default 
import productList on your page or components
example
```node
...
    import ProductList from '@core_modules/catalog/plugins/ProductList/index';
...

```

### 2. use custom componnets
#### import `Core` plugin
```node
import CoreProductList from '@core_modules/catalog/plugins/ProductList/core';
....
```
#### import your custom components or use default components
```node
....
// import your custom components
import TabView from '@common_tabs';
import ErrorMessage from '@core_modules/catalog/plugins/ProductList/components/ErrorMessage';
import ProductListSkeleton from '@core_modules/catalog/plugins/ProductList/components/ProductListSkeleton';
import ImageProductView from '@plugin_productitem/components/Image';
import DetailProductView from '@plugin_productitem/components/Detail';
import ListColorView from '@core_modules/catalog/plugins/ProductList/components/ListColor';
import ListSizeView from '@core_modules/catalog/plugins/ProductList/components/ListSize';
import FilterView from '@core_modules/catalog/plugins/ProductList/components/Filter/view/FilterViews';
import FilterModalView from '@core_modules/catalog/plugins/ProductList/components/Filter/view/FilterDialog';

....

```

#### Make function ProductList
```node
import CoreProductList from '@core_modules/catalog/plugins/ProductList/core';
// import your custom components
import TabView from '@common_tabs';
import ErrorMessage from '@core_modules/catalog/plugins/ProductList/components/ErrorMessage';
import ProductListSkeleton from '@core_modules/catalog/plugins/ProductList/components/ProductListSkeleton';
import ImageProductView from '@plugin_productitem/components/Image';
import DetailProductView from '@plugin_productitem/components/Detail';
import ListColorView from '@core_modules/catalog/plugins/ProductList/components/ListColor';
import ListSizeView from '@core_modules/catalog/plugins/ProductList/components/ListSize';
import FilterView from '@core_modules/catalog/plugins/ProductList/components/Filter/view/FilterViews';
import FilterModalView from '@core_modules/catalog/plugins/ProductList/components/Filter/view/FilterDialog';

const ProductList = (props) => (
    <CoreProductList
        ErrorMessage={ErrorMessage}
        ProductListSkeleton={ProductListSkeleton}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        ListColorView={ListColorView}
        ListSizeView={ListSizeView}
        TabView={TabView}
        FilterView={FilterView}
        FilterModalView={FilterModalView}
        {...props}
    />
);

```


#### use on your components

```node
<ProductList
   defaultSort={{ key: 'relevance', value: 'DESC' }}
    url_path="catalogsearch/result"
    showTabs
    catalog_search_engine={storeConfig.catalog_search_engine}
    t={t}
/>

```


## props components
### 1. Core
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
|`defaultShort`| false | default shorting product list | `object` |
|`customFilter`| false | data to generate list filter | `object` |
|`url_path`| false | url path to reload render after filter save | `string` |
|`catId`| false | category id | `number` |
|`categoryPath`| false | url_path category | `string` |
|`catalog_search_engine`| false | search engin search get from `storeConfig` | `string` |
|`showTabs`| false | show and hide tabs category product | `bool` |
|`ErrorMessage`| true | Alert error message component | `component` |
|`ProductListSkeleton`| true | Skeleton product list component | `component` |
|`ImageProductView`| true | Image product item component | `component` |
|`DetailProductView`| true | Detail product item component | `component` |
|`ListColorView`| true | color view component from configurable product item | `component` |
|`ListSizeView`| true | size view component from configurable product item | `component` |
|`TabView`| true | component tab category | `component` |
|`FilterModalView`| true | Filter modal component | `component` |
|`FilterView`| true | Component button & label filter | `component` |

### 2. `<ErrorMessage />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
|`variant` | true | variant alert must one of `['success', 'warning', 'error', 'info']` | `string`|
| `text` | true | text message | `string` |
 

### 3. `<ImageProductView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `handleClick` | true | fucntion handle clik image | `function` |
| `small_image` | true | object containe key url | `object` |
| `spesificProduct` | true | object detail product from configurable | `object` |
| `name` | false | name product can be use to alt image | `string` |


### 4. `<DetailProductView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `handleClick` | true | fucntion handle clik image | `function` |
| `spesificProduct` | false | object detail product from configurable | `object` |
|`ratingValue`| false | number of value rating | `number` |
|`feed`| true | condition user have click feed/wishlist | `bool` |
|  `handleFeed` | true | function handle action button feed/wishlist | `function` |


### 5. `<ListColorView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
|`onClick`| true | function handle click item color | `function` |
|`color`| true | string color from loop data | `string` |
|`size`| true | number of style size (width & height) item color| `number` |
|`value`| true | value of selected item color | `string` |
|`disabled`| false | disabled item color | `bool` |
|`className`| false | custom className item color | `string` |


### 6. `<ListSizeView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
|`onClick`| true | function handle click item color | `function` |
|`data`| true | string size from loop data | `string` |
|`size`| true | number of style size (width & height) item color| `number` |
|`value`| true | value of selected item color | `string` |
|`disabled`| false | disabled item color | `bool` |
|`className`| false | custom className item color | `string` |


### 7. `<TabView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `value` | true | value of tab condition | `any` |
| `onChange` | true | function handle change value | `function` |
| `data` | true | array data to render item tabs | `array` |

### 8. `<FilterModalView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `products` | true | data from grapqhl `getProduct` | `object` |
| `setOpenFilter` | true | function open filter modal | `function` |
| `loading` | true | loading fetch graphql | `bool` |

### 9. `<FilterView />`
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `loading` | true | loading fetch graphql | `bool` |
| `open` | true | open or close modal dialog | `bool` |
| `setOpen` | true | function to open or close modal dialog | `function` |
| `elastic` | true | bool to generate item components with checkbox | `bool` |
| `sortByData` | true | data to render item filter short by | `array` |
| `sort` | true | value of item filter shorBy | `any` |
| `setSort` | true | function change value item filter shortBy | `function` |
| `priceRange` | true | value item filter price range | `array` |
| `setPriceRange` | true | function change value item filter price range | `function` |
| `selectedFilter` | true | value all item filter | `object` |
| `setSelectedFilter` | true | function to change all item filter select| `function` |
| `setCheckedFilter` | true | function ti change item filter type checkbox | `bool` |
| `handleSave` | true | function to save filter and refetch data product list | `function` |
| `handleClear` | true | function ti clear filter and refetch data product list | `function` |
| `filter` | true | data to render filter item | `array` |
