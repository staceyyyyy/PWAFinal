/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */

/**
 * function to grouping city
 * @params array item city
 * @return array city
 *  */
export const groupingCity = (item) => {
    // grouping city
    const city = {};
    for (let index = 0; index < item.length; index += 1) {
        const element = item[index];
        const collection = element.city.split(', ');
        const name = collection[0].replace(/ /g, '_').toLowerCase();
        if (!city[name]) {
            city[name] = {
                label: collection[0],
                name: collection[0],
                id: element.id,
                city: element.city,
                postcode: element.postcode,
            };
        }
    }

    return Object.values(city);
};

/**
 * function to get kelurahan
 */
const generateValue = (group, collection, type, element) => {
    const data = group;
    const name = (collection[type === 'district' ? 1 : 2] || '').replace(/ /g, '_').toLowerCase();
    if (!group[name]) {
        if (typeof collection[type === 'district' ? 1 : 2] !== 'undefined') {
            data[name] = {
                id: element.id,
                parent: collection[type === 'district' ? 0 : 1],
                label: collection[type === 'district' ? 1 : 2],
                name: collection[type === 'district' ? 1 : 2],
                city: element.city,
                postcode: element.postcode,
            };
        }
    }
    return data;
};

/**
 * function to grouping sub city, {kecamatan, kelurahan} by city name
 * @params string parent name
 * @params string type {district, village}
 * @params array item city
 * @return array city
 *  */
export const groupingSubCity = (parent, type, item, additionalOptions = {}) => {
    let group = {};
    for (let index = 0; index < item.length; index += 1) {
        const element = item[index];
        const collection = element.city.split(', ');
        if (type === 'district' && collection[0] === parent) {
            group = generateValue(group, collection, type, element);
        } else if (type === 'village' && collection[1] === parent && additionalOptions.label === collection[0]) {
            group = generateValue(group, collection, type, element);
        }
    }
    return Object.values(group);
};
