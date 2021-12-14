# Description

Breadcrumb is module coomons to create all

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |

## How To Install

**1. Import module to your component**
```node
import Breadcrumb from '@common_breadcrumb';
```

or

```node
import Breadcrumb from '{pathModule}/commons/Breadcrumb';
```

**2. Place Breadcrumb component on your component**

```node
const breadcrumbData = [
    {
        label: "Tes Label",
        active: true,
        link: '/pages/other'
    }
];
....
<Breadcrumb data={breadcrumbData} />
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| data       | true    | data for render item breadcrumb, data must contain object `label`, `link`, and `active` | array |

