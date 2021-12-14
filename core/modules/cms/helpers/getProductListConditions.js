/* eslint-disable no-else-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const getProductListConditions = (conditions) => {
    const newConditions = {
        aggregator: '',
        attributes: [],
    };

    if (conditions) {
        const parsedConditions = JSON.parse(conditions);

        for (const condition_index in parsedConditions) {
            const condition_item = parsedConditions[condition_index];

            if (condition_index.split('--').length === 1 && condition_item.aggregator && condition_item.aggregator === 'all') {
                newConditions.aggregator = 'all';
            }

            if (condition_index.split('--').length === 2 && condition_item.attribute) {
                newConditions.attributes.push(condition_item);
            }
        }
    }

    return newConditions;
};

const generateQueries = (type, variables, sort = 'default') => {
    const ASC = 'ASC';
    const DESC = 'DESC';

    const queryVariables = {
        filter: {},
        sort: {},
    };
    let sortAttribute;

    if (type === 'single_product') {
        return {
            filter: {
                ...variables,
            },
        };
    }

    // prettier-ignore
    switch (sort) {
    case 'default':
        sortAttribute = {}; break;
    case 'alphabetically':
        sortAttribute = { alphabetically: ASC }; break;
    case 'price_low_to_high':
        sortAttribute = { price: ASC }; break;
    case 'price_high_to_low':
        sortAttribute = { price: DESC }; break;
    case 'random':
        sortAttribute = { random: ASC }; break;
    case 'newestfirst':
        sortAttribute = { new_old: DESC }; break;
    case 'oldestfirst':
        sortAttribute = { new_old: ASC }; break;
    case 'new':
        sortAttribute = { new: DESC }; break;
    case 'bestseller':
        sortAttribute = { bestseller: DESC }; break;
    case 'onsale':
        sortAttribute = { onsale: DESC }; break;
    case 'mostviewed':
        sortAttribute = { mostviewed: DESC }; break;
    case 'wishlisttop':
        sortAttribute = { wishlisttop: DESC }; break;
    case 'toprated':
        sortAttribute = { toprated: DESC }; break;
    case 'featured':
        sortAttribute = { featured: DESC }; break;
    case 'free':
        sortAttribute = { free: DESC }; break;

    default:
        sortAttribute = {}; break;
    }
    queryVariables.sort = { ...sortAttribute };

    variables.attributes.forEach((variable) => {
        const { attribute, operator, value } = variable;
        let newValue;
        let filterAttribute;

        if (operator === '<' || operator === '<=') {
            // less than; equals or less than
            newValue = Number(value - 1).toString();
            filterAttribute = { to: operator === '<' ? newValue : value };
        } else if (operator === '>' || operator === '>=') {
            // greater than; equals or greater than
            newValue = Number(value + 1).toString();
            filterAttribute = { from: operator === '>' ? newValue : value };
        } else if (operator === '==') {
            // is
            filterAttribute = { eq: value };
        } else if (operator === '{}') {
            // contains
            filterAttribute = { in: [value] };
        }

        queryVariables.filter[attribute] = {
            ...queryVariables.filter[attribute],
            ...filterAttribute,
        };

        if (attribute === 'price') {
            if (operator === '==') {
                queryVariables.filter.price = { ...queryVariables.filter.price, from: newValue, to: newValue };
            }
        }

        if (attribute === 'category_ids') {
            queryVariables.filter.category_id = { ...queryVariables.filter.category_ids };
            delete queryVariables.filter.category_ids;
        }
    });
    return queryVariables;
};

export { getProductListConditions, generateQueries };
