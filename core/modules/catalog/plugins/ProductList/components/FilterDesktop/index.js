import Filter from '@plugin_productlist/components/Filter';
import View from '@plugin_productlist/components/FilterDesktop/view';

const FilterDialog = (props) => <Filter {...props} FilterView={View} />;

export default FilterDialog;
