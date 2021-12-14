#Description
commons module is module for all commons components like a button, typography, carousel or others.

## Installation

1. `copy `common.json` under locales folder and paste tp `static/locales` en and id
2. make sure your first page componnets add `common` to array `namespacesRequired` oh Pages.getInitialProps
example
```node
 ....
    Page.getInitialProps = async () => ({
    namespacesRequired: ['rma', 'common'],
});
 ....
```

## Use Default

you can import and uses this module.
##### example
```node
    import Button from '@common_button';
    ..... //other code
```
or
```node
    import Button from '@core_modules/commons/Button';
    ..... //other code
```


## Overide common components
you can overide all commons components with you custom component
example component `<Button />` you will overide all style button.
######follow this instruction
#####1. make your custom comonents 
example you make component `<Button />` under `src/custom/commons/Button`
#####2. update alias import Button components
- open file `.babelrc`
- search name alias for you components that will be custom 
example : 
###### code default
```node

{
    ...
    "plugins": [
        [
            "module-resolver",
            {
                ...
                "alias": {
                    ...
                    "@common_button": "./src/core/commons/Button"  // default path component
                    ....
                }
            }
        ]
    ]
}

```

###### so like this
```node

{
    ...
    "plugins": [
        [
            "module-resolver",
            {
                ...
                "alias": {
                    ...
                    "@common_button": "./src/custom/commons/Button"  // dirrect to you path custom 
                    ....
                }
            }
        ]
    ]
}

```
- save file `.babelrc` 
- DONE


#### Note

##### if you want to custom commons components Please make same property for you custom components with default components. If not possibilty make new error or bug for any pages or componest will be uses commons componnets.


## Documentation all componnets
[- Button]('Button/readme.md')
[- BreadCrumb]('Breadcrumb/readme.md')
[- ConfirmDialog]('ConfirmDialog/readme.md')
[- DropFile]('DropFile/readme.md')
[- GoogleMaps]('GoogleMaps/readme.md')
[- GridList]('GridList/readme.md')
[- PriceFormat]('PriceFormat/readme.md')
[- RatingStar]('RatingStar/readme.md')
[- Tabs]('Tabs/readme.md')
[- Toast]('Toast/readme.md')
[- Typography]('Typography/readme.md')
[- Header]('Header/readme.md')
[- banner]('Ba/rnnereadme.md')
[- Breadcrumb]('Breadcrumb/readme.md')
[- Checkbox]('CheckBox/readme.md')
[- Password]('Password/readme.md')
[- Radio]('Radio/readme.md')
[- Select]('Select/readme.md')
[- TextField]('TextField/readme.md')
