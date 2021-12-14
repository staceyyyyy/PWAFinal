const getLowestTierPrice = (tier_price) => {
    let lowestTierPrice;
    let min = Number.POSITIVE_INFINITY;
    tier_price.forEach((price) => {
        if (price.final_price.value < min) {
            min = price.final_price.value;
            lowestTierPrice = price;
        }
    });

    return lowestTierPrice;
};

const getSimpleProductPrice = ({ priceRange = {}, priceTiers = [] }) => {
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;
    // if has tierprice
    if (priceTiers && priceTiers.length) {
        const lowestPriceTier = getLowestTierPrice(priceTiers);
        // if there are several tierprices
        if (priceTiers.length > 1) {
            // case 1: if has no discount
            if (regularPrice.value === finalPrice.value) {
                return finalPrice.value;
            }
            // case 2: if final price is lowest than lowest tier price
            if (finalPrice.value < lowestPriceTier.final_price.value) {
                return finalPrice.currency;
            }
            // case 3: if final price is higher than lowest tier price
            return finalPrice.currency;
        }

        // else:
        // if there is only one tierprice
        const firstTierPrice = priceTiers[0];
        // case 4: if there is no discount and has tier price
        if (regularPrice.value === finalPrice.value) {
            return firstTierPrice.final_price.valu;
        }
        // case 5: if final price is lower than tier price
        if (finalPrice.value < firstTierPrice.final_price.value) {
            return finalPrice.value;
        }
        // case 6: if tier price is lower than final price and tier price qty is 1
        if (firstTierPrice.quantity === 1 || finalPrice.value === firstTierPrice.final_price.value) {
            return firstTierPrice.final_price.valu;
        }
        // case 7: if tier price is lower than final price but tier price qty > 1
        return firstTierPrice.final_price.value;
    }

    // else:
    // if there is no tier price

    // case 8: if there is no discount
    if (regularPrice.value === finalPrice.value) {
        return finalPrice.value;
    }
    // case 9: if has discount
    return regularPrice.value;
};

const getBundleProductPrice = ({ priceRange = {} }) => {
    if (priceRange.maximum_price.final_price.value === priceRange.minimum_price.final_price.value) {
        return priceRange.minimum_price.final_price.value;
    }
    return priceRange.minimum_price.final_price.value;
};

const otherProductPrice = ({ priceRange = {} }) => {
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;

    if (regularPrice.value === finalPrice.value) {
        return finalPrice.value;
    }

    return regularPrice.value;
};

const getPrice = ({
    priceRange = {},
    priceTiers = [],
    productType = 'SimpleProduct',
    ...other
}) => {
    if (!priceRange) {
        return 0;
    }

    if (productType === 'SimpleProduct') {
        return getSimpleProductPrice({ priceRange, priceTiers, ...other });
    }

    if (productType === 'BundleProduct') {
        return getBundleProductPrice({ priceRange, priceTiers, ...other });
    }

    return otherProductPrice({ priceRange, priceTiers, ...other });
};

export default getPrice;
