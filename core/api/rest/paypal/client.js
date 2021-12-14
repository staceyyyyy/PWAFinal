/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const { getAppEnv } = require('../../../helpers/env');
const { modules } = require('../../../../swift.config');

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
    const appEnv = getAppEnv();
    const clientId = modules.paypal.clientId[appEnv];
    const clientSecret = modules.paypal.clientSecret[appEnv];

    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret,
    );
}

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

async function prettyPrint(jsonData, pre = '') {
    let pretty = '';
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (isNaN(key)) { pretty += `${pre + capitalize(key)}: `; } else { pretty += `${pre + (parseInt(key) + 1)}: `; }
            if (typeof jsonData[key] === 'object') {
                pretty += '\n';
                pretty += await prettyPrint(jsonData[key], `${pre}    `);
            } else {
                pretty += `${jsonData[key]}\n`;
            }
        }
    }
    return pretty;
}

module.exports = { client, prettyPrint };
