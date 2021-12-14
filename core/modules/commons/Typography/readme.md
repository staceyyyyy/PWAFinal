# Description

Typography is module commons to make text typography

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |

## How To Install

**1. Import module to your component**
```node
import Typography from '@common_typography';
```

or

```node
import Typography from '{pathModule}/commons/Typography';
```

**2. Place Typography component on your component**

```node
const [open, setOpen] = React.useState(false)

....
    <Typography
        open={open}
        setOpen={()=> setOpen(!open)}
        message="Text Message"
        variant="succes"
        autoHideDuration={3000}
    />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `children`       | true    | children can be text or components html like `span` , `p` or other| `any` |
| `variant`       | false    | variant of typography on of `['h1','h2','h3','h4', 'h5','h6','p','span','title','label',]` | `string` |
| `type`       | false    | type weight font on of `['bold', 'italic', 'semiBold', 'regular']` | `string` |
| `align`       | false    | align text on of `['top', 'bottom', 'center', 'left']` | `string` |
| `letter`       | false    | style letter text on of `['uppercase', 'capitalize', 'lowercase', 'none']` | `string` |
| `decoration`       | false    | style decoration text on of `['underline', 'none']` | `string` |
| `color`       | false    | color of typography on of `['red', 'green', 'orange', 'white', 'default', 'gray']` | `string` |
| `size`       | false    | style size text on of `['6', '8', '10', '12', '14', '16', '0']` | `string` |

