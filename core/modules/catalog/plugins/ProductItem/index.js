import Core from '@plugin_productitem/core';
import ImageProductView from '@plugin_productitem/components/Image';
import DetailProductView from '@plugin_productitem/components/Detail';
import LabelView from '@plugin_productitem/components/LabelView';
import ConfigurableView from '@plugin_productitem/components/ConfigurableProductItem/view';

const ProductItem = (props) => (
    <Core
        {...props}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        LabelView={LabelView}
        ConfigurableView={ConfigurableView}
    />
);

export default ProductItem;
