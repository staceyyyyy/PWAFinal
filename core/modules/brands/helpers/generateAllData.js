/* eslint-disable no-param-reassign */
const generateAllData = (data = []) => {
    // create new array because array from apollo read only
    let brandsList = Object.assign([], data);
    const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const brandA = a.name.toUpperCase();
        const brandB = b.name.toUpperCase();

        let comparison = 0;
        if (brandA > brandB) {
            comparison = 1;
        } else if (brandA < brandB) {
            comparison = -1;
        }
        return comparison;
    };

    brandsList = brandsList.sort(compare);

    let brands = brandsList.reduce((r, e) => {
        // get first letter of name of current element
        const group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
    }, {});
    brands = Object.values(brands);

    return brands;
};

export default generateAllData;
