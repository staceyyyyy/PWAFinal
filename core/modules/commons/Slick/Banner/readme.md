# Description

Banner is module to create slider banner on home or product detail page

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| react-swipeable-views | depedency swipable| external dependency |
|react-swipeable-views-utils| tools dependency swipable | external dependency|
## How To Install

**1. Import module to your component**
````
import Banner from '@common_slider';
````
or 
````
import Banner from '{path modules}/commons/Banner';
````
**2. Place Banner component on your component**

````
<Banner
    data={[1,2,3]}

/>
````

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| data        | true     | data to generate item image data must be object and have key `imageUrl` | array |
| width        | false     | widht of image banner| number |
| height        | false     | height of image banner| number |
| autoPlay        | false     | autoplay image banner or not| boolean |

