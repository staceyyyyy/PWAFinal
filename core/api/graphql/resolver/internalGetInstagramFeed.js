const { features: { magezon: { instagramFeed } } } = require('../../../../swift.config');
const { decrypt } = require('../../../helpers/encryption');

const internalGetInstagramFeed = async (parent, { token }) => {
    const decodeToken = decrypt(token);
    return fetch(instagramFeed.urlGraph + decodeToken, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.data && data.data.length > 0) {
                return {
                    message: 'Success',
                    data: data.data,
                };
            }
            return {
                message: 'Success',
                data: [],
            };
        })
        .catch((err) => {
            throw new Error({
                message: 'Failed',
                data: [],
                err: JSON.stringify(err),
            });
        });
};

module.exports = internalGetInstagramFeed;
