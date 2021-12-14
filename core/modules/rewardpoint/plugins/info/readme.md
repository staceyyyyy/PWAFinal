    
# Description
This plugin is used to display how many points we have

# How to install

plugin reward point info can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules

# Use default template and no overide
import order detail module and place on your component

````
import PointCard from '../../../../../modules/rewardpoint/plugins/info/default';
````

# use custom template

if you custom template, you can import and and your custom template make props

````
import Core from './core';
// import your custom template
import Content from './template';

const RewardPointInfo = (props) => <Core {...props} Content={Content} />;

export default RewardPointInfo;

````

# Props to send on view template

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data item reward point      | Object |
| loading     |  status request data from server      | Boolean |
| error     |  datanotif if status error      | Boolean |