const getCategoryFromAgregations = (agg) => {
    const category = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < agg.length; index++) {
        if (agg[index].field === 'category_id') {
            // eslint-disable-next-line no-plusplus
            for (let catIdx = 0; catIdx < agg[index].value.length; catIdx++) {
                // only if have product show category
                if (agg[index].value[catIdx].count > 0) {
                    category.push({ label: agg[index].value[catIdx].label, value: agg[index].value[catIdx].value });
                }
            }
        }
    }
    return category;
};

export default getCategoryFromAgregations;
