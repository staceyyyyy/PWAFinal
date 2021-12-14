const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        return window.APP_ENV;
    }

    return process.env.APP_ENV;
};

module.exports = {
    getAppEnv,
};
