import React from 'react';
import { getCustomizableOption } from '@core_modules/product/services/graphql';

const CustomizableOptionCore = (props) => {
    const { url_key, Content } = props;
    const [getData, {
        data,
    }] = getCustomizableOption(url_key);

    React.useEffect(() => {
        getData();
    }, []);

    if (data && data.products && data.products.items.length > 0 && data.products.items[0].options) {
        return (
            <Content
                {...props}
                {...data.products.items[0]}
            />
        );
    }

    return null;
};

export default CustomizableOptionCore;
