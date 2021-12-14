# Description

PriceFormat is module commons to create 

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |

## How To Install

**1. Import module to your component**
```node
import PriceFormat from '@common_priceformat';
```

or

```node
import PriceFormat from '{pathModule}/commons/PriceFormat';
```

**2. Place PriceFormat component on your component**

```node
....
    priceRange={priceRange} //price range data
    priceTiers={oriceTiers} //price tiers data
    productType="ProductType" //product type
/>
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `priceRange`       | true    | price range data from graphql `getProduct` | `object` |
| `priceTiers`       | true    |price tiers data from graphql `getProduct`  | `object` |
| `productType`       | true    | product type from graphql `getProduct`  | `object` |

