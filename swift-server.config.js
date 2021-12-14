/* eslint-disable max-len */
/* --------------------------------------- */
/* Server Side Configuration
/* --------------------------------------- */
// put all sensitive configuration that is used in server side only here
// this way to avoid sensitive values such as ecnryption key to be included in js bundling and can be exposed in client side.

/* Encryption */
const encryption = {
    key: 'TXAjwm8k53PJG9NacLbyZavvQB2qBh43',
    algorithm: 'aes-256-cbc',
};

/* key server fcm */
const fcm = {
    topic: 'notificationspwa',
    FCM_KEY_SERVER: '', // sample : AAAA_Ene7EY:APA91bHxUfEgv4zU6SIFWAQgt80FtYQVwHhF8QDetJChYMt1BW76Hti036Jplesa-JTqHZlu5UM5gM-f_1DEpa_POjqBE_nqInn7zGrfcgSPDHxOwMGeB2rpe_mO1k6KUoCFgeD9sG1i
};

/* Cookie */
const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

module.exports = {
    encryption,
    SESSION_SECRET,
    fcm,
};
