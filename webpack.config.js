const path = require('path');
const { assetsVersion } = require('./swift.config');

module.exports = {
    mode: 'production',
    entry: {
        install: './core/public/install.js',
        'firebase-messaging-sw': './core/public/firebase-messaging-sw.js',
        sw: './core/public/service-worker.js',
    },
    output: {
        filename: `[name].${assetsVersion}.js`,
        path: path.resolve(__dirname, 'public/static/firebase'),
    },
};
