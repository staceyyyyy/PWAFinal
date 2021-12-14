# Description

Plugins mini cart used to show cart on sidebar


# How to install
## Use default template and no overide
### import plugin Cart lugin and place on your component
````
const MiniCart = dynamic(() => import('@plugin_minicart'), { ssr: false });


````

## Use ustom template or overide logic
### 1. import core module module

````
const Core = dynamic(() => import('@plugin_minicart/core'), { ssr: false });
````
### 5. Place it in your component
#### example code
````
import Content from './Content'
const Core = dynamic(() => import('@plugin_minicart/core'), { ssr: false }); ssr: false });

<Core open={open} setOpen={() => setOpen(!open)} count={cartData} Content ={Content}/>

````



# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| SetOpen  |  true   | Function to toogle open or not sidebar     | Function|
| count  |  false   | count default cart item      | Number|


### 2. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| SetOpen  |  true   | Function to toogle open or not sidebar     | Function|
| count  |  false   | count default cart item      | Number|
| Content  |  true   | Content Component      | Function|


# Properties sent to the component
1. ItemView

| Props       | Description | Type |
| :---        | :---        |:---  |
| open     |  value to notif open or not sidebar     | Boolean |
| SetOpen  |  true   | Function to toogle open or not sidebar     | Function|
| count  |  false   | count default cart item      | Number|
| loading     |  loading or not component     | Boolean |
| data     |  data cart     | Object |
| deleteCart     |  function delete cart    | Function |
| updateCart     |  function to update cart      | Function |
| t     |  function to translation      | Function |
