/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const StripHtmlTags = (str = '') => {
    if ((str === null) || (str === '')) return false;
    str = str.toString();
    return str.replace(/<[^>]*>/g, '');
};
