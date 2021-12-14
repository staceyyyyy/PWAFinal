import React from 'react';
import { getCrossellCart } from '@core_modules/cart/services/graphql';
import CarouselSkeleton from '@common_slick/Caraousel/Skeleton';
import TagManager from 'react-gtm-module';

const getCrossSellProduct = (items) => {
    let crosssell = [];
    for (let index = 0; index < items.length; index += 1) {
        const data = items[index].product.crosssell_products.map((product) => ({
            ...product,
            categories: items[index].product.categories,
        }));
        crosssell = crosssell.concat(data);
    }
    return crosssell;
};

const CrossSell = (props) => {
    const {
        View, dataCart: { id }, ...other
    } = props;
    const { t } = other;
    let crossell = [];
    const { data, loading, error } = getCrossellCart(id);

    React.useMemo(() => {
        if (data && data.cart && data.cart.items) {
            const crosssellData = getCrossSellProduct(data.cart.items);
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    impressions: crosssellData.map((product, index) => {
                        const category = product.categories && product.categories.length > 0 && product.categories[0].name;
                        return {
                            name: product.name,
                            id: product.sku,
                            category: category || '',
                            price: product.price_range.minimum_price.regular_price.value,
                            list: 'Crossel Products',
                            position: index + 1,
                        };
                    }),
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [data]);

    if (loading) {
        return <CarouselSkeleton />;
    }

    if (!data || error) return <></>;
    if (data && data.cart && data.cart.items) {
        crossell = getCrossSellProduct(data.cart.items);
    }

    if (crossell.length === 0) return null;

    return (
        <View
            data={crossell}
            {...other}
        />
    );
};

export default CrossSell;
