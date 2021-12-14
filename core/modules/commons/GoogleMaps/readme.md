# Description

GoogleMaps is module to create maps drag & search location

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| `react-google-maps `| dependency google maps for react| external dependency |
|`recompose` | dependency from composite props, handler etc | extednal dependency |
| `@material-ui/core` | depedency ui from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
| `@material-ui/icons` | depedency icon UI from material ui <br/> link docs [here](https://material-ui.com/getting-started/installation/)| external dependency |
|`js-cookie`| dependency manage cookies <br/> link docs [here](https://github.com/js-cookie/js-cookie) | external dependency |


## How To Install

**1. Import module to your component**
```node
import GoogleMaps from '@common_googlemaps';
```

or

```node
import GoogleMaps from '{pathModule}/commons/GoogleMaps';
```

**2. Place GoogleMaps component on your component**

```node
...
<GoogleMaps height="230px" mapPosition={mapPosition} dragMarkerDone={handleDragPosition} gmapKey={gmapKey} />
...
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `mapPosition`    | true    | object current position maps and must be have key `lat` and `lng` | `object` |
| `dragMarkerDone`        | true     | function get update postiin lattitude and langitude  | `function` |
| `gmapKey`        | true     | the Google Map API key  | `string` |

