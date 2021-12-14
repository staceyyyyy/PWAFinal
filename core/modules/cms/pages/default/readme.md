# Description

This is a cms module that handle display cms page.

# How to install

`cms page` must directly from module `slug`, to get url cms page. 
Detail about `slug` at [here](../../slug/readme.md)

# Components
## Properties
### 1. Default

| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  | false    | object configuration page layout      | Object|

### 2. core

| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|
| Content     |  true    | views component, you can use default component or custom | Function |
| slug        |  true    | Function to get url key cms page | Function |

# Properties sent to the component

1. Content

    this default content for cms page

    | Props       | Description | Type | Params to send |
    | :---        | :---        |:---  | :---  |
    | error       | boolean  indicator error | Boolean | - |
    | loading     | value to notif loading or not get cms page| Boolean | - | 
    | t           | function to translate      | Function | - |
    | data        | function to get data cms page | Function | - |