/* eslint-disable no-prototype-builtins */
/* eslint-disable brace-style */
/**
 * function to get combination available
 * @param selected object example {code: "color", value: "Black"}
 * @param array varians product
 * @returns object product
 */

export const CheckAvailableStock = (attribute = '', variants = []) => {
    let available = true;
    for (let index = 0; index < variants.length; index += 1) {
        if (variants[index].attributes[0].value_index === attribute.value_index) {
            if (variants[index].product.stock_status === 'OUT_OF_STOCK') {
                available = false;
            }
        }
    }
    return available;
};

export const getCombinationVariants = (selected = {}, variants = [], options = []) => {
    const combination = {
        available_combination: [],
    };
    const selectKey = Object.keys(selected);

    if (selected && selectKey.length > 0) {
        let alloptions = [];
        for (let index = 0; index < options.length; index += 1) {
            const { values, attribute_code } = options[index];
            for (let idxVal = 0; idxVal < values.length; idxVal += 1) {
                alloptions.push({
                    code: attribute_code,
                    label: values[idxVal].label,
                    value_index: values[idxVal].value_index,
                });
            }
        }
        for (let index = 0; index < variants.length; index += 1) {
            const { attributes, product } = variants[index];
            if (product.stock_status !== 'IN_STOCK') {
                let first = false;
                for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
                    const { value_index, code } = attributes[idxAtt];
                    if (value_index === selected[code]) {
                        first = true;
                        break;
                    }
                }
                if (first) {
                    for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
                        const { value_index, code } = attributes[idxAtt];
                        if (value_index !== selected[code]) {
                            alloptions = alloptions.filter((att) => att.value_index !== value_index);
                        }
                    }
                }
            }
        }
        combination.available_combination = alloptions;
    }

    return combination.available_combination;
};

export const getOptionVariant = (variants = [], options = []) => {
    const optionVariant = [];

    // lop get all varion options
    for (let index = 0; index < options.length; index += 1) {
        const { values, attribute_code } = options[index];
        for (let idxVal = 0; idxVal < values.length; idxVal += 1) {
            optionVariant.push({
                code: attribute_code,
                label: values[idxVal].label,
                value_index: values[idxVal].value_index,
            });
        }
    }

    // loop variant product to get combine variant
    const optionVariantWithCombine = [];
    for (let index = 0; index < optionVariant.length; index += 1) {
        const option = optionVariant[index];
        let combineVariant = [];
        for (let idxVar = 0; idxVar < variants.length; idxVar += 1) {
            const { product, attributes } = variants[idxVar];
            if (product.stock_status === 'IN_STOCK') {
                let haveOption = false;
                const combineAttribute = [];
                for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
                    const att = attributes[idxAtt];
                    if (att.value_index === option.value_index) {
                        haveOption = true;
                    }
                    combineAttribute.push({
                        code: att.code,
                        label: att.label,
                        value_index: att.value_index,
                    });
                }
                if (haveOption) {
                    // const sameOption = optionVariant.filter((item) => item.code === option.code);
                    // tolong tambahun option item yang sejenis dengan selectednya, misal color semua color di masukin ke combinationnya
                    combineVariant = [
                        ...combineVariant,
                        ...combineAttribute,
                        // ...sameOption,
                    ];
                }
            }
        }
        optionVariantWithCombine.push({
            ...option,
            combination: combineVariant,
        });
    }

    return optionVariantWithCombine;
};

export const generateAvailableCombination = (selected = {}, product = []) => {
    const available = {};
    const selectKey = Object.keys(selected);
    let countSelected = selectKey.length;

    // di cari kombinasi hanya 2 kondisi pertama
    if (countSelected === product.configurable_options.length) {
        countSelected -= 1;
    }

    for (let index = 0; index < product.variants.length; index += 1) {
        const element = product.variants[index];
        const availableOnVariant = {};
        // inisialisasi kalau semua yang di select false
        for (let sltKey = 0; sltKey < countSelected; sltKey += 1) {
            const key = selectKey[sltKey];
            availableOnVariant[selected[key]] = false;
        }

        // ubah menjadi true yang di seleck jika ada dalam variands
        for (let slId = 0; slId < element.attributes.length; slId += 1) {
            const attr = element.attributes[slId];
            if (typeof availableOnVariant[attr.value_index] !== 'undefined') {
                availableOnVariant[attr.value_index] = true;
            }
        }

        let inCombination = true;

        // cek dari semua yang select apakah ada semua
        for (let sltKey = 0; sltKey < countSelected; sltKey += 1) {
            const key = selectKey[sltKey];
            if (inCombination && !availableOnVariant[selected[key]]) {
                inCombination = false;
            }
        }
        if (inCombination) {
            if (element.product.stock_status === 'IN_STOCK') {
                for (let slId = 0; slId < element.attributes.length; slId += 1) {
                    const attr = element.attributes[slId];
                    available[attr.value_index] = attr;
                }
            }
        }
    }
    return available;
};

