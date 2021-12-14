/**
 * function to get query from path
 * @param Object router
 * @returns object
 */
const getQueryFromPath = (router) => {
    let { asPath } = router;
    let path = '';
    if (router.query && router.query.slug) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < router.query.slug.length; index++) {
            path += `/${router.query.slug[index]}`;
        }
    } else {
        path = router.pathname;
    }
    asPath = decodeURI(asPath);
    asPath = asPath.replace(path, '').substr(1);
    asPath = asPath.split('&');
    const query = {};
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < asPath.length; index++) {
        let tempQuery = asPath[index];
        if (tempQuery !== '') {
            tempQuery = tempQuery.split('=');
            // eslint-disable-next-line prefer-destructuring
            query[tempQuery[0]] = tempQuery[1];
        }
    }
    return {
        path,
        query,
    };
};

export default getQueryFromPath;
