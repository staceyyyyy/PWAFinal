/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */

const { ApolloServer } = require('apollo-server-express');
const cookieSession = require('cookie-session');
const express = require('express');
const next = require('next');
const http = require('http');
const blocker = require('express-user-agent-blocker');
const fs = require('fs');

const LRUCache = require('lru-cache');
const cookieParser = require('cookie-parser');
const path = require('path');
const remoteSchema = require('./core/api/graphql');
const nextI18next = require('./core/lib/i18n');

const { json } = express;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const {
    expiredToken, nossrCache, features, assetsVersion,
} = require('./swift.config');
const { SESSION_SECRET } = require('./swift-server.config');
const generateXml = require('./core/api/rest/xml');
const captchaValidation = require('./core/api/rest/captcha');
const firebaseValidation = require('./core/api/rest/firebase-cloud-messaging');

// paypal
const getPaypalDetail = require('./core/api/rest/paypal/getDetailTransaction');

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
    // eslint-disable-next-line no-unused-vars
    length(n, key) {
        return n.length;
    },
    maxAge: 1000 * 60 * 60 * 24, // create max age 1 day
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
    return `${req.path}`;
}

async function renderAndCache(req, res) {
    const key = getCacheKey(req);
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key) && typeof req.query.resetcache === 'undefined') {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    // reset cache if have query resetcache
    if (req.query && typeof req.query.resetcache !== 'undefined') {
        ssrCache.reset();
    }

    try {
        // console.log(`key ${key} not found, rendering`);
        // If not let's render the page into HTML
        const html = await app.renderToHTML(req, res, req.path, req.query);

        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return;
        }
        // Let's cache this page
        ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, req.path, req.query);
    }
}

(async () => {
    const botList = fs.readFileSync('./botlist.txt')
        .toString()
        .split('\n')
        .filter(Boolean);

    await app.prepare();
    const server = express();

    // block bot
    server.use(blocker(
        botList,
        { text: 'Unauthorized request' },
    ));

    server.use(cookieParser());
    // disable x-powered-by
    server.disable('x-powered-by');
    // if ssr cache on
    if (features.ssrCache) {
        // handle next js request
        server.get('/_next/*', (req, res) => {
            /* serving _next static content using next.js handler */
            handle(req, res);
        });

        server.get('/assets/*', (req, res) => {
            /* serving assets static content using next.js handler */
            handle(req, res);
        });

        server.get('/static/*', (req, res) => {
            /* serving static content using next.js handler */
            handle(req, res);
        });

        server.get('/manifest.json', (req, res) => {
            /* serving manifest json */
            handle(req, res);
        });

        server.get('/favicon.ico', (req, res) => {
            /* serving manifest json */
            handle(req, res);
        });
        server.get('/service-worker.js', (req, res) => {
            /* serving service-worker */
            handle(req, res);
        });
    }

    await nextI18next.initPromise;
    // server.use(nextI18NextMiddleware(nextI18next));
    server.use(
        cookieSession({
            name: 'qwt-swift',
            keys: [SESSION_SECRET],
            maxAge: expiredToken,
            // add security options
            cookies: {
                secure: true,
                httpOnly: true,
            },
        }),
    );

    server.use(json({ limit: '2mb' }));

    const schemas = await remoteSchema();
    // handle server graphql endpoint use `/graphql`
    const serverGraph = new ApolloServer({
        schema: schemas,
        context: ({ req }) => req,
        playground: false,
        formatError: (err) => {
            if (err.message === 'graphql-authorization') {
                return {
                    message: err.message,
                    extensions: {
                        category: 'graphql-authorization',
                    },
                    status: 401,
                };
            }
            return err;
        },
    });
    serverGraph.applyMiddleware({ app: server });

    /**
     * handle maintenance pave
     */
    server.get('/maintenance', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/static/maintenance.html'));
    });

    server.get('/sitemap.xml', generateXml);
    server.post('/captcha-validation', captchaValidation);

    // add firebase validation
    server.post('/auth/fcm-token', firebaseValidation);

    // paypal route
    server.post('/paypal/detail-transaction', getPaypalDetail);

    /**
     * configuration firebase messaging
     *   */
    const serviceWorkers = [
        {
            filename: 'firebase-messaging-sw.js',
            pathfile: `./public/static/firebase/firebase-messaging-sw.${assetsVersion}.js`,
        },
        {
            filename: 'sw.js',
            pathfile: `./public/static/firebase/sw.${assetsVersion}.js`,
        },
        {
            filename: '.well-known/assetlinks.json',
            pathfile: './public/static/assetlinks.json',
        },
    ];

    serviceWorkers.forEach(({ filename, pathfile }) => {
        server.get(`/${filename}`, (req, res) => {
            app.serveStatic(req, res, pathfile);
        });
    });

    // server.get('*', (req, res) => handle(req, res));
    server.get('*', (req, res) => {
        const key = getCacheKey(req);
        // handle no cache ssr
        const found = nossrCache.find((val) => val === key);
        if (found || !features.ssrCache) {
            return handle(req, res);
        }
        /* serving page */
        return renderAndCache(req, res);
    });

    // create server
    const httpServer = http.createServer(server);
    await httpServer.listen(3000);
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
})();
