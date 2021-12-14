// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('./client');

// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {
    // 2a. Get the order ID from the request body
    const { orderID } = req.body;

    // 3. Call PayPal to get the transaction details
    const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch (err) {
    // 4. Handle any errors from the call
        console.error(err);
        return res.status(500).json({
            status: false,
            code: 500,
            data: err,
            message: 'Internal server error',
        });
    }

    return res.status(200).json({
        status: true,
        code: 200,
        data: order,
        message: 'Data successfull retrieved',
    });
};
