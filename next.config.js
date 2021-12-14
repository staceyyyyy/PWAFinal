/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const withOffline = require('next-offline');
const { createSecureHeaders } = require('next-secure-headers');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const withCSS = require('@zeit/next-css');

module.exports = withOffline({
    // Secure Header
    async headers() {
        return [{ source: '/(.*)', headers: createSecureHeaders() }];
    },
    // Disable X-Powered-By
    poweredByHeader: false,
    future: {
        webpack5: false,
    },
    dontAutoRegisterSw: true,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
        rootDir: __dirname,
    },
    optimization: {
        minimize: process.env.NODE_ENV === 'production', // Update this to true or false
    },
    webpack: (
        config,
        {
            // activate if need to analysis size build
            buildId,
            dev,
            isServer,
            defaultLoaders,
            webpack,
        },
    ) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        // config.plugins.push(new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     reportFilename: './analyze/client.html',
        // }));
        config.plugins.push(
            new webpack.ProvidePlugin({
                React: 'react',
            }),
        );
        if (!isServer) {
            // eslint-disable-next-line no-param-reassign
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }
        return config;
    },
    // generateInDevMode: true, // please comment if develop to production
    workboxOpts: {
        importScripts: ['./sw.js'], // comment if disabled notifications
        swDest: process.env.NEXT_EXPORT ? 'service-worker.js' : 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /facebook/,
                handler: 'NetworkFirst',
            },
            {
                urlPattern: /_next/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'offlineCache',
                    expiration: {
                        maxEntries: 200,
                    },
                },
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/service-worker.js',
                destination: '/_next/static/service-worker.js',
            },
        ];
    },
    // enable code below on Prod and increase the version everytime before running build script
    // generateBuildId: async () => 'swift-pwa-v1.0.0',
});
