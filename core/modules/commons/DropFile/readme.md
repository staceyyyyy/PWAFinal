# Description

DropFile is module commons to create upload file with drop or select

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `@material-ui/core` | depedency ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `react-dropzone` | dropzone dependency for react <br/> link docs [here](https://react-dropzone.js.org/)| external dependency |
| `@common_typography` | commons components typography <br />from commons module | internal dependency |

## How To Install

**1. Import module to your component**
```node
import DropFile from '@common_dropfile';
```

or

```node
import DropFile from '{pathModule}/commons/DropFile';
```

**2. Place button component on your component**

```node

    <DropFile
        value={dropValue}
        setValue={handleDrop}
        label={t('rma:form:placeholder:uploadFile')}
        getBase64={handleGetBase64}
        acceptedFile={fileAccept}
    />
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `label`       | `false`    | label for drop area | `string` |
| `title`       | `false`    | label field dropzone | `string` |
| `showListFile`| `false`    | show or hide list file after drop/select | `bool` |
| `acceptedFile`| `false`    | list extension file accepted | `string` |
| `maxSize`    | `false`    | max byte file size | `number` |
| `multiple`   | `false`    | drop can multiple select file or not | `bool` |
| `handleDrop` | `false`    | function handle every drop file | `function` |
| `getBase64`  | `false`    | function handle get all base64 code file | `function` |
| `error`      | `false`    | indicator show or hide error | `bool` |
| `value`      | `false`    | value of all drop file | `array` |
| `setValue`   | `false`    | function set value drop file | `function` |
| `dropValue`  | `false`    | value one file every drop file | `array/object` |

