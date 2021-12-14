/* eslint-disable prefer-destructuring */
function urlParser(url, tag = 'href') {
    const resObject = {
        protocol: '',
        domain: '',
        path: '',
        query: '',
        port: '',
        pathArray: [],
    };

    if (tag === 'href') {
        const parser = url.split(tag);
        let quoteParser = parser[1].split('"');
        if (quoteParser.length <= 1) {
            quoteParser = parser[1].split(/'/);
        }
        const urlString = quoteParser[1];
        const domainParser = urlString.split('//');
        const pathParser = domainParser[1].split('/');
        const portParser = pathParser[0].split(':');
        let path = '';
        for (let index = 1; index < pathParser.length; index += 1) {
            path += `/${pathParser[index]}`;
        }

        const queryParser = path.split('?');
        resObject.protocol = domainParser[0].split(':')[0];
        resObject.domain = portParser[0];
        resObject.path = queryParser[0];
        resObject.query = queryParser[1];
        resObject.port = portParser[1];
        resObject.pathArray = pathParser;
    }

    return resObject;
}

export default urlParser;