export const generateValue = (selected = {}, configurable = [], combination = {}) => {
    const selectKey = Object.keys(selected);
    const options = [];
    for (let index = 0; index < configurable.length; index += 1) {
        const element = { ...configurable[index] };
        const value = [];
        let isSwatch = false;
        for (let idSub = 0; idSub < element.values.length; idSub += 1) {
            const subVal = element.values[idSub];
            const initValue = {
                label: subVal.label,
                value: subVal.value_index,
                disabled: false,
                thumbnail: '',
            };
            if (subVal.swatch_data && Object.keys(subVal.swatch_data).length > 0) {
                isSwatch = true;
                if (element.values[idSub].swatch_data.thumbnail) {
                    initValue.thumbnail = subVal.swatch_data.thumbnail;
                }
                initValue.content = subVal.swatch_data.value;
            }

            // kondisi jika belum select semua maka option setelahyang diselect di disabled jika tidak ada
            if (!combination[subVal.value_index] && !selected[element.attribute_code] && selectKey.length !== 0) {
                initValue.disabled = true;
            }
            // jika sudah select semua maka kecuali urutan pertama di coret jika tidak ada
            else if (selectKey.length === configurable.length && selectKey[0] !== element.attribute_code) {
                if (!combination[subVal.value_index]) {
                    initValue.disabled = true;
                }
            }
            value.push(initValue);
        }
        element.isSwatch = isSwatch;
        options.push({
            options: { ...element },
            value,
        });
    }

    return options;
};

export const handleSelected = (selected, key, value) => {
    const selectKey = Object.keys(selected);
    const result = { ...selected };
    // kondisi jika unselect
    if (result[key] && result[key] === value) {
        let position = 0;
        // get position delete item
        for (let index = 0; index < selectKey.length; index += 1) {
            if (key === selectKey[index]) {
                position = index;
            }
        }
        // delete all item after position
        for (let index = 0; index < selectKey.length; index += 1) {
            if (index >= position) {
                delete result[selectKey[index]];
            }
        }
    } else if (result[key]) { // kondisi jika key sama tapi merubah value
        let position = 0;
        for (let index = 0; index < selectKey.length; index += 1) {
            if (key === selectKey[index]) {
                position = index;
            }
        }
        result[key] = value;
        // delete all item after position
        for (let index = 0; index < selectKey.length; index += 1) {
            if (index > position) {
                delete result[selectKey[index]];
            }
        }
    } else {
        result[key] = value;
    }
    return result;
};

// eslint-disable-next-line no-unused-vars
export const handleSelectedDownload = (selected, key, value) => {
    const result = { ...selected };
    if (result.hasOwnProperty(key)) {
        delete result[key];
    } else {
        result[key] = value;
    }
    return result;
};

// eslint-disable-next-line no-unused-vars
export const CheckAvailableOptions = (availableCombination = [], option = {}, value) => {
    let available = false;
    for (let index = 0; index < availableCombination.length; index += 1) {
        if (value.value_index === availableCombination[index].value_index) {
            available = true;
            break;
        }
    }
    return available;
};

/**
 * function to get product by spesific variant
 * @param options object
 * @param array varians product
 * @returns object product
 *  */
export default function productByVariant(options = {}, variants = []) {
    let spesificProduct = {};
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < variants.length; index++) {
        const { attributes } = variants[index];
        let isSpesific = false;
        // eslint-disable-next-line no-plusplus
        for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
            if (typeof options[attributes[idxAtt].code] !== 'undefined') {
                if (options[attributes[idxAtt].code] === attributes[idxAtt].value_index) {
                    isSpesific = true;
                } else {
                    isSpesific = false;
                    break;
                }
            }
        }
        if (isSpesific) {
            spesificProduct = variants[index].product;
            break;
        }
    }
    return spesificProduct;
}
